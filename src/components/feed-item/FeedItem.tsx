import React, {useMemo} from 'react';
import FeedItemStyles from './FeedItem.module.scss';
import {FormattedDate} from '@ya.praktikum/react-developer-burger-ui-components';
import {useAppSelector} from "../../services/hooks";
import FeedStatus from "./components/feed-status/FeedStatus";
import FeedImg from "./components/feed-img/FeedImage";
import FeedPrice from "./components/feed-price/FeedPrice";
import {TYPE_INGREDIENTS} from "../utils/constants";
import {useLocation, Link} from 'react-router-dom';
import {TLiveFeedOrder} from "../utils/socket-types";

function FeedItem({order, showStatus, pathname}: { order: TLiveFeedOrder, showStatus: boolean, pathname: string }) {
    const location = useLocation();
    const {ingredients} = useAppSelector(state => state.ingredients);

    const currentIngredients = useMemo(
        () => ingredients.filter(ingredient => order.ingredients.includes(ingredient._id))
        , [ingredients, order.ingredients]
    );

    const totalPrice = useMemo(
        () => currentIngredients.reduce((acc, item) => acc + (item.type === TYPE_INGREDIENTS.BUN ? item.price * 2 : item.price), 0)
        , [currentIngredients]
    );

    const firstSixIngredients = useMemo(
        () => currentIngredients.filter((_, index) => index <= 5)
        , [currentIngredients]
    );

    return (
        <Link className={FeedItemStyles.feedItem}
              to={{
                  pathname: `/${pathname}/${order.number}`,
                  state: {background: location},
              }}>
            <div className={`${FeedItemStyles.feedItem__head} mb-6`}>
                <div className='text text_type_digits-default'>#{order.number}</div>
                <div className={FeedItemStyles.feedItem__date}><FormattedDate date={new Date(order.createdAt)}/></div>
            </div>
            <div className={`${showStatus ? 'mb-2' : ''} text text_type_main-medium`}>{order.name}</div>
            {showStatus && (
                <FeedStatus status={order.status}/>
            )}
            <div className={`${FeedItemStyles.feedItem__footer} mt-6`}>
                <div className={FeedItemStyles.feedItem__images}>
                    {firstSixIngredients.map((ingredient, index) => (
                        <div className={FeedItemStyles.feedItem__img} key={ingredient._id}>
                            <FeedImg ingredient={ingredient}
                                     index={index}
                                     addIngredients={currentIngredients.length - 6}/>
                        </div>
                    ))}
                </div>
                <FeedPrice price={totalPrice}/>
            </div>
        </Link>
    );
}

export default FeedItem;
