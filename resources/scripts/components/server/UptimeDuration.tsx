/*
 * Pterodactyl CHINA - Panel | Jexactyl Branch
 * Simplified Chinese Translation Copyright (c) 2021 - 2022 Ice Ling <iceling@ilwork.cn>
 * Please note the attribution when cite
 * This software is licensed under the terms of the MIT license.
 * https://opensource.org/licenses/MIT
 */

import React from 'react';

export default ({ uptime }: { uptime: number }) => {
    const days = Math.floor(uptime / (24 * 60 * 60));
    const hours = Math.floor((Math.floor(uptime) / 60 / 60) % 24);
    const remainder = Math.floor(uptime - hours * 60 * 60);
    const minutes = Math.floor((remainder / 60) % 60);
    const seconds = remainder % 60;

    if (days > 0) {
        return (
            <>
                {days}天 {hours}小时 {minutes}分钟
            </>
        );
    }

    return (
        <>
            {hours}小时 {minutes}分钟 {seconds}秒
        </>
    );
};
