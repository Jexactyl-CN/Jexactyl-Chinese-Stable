/*
 * Pterodactyl CHINA - Panel | Jexactyl Branch
 * Simplified Chinese Translation Copyright (c) 2021 - 2022 Ice Ling <iceling@ilwork.cn>
 * Please note the attribution when cite
 * This software is licensed under the terms of the MIT license.
 * https://opensource.org/licenses/MIT
 */
 
import tw from 'twin.macro';
import classNames from 'classnames';
import { ip } from '@/lib/formatters';
import { hashToPath } from '@/helpers';
import style from './style.module.css';
import Can from '@/components/elements/Can';
import { httpErrorToHuman } from '@/api/http';
import { ServerContext } from '@/state/server';
import Input from '@/components/elements/Input';
import Label from '@/components/elements/Label';
import Spinner from '@/components/elements/Spinner';
import { CSSTransition } from 'react-transition-group';
import { NavLink, useLocation } from 'react-router-dom';
import { Button } from '@/components/elements/button/index';
import CopyOnClick from '@/components/elements/CopyOnClick';
import useFileManagerSwr from '@/plugins/useFileManagerSwr';
import { FileObject } from '@/api/server/files/loadDirectory';
import { useStoreActions, useStoreState } from '@/state/hooks';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { ServerError } from '@/components/elements/ScreenBlock';
import ErrorBoundary from '@/components/elements/ErrorBoundary';
import TitledGreyBox from '@/components/elements/TitledGreyBox';
import UploadButton from '@/components/server/files/UploadButton';
import PullFileModal from '@/components/server/files/PullFileModal';
import FileObjectRow from '@/components/server/files/FileObjectRow';
import MassActionsBar from '@/components/server/files/MassActionsBar';
import ServerContentBlock from '@/components/elements/ServerContentBlock';
import NewDirectoryButton from '@/components/server/files/NewDirectoryButton';
import { FileActionCheckbox } from '@/components/server/files/SelectFileCheckbox';
import FileManagerBreadcrumbs from '@/components/server/files/FileManagerBreadcrumbs';

const sortFiles = (files: FileObject[], searchString: string): FileObject[] => {
    const sortedFiles: FileObject[] = files
        .sort((a, b) => a.name.localeCompare(b.name))
        .sort((a, b) => (a.isFile === b.isFile ? 0 : a.isFile ? 1 : -1));
    return sortedFiles
        .filter((file, index) => index === 0 || file.name !== sortedFiles[index - 1].name)
        .filter((file) => file.name.toLowerCase().includes(searchString.toLowerCase()));
};

export default () => {
    const id = ServerContext.useStoreState((state) => state.server.data!.id);
    const username = useStoreState((state) => state.user.data!.username);
    const sftp = ServerContext.useStoreState((state) => state.server.data!.sftpDetails);
    const { hash } = useLocation();
    const { data: files, error, mutate } = useFileManagerSwr();
    const directory = ServerContext.useStoreState((state) => state.files.directory);
    const clearFlashes = useStoreActions((actions) => actions.flashes.clearFlashes);
    const setDirectory = ServerContext.useStoreActions((actions) => actions.files.setDirectory);

    const setSelectedFiles = ServerContext.useStoreActions((actions) => actions.files.setSelectedFiles);
    const selectedFilesLength = ServerContext.useStoreState((state) => state.files.selectedFiles.length);

    const [searchString, setSearchString] = useState('');

    useEffect(() => {
        clearFlashes('files');
        setSelectedFiles([]);
        setDirectory(hashToPath(hash));
    }, [hash]);

    useEffect(() => {
        mutate();
    }, [directory]);

    const onSelectAllClick = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedFiles(e.currentTarget.checked ? files?.map((file) => file.name) || [] : []);
    };

    if (error) {
        return <ServerError message={httpErrorToHuman(error)} onRetry={() => mutate()} />;
    }

    const searchFiles = (event: ChangeEvent<HTMLInputElement>) => {
        if (files) {
            setSearchString(event.target.value);
            sortFiles(files, searchString);
            mutate();
        }
    };

    return (
        <ServerContentBlock title={'文件管理器'} showFlashKey={'files'}>
            <h1 className={'j-left text-5xl'}>File Manager</h1>
            <h3 className={'j-left text-2xl mt-2 text-neutral-500 mb-10'}>Create, edit and view files.</h3>
            <Input onChange={searchFiles} className={'mb-4 j-up'} placeholder={'搜索文件与目录...'} />
            <div css={tw`flex flex-wrap-reverse md:flex-nowrap justify-center mb-4`}>
                <ErrorBoundary>
                    <div className={'j-right'}>
                        <FileManagerBreadcrumbs
                            css={tw`w-full`}
                            renderLeft={
                                <FileActionCheckbox
                                    type={'checkbox'}
                                    css={tw`mx-4`}
                                    checked={selectedFilesLength === (files?.length === 0 ? -1 : files?.length)}
                                    onChange={onSelectAllClick}
                                />
                            }
                        />
                    </div>
                    <Can action={'file.create'}>
                        <div className={classNames(style.manager_actions, 'j-left')}>
                            <PullFileModal />
                            <NewDirectoryButton css={tw`w-full flex-none mt-4 sm:mt-0 sm:w-auto sm:mr-4`} />
                            <UploadButton css={tw`flex-1 mr-4 sm:flex-none sm:mt-0`} />
                            <NavLink
                                to={`/server/${id}/files/new${window.location.hash}`}
                                css={tw`flex-1 sm:flex-none sm:mt-0`}
                            >
                                <Button css={tw`w-full`}>新文件</Button>
                            </NavLink>
                        </div>
                    </Can>
                </ErrorBoundary>
            </div>
            {!files ? (
                <Spinner size={'large'} centered />
            ) : (
                <>
                    {!files.length ? (
                        <p css={tw`text-sm text-neutral-400 text-center`}>This directory seems to be empty.</p>
                    ) : (
                        <CSSTransition classNames={'fade'} timeout={150} appear in>
                            <>
                                {files.length > 250 && (
                                    <div css={tw`rounded bg-yellow-400 mb-px p-3`}>
                                        <p css={tw`text-yellow-900 text-sm text-center`}>
                                            此目录文件太多，无法在浏览器中显示，
                                            将输出限制为前 250 个文件。
                                        </p>
                                    </div>
                                )}
                                {sortFiles(files.slice(0, 250), searchString).map((file) => (
                                    <FileObjectRow key={file.key} file={file} />
                                ))}
                                <MassActionsBar />
                            </>
                        </CSSTransition>
                    )}
                </>
            )}
            <Can action={'file.sftp'}>
                <TitledGreyBox title={'SFTP 信息'} className={'j-up mt-8 md:mt-6'}>
                    <div>
                        <Label>服务器地址</Label>
                        <CopyOnClick text={`sftp://${ip(sftp.ip)}:${sftp.port}`}>
                            <Input type={'text'} value={`sftp://${ip(sftp.ip)}:${sftp.port}`} readOnly />
                        </CopyOnClick>
                    </div>
                    <div css={tw`mt-6`}>
                        <Label>用户名</Label>
                        <CopyOnClick text={`${username}.${id}`}>
                            <Input type={'text'} value={`${username}.${id}`} readOnly />
                        </CopyOnClick>
                    </div>
                </TitledGreyBox>
            </Can>
        </ServerContentBlock>
    );
};
