import React, {useEffect} from 'react';
import FeedStyles from './Feed.module.scss';
import {useAppDispatch, useAppSelector} from "../../services/hooks";
import {connect as connectLiveFeed, disconnect as disconnectLiveFeed} from "../../services/live-feed/actions";
import {WebsocketStatus} from "../../components/utils/socket-types";
import FeedItem from "../../components/feed-item/FeedItem";
import {getIngredients} from "../../services/slices/ingredients";
import FeedInfo from "../../components/feed-info/FeedInfo";
import {WS_ALL} from "../../components/utils/api";

function FeedPage() {
    const dispatch = useAppDispatch();
    const {feed, status} = useAppSelector(state => state.feed);
    const {ingredients} = useAppSelector(state => state.ingredients);

    useEffect((): any => {
        dispatch(connectLiveFeed(WS_ALL));
        if (!ingredients.length) {
            dispatch(getIngredients());
        }
        return () => {
            dispatch(disconnectLiveFeed())
        };
    }, []);

    if (feed) {
        return (
            <>
                <main className={FeedStyles.feed}>
                    <div className='container'>
                        <p className={`${FeedStyles.feed__title} text text_type_main-large`}>
                            Лента заказов
                        </p>
                        <div className={FeedStyles.feed__inner}>
                            <section className={`${FeedStyles.feed__list} custom-scroll`}>
                                {feed.orders.map(order => (
                                    <FeedItem order={order}
                                              pathname='feed'
                                              showStatus={false}
                                              key={order._id}/>
                                ))}
                            </section>
                            <section className={FeedStyles.feed__info}>
                                <FeedInfo/>
                            </section>
                        </div>
                    </div>
                </main>
            </>
        );
    }

    return (
        <main className={FeedStyles.feed}>
            <div className='container'>
                <div className='text text_type_main-medium'>Обновляем информацию...</div>
            </div>
        </main>

    )

}

export default FeedPage;
