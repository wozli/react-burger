import reducer, {resetOrder, getOrderInfo} from "../order";
import {store} from "../../../index";
import axios from "axios";

describe('test order reducers', () => {
  window.alert = jest.fn();
  const orderResponse = {
    "success": true,
    "name": "Краторный бургер",
    "order": {
      "ingredients": [
        {
          "_id": "60d3b41abdacab0026a733c6",
          "name": "Краторная булка N-200i",
          "type": "bun",
          "proteins": 80,
          "fat": 24,
          "carbohydrates": 53,
          "calories": 420,
          "price": 1255,
          "image": "https://code.s3.yandex.net/react/code/bun-02.png",
          "image_mobile": "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
          "image_large": "https://code.s3.yandex.net/react/code/bun-02-large.png",
          "__v": 0
        },
        {
          "_id": "60d3b41abdacab0026a733c6",
          "name": "Краторная булка N-200i",
          "type": "bun",
          "proteins": 80,
          "fat": 24,
          "carbohydrates": 53,
          "calories": 420,
          "price": 1255,
          "image": "https://code.s3.yandex.net/react/code/bun-02.png",
          "image_mobile": "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
          "image_large": "https://code.s3.yandex.net/react/code/bun-02-large.png",
          "__v": 0
        }
      ],
      "_id": "63a3001a99a25c001cd6b7ea",
      "owner": {
        "name": "Николай",
        "email": "wozli2333@gmail.com",
        "createdAt": "2022-10-29T07:06:20.573Z",
        "updatedAt": "2022-12-09T13:00:55.236Z"
      },
      "status": "done",
      "name": "Краторный бургер",
      "createdAt": "2022-12-21T12:46:18.993Z",
      "updatedAt": "2022-12-21T12:46:19.440Z",
      "number": 35085,
      "price": 2510
    }
  };
  const mockPost = jest.spyOn(axios, 'post');
  it('Тест получение заказа', async () => {
    mockPost.mockImplementation(() => Promise.resolve({ data: orderResponse }));

    const result =  await store.dispatch(getOrderInfo(['60d3b41abdacab0026a733c6', '60d3b41abdacab0026a733c6']));
    const payload = result.payload

    expect(result.type).toBe('order/getOrderInfo/fulfilled')
    expect(payload.number).toEqual(orderResponse.number)

    const state = store.getState().order;
    expect(state.order).toEqual(payload.order)
  })

  it('Тест ошибки получения заказа', async () => {
    window.alert.mockClear();
    mockPost.mockImplementation(() => Promise.reject());

    const result =  await store.dispatch(getOrderInfo(['60d3b41abdacab0026a733c6', '60d3b41abdacab0026a733c6']));

    expect(result.type).toBe('order/getOrderInfo/rejected')

    const state = store.getState().order;
    expect(state).toEqual({
      order: null,
      orderRequest: false,
      orderFailed: true,
      openModalOrder: false,
    })
  })

  it('Тест resetOrder', async () => {
    const initialState = {
      order: null,
      orderRequest: false,
      orderFailed: false,
      openModalOrder: false,
    };

    expect(reducer(initialState, resetOrder())).toEqual({
      order: null,
      orderRequest: false,
      orderFailed: false,
      openModalOrder: false,
    });
  })
})