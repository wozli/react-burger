import React, {useMemo, FC} from 'react';
import {TLiveFeedOrder} from "../utils/socket-types";
import LiveOrderStyles from './LiveOrder.module.scss'
import FeedStatus from "../feed-item/components/feed-status/FeedStatus";
import FeedPrice from "../feed-item/components/feed-price/FeedPrice";
import FeedImg from "../feed-item/components/feed-img/FeedImage";
import {useAppSelector} from "../../services/hooks";
import {FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";
import {TYPE_INGREDIENTS} from "../utils/constants";
import {TIngredient} from "../utils/types";

export const LiveOrder: FC<{ order: TLiveFeedOrder }> = ({order}) => {
    const {ingredients} = useAppSelector(state => state.ingredients);

    const currentIngredients = useMemo(
        () => ingredients.filter(ingredient => order.ingredients.includes(ingredient._id))
        , [ingredients, order.ingredients]
    );

    const totalPrice = useMemo(
        () => currentIngredients.reduce((acc, item) => acc + (item.type === TYPE_INGREDIENTS.BUN ? item.price * 2 : item.price), 0)
        , [currentIngredients]
    );

    const uniqueIngredients = useMemo(
        () => {
            const unique:Array<TIngredient & {count:number}> = [];
            currentIngredients.forEach(ingredient => {
                const idx = unique.findIndex(item => item._id === ingredient._id);
                if (idx === -1) {
                    unique.push({...ingredient, count: 1})
                } else {
                    unique[idx].count++;
                }
            })

            return unique;
        },  [currentIngredients]);

    return (
        <div className={LiveOrderStyles.liveOrder}>
            <p className={`${LiveOrderStyles.liveOrder__number} text text_type_digits-default mb-10`}>#{order.number}</p>
            <p className='text text_type_main-medium mb-2'>{order.name}</p>
            <FeedStatus status={order.status}/>
            <p className='text text_type_main-medium mb-6 mt-15'>Состав:</p>
            <div className={`${LiveOrderStyles.liveOrder__list} custom-scroll mb-10`}>
                {uniqueIngredients.map(item => (
                    <div className={LiveOrderStyles.liveOrder__item} key={item._id}>
                        <FeedImg ingredient={item}/>
                        <p className={`${LiveOrderStyles.liveOrder__name} text text_type_main-default ml-4 pr-4`}>{item.name}</p>
                        {(item.type === TYPE_INGREDIENTS.BUN) && (
                           <FeedPrice price={item.price} count={2}/>
                        )}
                        {(item.type !== TYPE_INGREDIENTS.BUN) && (
                            <FeedPrice price={item.price} count={item.count}/>
                        )}
                    </div>
                ))}
            </div>
            <div className={LiveOrderStyles.liveOrder__footer}>
                <div className={LiveOrderStyles.liveOrder__date}>
                    <FormattedDate date={new Date(order.createdAt)}/>
                </div>
                 <FeedPrice price={totalPrice}/>
            </div>
        </div>
    );

}

export default LiveOrder;
