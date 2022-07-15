/*
 * Pterodactyl CHINA - Panel | Jexactyl Branch
 * Simplified Chinese Translation Copyright (c) 2021 - 2022 Ice Ling <iceling@ilwork.cn>
 * Please note the attribution when cite
 * This software is licensed under the terms of the MIT license.
 * https://opensource.org/licenses/MIT
 */

import tw from 'twin.macro';
import { ApplicationStore } from '@/state';
import { httpErrorToHuman } from '@/api/http';
import { ServerContext } from '@/state/server';
import React, { useEffect, useState } from 'react';
import deleteServer from '@/api/server/deleteServer';
import { Actions, useStoreActions } from 'easy-peasy';
import { Dialog } from '@/components/elements/dialog';
import { Button } from '@/components/elements/button/index';
import TitledGreyBox from '@/components/elements/TitledGreyBox';

export default () => {
    const uuid = ServerContext.useStoreState((state) => state.server.data!.uuid);
    const [modalVisible, setModalVisible] = useState(false);
    const { addFlash, clearFlashes } = useStoreActions((actions: Actions<ApplicationStore>) => actions.flashes);

    const delServer = () => {
        clearFlashes('settings');
        deleteServer(uuid)
            .then(() => {
                addFlash({
                    key: 'settings',
                    type: 'success',
                    message: '你的服务器已成功删除.',
                });
            })
            .catch((error) => {
                console.error(error);

                addFlash({ key: 'settings', type: 'error', message: httpErrorToHuman(error) });
            })
            .then(() => setModalVisible(false));
    };

    useEffect(() => {
        clearFlashes();
    }, []);

    return (
        <TitledGreyBox title={'删除服务器'} css={tw`relative`}>
            <Dialog.Confirm
                open={modalVisible}
                title={'确认服务器删除'}
                confirm={'删除'}
                onClose={() => setModalVisible(false)}
                onConfirmed={delServer}
            >
                您的服务器将被删除, 所有文件都将被清除，且服务器资源将
                退回至您的账户. 你确定继续吗?
            </Dialog.Confirm>
            <p css={tw`text-sm`}>
                删除您的服务器将关闭所有服务器进程，将资源退回到您的帐户并删除所有
                与实例关联的文件、备份、数据库和设置.
                <strong css={tw`font-medium`}>
                    如果您继续执行此操作，所有数据将永久丢失.
                </strong>
            </p>
            <div css={tw`mt-6 text-right`}>
                <Button.Danger variant={Button.Variants.Secondary} onClick={() => setModalVisible(true)}>
                    删除服务器
                </Button.Danger>
            </div>
        </TitledGreyBox>
    );
};
