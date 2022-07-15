/*
 * Pterodactyl CHINA - Panel | Jexactyl Branch
 * Simplified Chinese Translation Copyright (c) 2021 - 2022 Ice Ling <iceling@ilwork.cn>
 * Please note the attribution when cite
 * This software is licensed under the terms of the MIT license.
 * https://opensource.org/licenses/MIT
 */

import React from 'react';
import tw from 'twin.macro';
import * as Icon from 'react-feather';
import { useStoreState } from '@/state/hooks';

export default () => {
    const rootAdmin = useStoreState((state) => state.user.data!.rootAdmin);

    return (
        <>
            <div css={tw`flex items-center justify-center w-full my-4`}>
                <div css={tw`flex items-center bg-neutral-900 rounded p-3 text-red-500`}>
                    <Icon.AlertCircle css={tw`h-4 w-auto mr-2`} />
                    <p css={tw`text-sm text-neutral-100`}>无法检索用户资源,正在重试...</p>
                </div>
            </div>
            {rootAdmin && (
                <div css={tw`flex items-center justify-center w-full mt-4`}>
                    <div css={tw`flex items-center bg-neutral-900 rounded p-3 text-yellow-500`}>
                        <Icon.HelpCircle css={tw`h-4 w-auto mr-2`} />
                        <p css={tw`text-sm text-neutral-100`}>
                            您的管理员设置商店功能是否正确?
                            <a href={'/admin/jexactyl'} css={tw`text-blue-500 ml-1`}>
                                检查
                            </a>
                        </p>
                    </div>
                </div>
            )}
        </>
    );
};
