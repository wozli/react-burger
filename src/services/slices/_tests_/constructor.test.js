import reducer, {addCartIngredient, deleteCartIngredient, updateListIngredients, resetCart} from "../constructor";

describe('test constructor reducers', () => {
  const bun = {
    "_id": "60d3b41abdacab0026a733c6",
    "name": "Краторная булка N-200i",
    "type": "bun",
    "proteins": 80,
    "fat": 24,
    "carbohydrates": 53,
    "calories": 420,
    "price": 800,
    "image": "https://code.s3.yandex.net/react/code/bun-02.png",
    "image_mobile": "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
    "image_large": "https://code.s3.yandex.net/react/code/bun-02-large.png",
    "__v": 0
  };

  const bun2 = {
    "_id": "60d3b41abdacab0026a733c7",
    "name": "Флюоресцентная булка R2-D3",
    "type": "bun",
    "proteins": 44,
    "fat": 26,
    "carbohydrates": 85,
    "calories": 643,
    "price": 988,
    "image": "https://code.s3.yandex.net/react/code/bun-01.png",
    "image_mobile": "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
    "image_large": "https://code.s3.yandex.net/react/code/bun-01-large.png",
    "__v": 0
  };

  const ingredient = {
    "_id": "60d3b41abdacab0026a733c8",
    "name": "Филе Люминесцентного тетраодонтимформа",
    "type": "main",
    "proteins": 44,
    "fat": 26,
    "carbohydrates": 85,
    "calories": 643,
    "price": 900,
    "image": "https://code.s3.yandex.net/react/code/meat-03.png",
    "image_mobile": "https://code.s3.yandex.net/react/code/meat-03-mobile.png",
    "image_large": "https://code.s3.yandex.net/react/code/meat-03-large.png",
    "__v": 0
  };

  const initialState = {
    ingredients: [],
    bun: null,
    totalPrice: 0
  };

  it('test addCartIngredient bun', () => {
    expect(reducer(initialState, addCartIngredient(bun))).toEqual({
      ingredients: [],
      bun: bun,
      totalPrice: 1600
    });

    expect(reducer({
      ingredients: [],
      bun: bun,
      totalPrice: 1600
    }, addCartIngredient(bun2))).toEqual({
      ingredients: [],
      bun: bun2,
      totalPrice: 1976
    });
  })

  it('test addCartIngredient ingredient', () => {
    expect(reducer(initialState, addCartIngredient(ingredient))).toMatchObject({
      ingredients: [ingredient],
      bun: null,
      totalPrice: 900
    });
  })

  it('test deleteCartIngredient', () => {
    const initialState = {
      ingredients: [ingredient, ingredient],
      bun: null,
      totalPrice: 1800
    };

    expect(reducer(initialState, deleteCartIngredient({item: ingredient, index: 0}))).toEqual({
      ingredients: [ingredient],
      bun: null,
      totalPrice: 900
    });
  })

  it('test updateListIngredients', () => {
    expect(reducer(initialState, updateListIngredients([ingredient, ingredient, ingredient]))).toEqual({
      ingredients: [ingredient, ingredient, ingredient],
      bun: null,
      totalPrice: 0
    });
  })

  it('test resetCart', () => {
    expect(reducer(initialState, resetCart())).toEqual({
      ingredients: [],
      bun: null,
      totalPrice: 0
    });
  })
})