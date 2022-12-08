import axios from "axios";
import {TLiveFeedOrder} from "./socket-types";

export const getOrderByNumber = async (number: string) => {
    const response = await axios.get<{ success: boolean, orders: TLiveFeedOrder[] }>(`https://norma.nomoreparties.space/api/orders/${number}`);
    return response.data;
};