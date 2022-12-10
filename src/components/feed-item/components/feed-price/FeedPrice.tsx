import React from 'react';
import FeedStatusStyles from './FeedPrice.module.scss';
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";

function FeedPrice({price, count}: {price:number, count?:number}) {

    return (
        <div className={FeedStatusStyles.FeedPrice}>
            <p className={`${FeedStatusStyles.FeedPrice__price} text text_type_digits-default`}>{count ? `${count} x ` : ''}{price}</p>
            <CurrencyIcon type="primary" />
        </div>
    );
}

export default FeedPrice;
