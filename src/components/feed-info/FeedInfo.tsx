import React from 'react';
import FeedInfoStyles from './FeedInfo.module.scss';
import {useAppSelector} from "../../services/hooks";
import FeedTable from "./components/feed-table/FeedTable";


function FeedInfo() {
    const {feed} = useAppSelector(state => state.feed);

    if (feed) {
        return (
            <div className={FeedInfoStyles.feedInfo}>
                <FeedTable orders={feed.orders}/>
                <p className={'text text_type_main-medium'}>
                    Выполнено за все время:
                </p>
                <p className={`${FeedInfoStyles.feedInfo__count} text text_type_digits-large mb-15`}>
                    {feed.total}
                </p>
                <p className={'text text_type_main-medium'}>
                    Выполнено за сегодня:
                </p>
                <p className={`${FeedInfoStyles.feedInfo__count} text text_type_digits-large`}>
                    {feed.totalToday}
                </p>
            </div>
        )
    }

    return null;
}

export default FeedInfo;
