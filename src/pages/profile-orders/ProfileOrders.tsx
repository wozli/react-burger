import React, {useEffect} from 'react';
import Styles from './ProfileOrders.module.scss';
import {useAppDispatch, useAppSelector} from "../../services/hooks";
import {connect as connectLiveProfile, disconnect as disconnectLiveProfile} from "../../services/live-feed/actions";
import {WebsocketStatus} from "../../components/utils/socket-types";
import FeedItem from "../../components/feed-item/FeedItem";
import {getIngredients} from "../../services/slices/ingredients";
import {WS_PROFILE} from "../../components/utils/api";
import {getCookie} from "../../components/utils/cookie";

function ProfileOrdersPage() {
    const dispatch = useAppDispatch();
    const {feed, status} = useAppSelector(state => state.feed);
    const {ingredients} = useAppSelector(state => state.ingredients);

    useEffect((): any => {
        dispatch(connectLiveProfile(`${WS_PROFILE}?token=${getCookie('token')}`));
        if (!ingredients.length) {
            dispatch(getIngredients());
        }
        return () => {
            dispatch(disconnectLiveProfile())
        };
    }, []);

    if (feed) {
        return (
            <main className={Styles.profileOrders}>
                <div className={`${Styles.profileOrders__list} custom-scroll`}>
                    {feed.orders.map(order => (
                        <FeedItem order={order}
                                  pathname='profile/orders'
                                  showStatus={true}
                                  key={order._id}/>
                    ))}
                </div>
            </main>
        );
    }

    return (
        <main className={Styles.profileOrders}>
            <div className='container'>
                <div className='text text_type_main-medium'>Обновляем информацию...</div>
            </div>
        </main>
    )
}

export default ProfileOrdersPage;
