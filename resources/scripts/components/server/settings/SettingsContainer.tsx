/*
 * Pterodactyl CHINA - Panel | Jexactyl Branch
 * Simplified Chinese Translation Copyright (c) 2021 - 2022 Ice Ling <iceling@ilwork.cn>
 * Please note the attribution when cite
 * This software is licensed under the terms of the MIT license.
 * https://opensource.org/licenses/MIT
 */

import React from 'react';
import tw from 'twin.macro';
import Can from '@/components/elements/Can';
import { ServerContext } from '@/state/server';
import CopyOnClick from '@/components/elements/CopyOnClick';
import TitledGreyBox from '@/components/elements/TitledGreyBox';
import FlashMessageRender from '@/components/FlashMessageRender';
import ServerContentBlock from '@/components/elements/ServerContentBlock';
import RenameServerBox from '@/components/server/settings/RenameServerBox';
import DeleteServerBox from '@/components/server/settings/DeleteServerBox';
import ReinstallServerBox from '@/components/server/settings/ReinstallServerBox';

export default () => {
    const uuid = ServerContext.useStoreState((state) => state.server.data!.uuid);
    const node = ServerContext.useStoreState((state) => state.server.data!.node);

    return (
        <ServerContentBlock title={'设置'}>
            <FlashMessageRender byKey={'settings'} css={tw`mb-4`} />
            <h1 className={'j-left text-5xl'}>Settings</h1>
            <h3 className={'j-left text-2xl mt-2 text-neutral-500 mb-10'}>
                控制服务器的重要设置.
            </h3>
            <div className={'md:flex'}>
                <div className={'j-right w-full md:flex-1 md:mr-10'}>
                    <TitledGreyBox title={'调试信息'} css={tw`mb-6 md:mb-10`}>
                        <div css={tw`flex items-center justify-between text-sm`}>
                            <p>节点服务器</p>
                            <code css={tw`font-mono bg-neutral-900 rounded py-1 px-2`}>{node}</code>
                        </div>
                        <CopyOnClick text={uuid}>
                            <div css={tw`flex items-center justify-between mt-2 text-sm`}>
                                <p>服务器 ID</p>
                                <code css={tw`font-mono bg-neutral-900 rounded py-1 px-2`}>{uuid}</code>
                            </div>
                        </CopyOnClick>
                    </TitledGreyBox>
                    <DeleteServerBox />
                </div>
                <div className={'j-left w-full mt-6 md:flex-1 md:mt-0'}>
                    <Can action={'settings.rename'}>
                        <div css={tw`mb-6 md:mb-10`}>
                            <RenameServerBox />
                        </div>
                    </Can>
                    <Can action={'settings.reinstall'}>
                        <ReinstallServerBox />
                    </Can>
                </div>
            </div>
        </ServerContentBlock>
    );
};
