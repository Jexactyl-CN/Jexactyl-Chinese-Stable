/*
 * Pterodactyl CHINA - Panel | Jexactyl Branch
 * Simplified Chinese Translation Copyright (c) 2021 - 2022 Ice Ling <iceling@ilwork.cn>
 * Please note the attribution when cite
 * This software is licensed under the terms of the MIT license.
 * https://opensource.org/licenses/MIT
 */

import tw from 'twin.macro';
import { breakpoint } from '@/theme';
import * as Icon from 'react-feather';
import { Form, Formik } from 'formik';
import useFlash from '@/plugins/useFlash';
import { useStoreState } from 'easy-peasy';
import { number, object, string } from 'yup';
import { megabytesToHuman } from '@/helpers';
import styled from 'styled-components/macro';
import Field from '@/components/elements/Field';
import Select from '@/components/elements/Select';
import { Egg, getEggs } from '@/api/store/getEggs';
import createServer from '@/api/store/createServer';
import { getNests, Nest } from '@/api/store/getNests';
import { Button } from '@/components/elements/button/index';
import StoreError from '@/components/store/error/StoreError';
import InputSpinner from '@/components/elements/InputSpinner';
import React, { ChangeEvent, useEffect, useState } from 'react';
import TitledGreyBox from '@/components/elements/TitledGreyBox';
import { getResources, Resources } from '@/api/store/getResources';
import PageContentBlock from '@/components/elements/PageContentBlock';

const Container = styled.div`
    ${tw`flex flex-wrap`};

    & > div {
        ${tw`w-full`};

        ${breakpoint('sm')`
      width: calc(50% - 1rem);
    `}

        ${breakpoint('md')`
      ${tw`w-auto flex-1`};
    `}
    }
`;

interface CreateValues {
    name: string;
    description: string | null;
    cpu: number;
    memory: number;
    disk: number;
    ports: number;
    backups: number | null;
    databases: number | null;
}

