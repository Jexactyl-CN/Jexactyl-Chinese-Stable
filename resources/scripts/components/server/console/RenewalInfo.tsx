import React, { useState } from 'react';
import useFlash from '@/plugins/useFlash';
import { useStoreState } from '@/state/hooks';
import { ServerContext } from '@/state/server';
import renewServer from '@/api/server/renewServer';
import { Dialog } from '@/components/elements/dialog';
import SpinnerOverlay from '@/components/elements/SpinnerOverlay';

export default () => {
    const [open, setOpen] = useState(false);
    const { clearAndAddHttpError } = useFlash();
    const [loading, setLoading] = useState(false);
    const store = useStoreState((state) => state.storefront.data!);
    const uuid = ServerContext.useStoreState((state) => state.server.data!.uuid);
    const renewal = ServerContext.useStoreState((state) => state.server.data!.renewal);

    const doRenewal = () => {
        setLoading(true);

        renewServer(uuid)
            .then(() => setOpen(false))
            .catch((error) => clearAndAddHttpError(error));
    };

    return (
        <>
            <Dialog.Confirm
                open={open}
                onClose={() => setOpen(false)}
                title={'确认服务器续订'}
                onConfirmed={() => doRenewal()}
            >
                <SpinnerOverlay visible={loading} />
                你将花费 {store.renewals.cost} {store.currency} 为您的服务器增加 7 天订阅.
            </Dialog.Confirm>
            于 {renewal} 天{' '}
            <span className={'text-blue-500 text-sm cursor-pointer'} onClick={() => setOpen(true)}>
                {'('}续订{')'}
            </span>
        </>
    );
};
