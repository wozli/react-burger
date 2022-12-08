import React,{useMemo} from 'react';
import FeedTableStyles from './FeedTable.module.scss';
import {TLiveFeedOrder} from "../../../utils/socket-types";

function FeedTable({orders}: { orders: TLiveFeedOrder[] }) {

    const countOrders = useMemo(() => {
        const done: TLiveFeedOrder[] = [];
        const pending: TLiveFeedOrder[] = [];
        orders.forEach((order) => {
            if (order.status === 'done' && done.length < 10) {
                done.push(order)
            }
            if (order.status === 'pending' && pending.length < 10) {
                pending.push(order)
            }
        });

        return {
            done,
            pending
        }
    },[orders]);

    return (
        <div className={`${FeedTableStyles.feedTable} mb-15`}>
            <div className={FeedTableStyles.feedTable__col}>
                <div className='text text_type_main-medium mb-6'>
                    Готовы:
                </div>
                <div className={`${FeedTableStyles.feedTable__list} ${FeedTableStyles.feedTable__done}`}>
                    {countOrders.done.map(order => (
                        <div className={`text text_type_digits-default`} key={order._id}>{order.number}</div>
                    ))}
                </div>
            </div>
            <div className={FeedTableStyles.feedTable__col}>
                <div className='text text_type_main-medium mb-6'>
                    В работе:
                </div>
                <div className={`${FeedTableStyles.feedTable__list}`}>
                    {countOrders.pending.map(order => (
                        <div className={`text text_type_digits-default`} key={order._id}>{order.number}</div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default FeedTable;
