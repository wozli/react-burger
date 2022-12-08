import React, {useEffect, useState, FC} from 'react';
import {useParams} from "react-router-dom";
import {getIngredients} from "../../services/slices/ingredients";
import {useAppSelector, useAppDispatch} from "../../services/hooks";
import {TLiveFeedOrder} from "../utils/socket-types";
import LiveOrder from "../live-order/LiveOrder";
import {getOrderByNumber} from "../utils/helpers";

export const FeedDetails: FC = () => {
    const dispatch = useAppDispatch();
    const {ingredients} = useAppSelector(state => state.ingredients);
    const {id} = useParams<{ id: string }>();
    const [order, setOrder] = useState<TLiveFeedOrder>();


    useEffect(() => {
        getOrderByNumber(id).then(res => setOrder(res.orders[0]));

        if (!ingredients.length) {
            dispatch(getIngredients());
        }
    }, []);

    if (order && order._id) {

        return (
            <LiveOrder order={order}/>
        );
    }

    return (
        <> Заказ не найден </>
    );

}

export default FeedDetails;
