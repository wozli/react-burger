import React from 'react';
import FeedStatusStyles from './FeedStatus.module.scss';
import {TStatusOrder} from "../../../utils/socket-types";

function FeedStatus({status}: {status:TStatusOrder}) {
    const statusType = {
        done: 'Выполнен',
        created: 'Создан',
        pending: 'Готовится',
    };

    return (
        <div className={`${status === 'done' ? `${FeedStatusStyles.feedStatus}` : ''} text text_type_main-default`}>{statusType[status]}</div>
    );
}

export default FeedStatus;