export default () => {
    const user = useStoreState((state) => state.user.data!);
    const limit = useStoreState((state) => state.storefront.data!.limit);
    const [resources, setResources] = useState<Resources>();
    const { addFlash, clearFlashes, clearAndAddHttpError } = useFlash();
    const [isSubmit, setSubmit] = useState(false);
    const [loading, setLoading] = useState(false);
    const [nests, setNests] = useState<Nest[]>();
    const [nest, setNest] = useState(1);
    const [eggs, setEggs] = useState<Egg[]>();
    const [egg, setEgg] = useState(1);

    useEffect(() => {
        getResources().then((resources) => setResources(resources));
        getNests().then((nests) => setNests(nests));
        getEggs(1).then((eggs) => setEggs(eggs));
    }, []);

    const changeNest = (x: ChangeEvent<HTMLSelectElement>) => {
        setNest(parseInt(x.target.value));
        getEggs(parseInt(x.target.value)).then((eggs) => setEggs(eggs));
    };

    const submit = (values: CreateValues) => {
        setLoading(true);
        clearFlashes('store:create');
        setSubmit(true);

        createServer(values, egg, nest)
            .then(() => {
                setSubmit(false);
                setLoading(false);
                clearFlashes('store:create');
                // @ts-expect-error this is valid
                window.location = '/';
            })
            .then(() =>
                addFlash({
                    type: 'success',
                    key: 'store:create',
                    message: '您的服务器已部署并正在安装.',
                })
            )
            .catch((error) => {
                setSubmit(false);
                clearAndAddHttpError({ key: 'store:create', error });
            });
    };

    if (!resources || !eggs || !nests) return <StoreError />;
    return (
        <PageContentBlock title={'创建服务器'} showFlashKey={'store:create'}>
            <Formik
                onSubmit={submit}
                initialValues={{
                    name: `${user.username}'s server`,
                    description: '在这里写一个服务器的简述.',
                    cpu: resources.cpu,
                    memory: resources.memory / 1024,
                    disk: resources.disk / 1024,
                    ports: resources.ports,
                    backups: resources.backups,
                    databases: resources.databases,
                    egg: 1,
                }}
                validationSchema={object().shape({
                    name: string().required().min(3),
                    description: string().optional().min(3).max(191),
                    cpu: number().required().min(50).max(resources.cpu).max(limit.cpu),
                    memory: number()
                        .required()
                        .min(1)
                        .max(resources.memory / 1024)
                        .max(limit.memory / 1024),
                    disk: number()
                        .required()
                        .min(1)
                        .max(resources.disk / 1024)
                        .max(limit.disk / 1024),
                    ports: number().required().min(1).max(resources.ports).max(limit.port),
                    backups: number().optional().max(resources.backups).max(limit.backup),
                    databases: number().optional().max(resources.databases).max(limit.database),
                    egg: number().required(),
                })}
            >
                <Form>
                    <h1 className={'j-left text-5xl'}>基础信息</h1>
                    <h3 className={'j-left text-2xl text-neutral-500'}>为新服务器设置基本信息.</h3>
                    <Container css={tw`lg:grid lg:grid-cols-2 my-10 gap-4`}>
                        <TitledGreyBox title={'服务器名称'} css={tw`mt-8 sm:mt-0`}>
                            <Field name={'name'} />
                            <p css={tw`mt-1 text-xs`}>为您的服务器分配一个名称以在面板中使用.</p>
                            <p css={tw`mt-1 text-xs text-neutral-400`}>
                                字符限制: <code>a-z A-Z 0-9 _ - .</code> 和 <code>[空格]</code>.
                            </p>
                        </TitledGreyBox>
                        <TitledGreyBox title={'服务器描述'} css={tw`mt-8 sm:mt-0 `}>
                            <Field name={'description'} />
                            <p css={tw`mt-1 text-xs`}>为您的服务器设置描述.</p>
                            <p css={tw`mt-1 text-xs text-yellow-400`}>* 选填</p>
                        </TitledGreyBox>
                    </Container>
                    <h1 className={'j-left text-5xl'}>资源限制</h1>
                    <h3 className={'j-left text-2xl text-neutral-500'}>为 CPU、RAM 运行内存等设置限制.</h3>
                    <Container css={tw`lg:grid lg:grid-cols-3 my-10 gap-4`}>
                        <TitledGreyBox title={'服务器 CPU 限制'} css={tw`mt-8 sm:mt-0`}>
                            <Field name={'cpu'} />
                            <p css={tw`mt-1 text-xs`}>分配可用 CPU 的限制.</p>
                            <p css={tw`mt-1 text-xs text-neutral-400`}>{resources.cpu}% 可用</p>
                        </TitledGreyBox>
                        <TitledGreyBox title={'服务器 RAM 运行内存限制'} css={tw`mt-8 sm:mt-0 `}>
                            <Field name={'memory'} />
                            <p css={tw`mt-1 text-xs`}>分配可用 RAM 运行内存的限制.</p>
                            <p css={tw`mt-1 text-xs text-neutral-400`}>
                                {megabytesToHuman(resources.memory)} 可用
                            </p>
                        </TitledGreyBox>
                        <TitledGreyBox title={'服务器存储空间限制'} css={tw`mt-8 sm:mt-0 `}>
                            <Field name={'disk'} />
                            <p css={tw`mt-1 text-xs`}>分配可用的 ROM 存储空间限制.</p>
                            <p css={tw`mt-1 text-xs text-neutral-400`}>{megabytesToHuman(resources.disk)} 可用</p>
                        </TitledGreyBox>
                    </Container>
                    <h1 className={'j-left text-5xl'}>高级资源限制</h1>
                    <h3 className={'j-left text-2xl text-neutral-500'}>
                        将数据库、网络分配和端口添加到您的服务器.
                    </h3>
                    <Container css={tw`lg:grid lg:grid-cols-3 my-10 gap-4`}>
                        <TitledGreyBox title={'网络分配'} css={tw`mt-8 sm:mt-0`}>
                            <Field name={'ports'} />
                            <p css={tw`mt-1 text-xs`}>为您的服务器分配多个端口.</p>
                            <p css={tw`mt-1 text-xs text-neutral-400`}>{resources.ports} 可用</p>
                        </TitledGreyBox>
                        <TitledGreyBox title={'服务器备份'} css={tw`mt-8 sm:mt-0 `}>
                            <Field name={'backups'} />
                            <p css={tw`mt-1 text-xs`}>为您的服务器分配多个备份.</p>
                            <p css={tw`mt-1 text-xs text-neutral-400`}>{resources.backups} 可用</p>
                        </TitledGreyBox>
                        <TitledGreyBox title={'服务器数据库'} css={tw`mt-8 sm:mt-0 `}>
                            <Field name={'databases'} />
                            <p css={tw`mt-1 text-xs`}>为您的服务器分配多个数据库.</p>
                            <p css={tw`mt-1 text-xs text-neutral-400`}>{resources.databases} 可用</p>
                        </TitledGreyBox>
                    </Container>
                    <h1 className={'j-left text-5xl'}>服务器类型</h1>
                    <h3 className={'j-left text-2xl text-neutral-500'}>选择要使用的服务器分发类型.</h3>
                    <Container css={tw`my-10 gap-4`}>
                        <TitledGreyBox title={'服务器预设组'} css={tw`mt-8 sm:mt-0`}>
                            <Select name={'nest'} onChange={(n) => changeNest(n)}>
                                {nests.map((n) => (
                                    <option key={n.id} value={n.id}>
                                        {n.name}
                                    </option>
                                ))}
                            </Select>
                            <p css={tw`mt-2 text-sm`}>选择服务器使用的预设组.</p>
                        </TitledGreyBox>
                        <TitledGreyBox title={'服务器预设'} css={tw`mt-8 sm:mt-0`}>
                            <Select name={'egg'} onChange={(e) => setEgg(parseInt(e.target.value))}>
                                {eggs.map((e) => (
                                    <option key={e.id} value={e.id}>
                                        {e.name}
                                    </option>
                                ))}
                            </Select>
                            <p css={tw`mt-2 text-sm`}>选择你想在服务器上运行什么功能/游戏.</p>
                        </TitledGreyBox>
                    </Container>
                    <InputSpinner visible={loading}>
                        <div css={tw`text-right`}>
                            <Button
                                type={'submit'}
                                className={'w-1/6 mb-4'}
                                size={Button.Sizes.Large}
                                disabled={isSubmit}
                            >
                                创建服务器! <Icon.ArrowRightCircle className={'ml-2'} />
                            </Button>
                        </div>
                    </InputSpinner>
                </Form>
            </Formik>
        </PageContentBlock>
    );
};
