import reducer, {
  setStuffing,
  removeStuffing,
  setBun,
  removeBun,
  updateOrder,
} from './order.reducer';

const initialState = {
  ingredients: {
    stuffing: [],
    bun: null,
  },
  number: null,
  isLoading: false,
  isFailed: false,
};

const bun = {
  _id: '60666c42cc7b410027a1a9b1',
  name: 'Краторная булка N-200i',
  type: 'bun',
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: 'https://code.s3.yandex.net/react/code/bun-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
};

const stuffing = {
  _id: '60666c42cc7b410027a1a9b2',
  name: 'Флюоресцентная булка R2-D3',
  type: 'bun',
  proteins: 44,
  fat: 26,
  carbohydrates: 85,
  calories: 643,
  price: 988,
  image: 'https://code.s3.yandex.net/react/code/bun-01.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
};

describe('order slice', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should add bun with "setBun" action', () => {
    const action = { type: setBun.type, payload: bun };
    const result = reducer(initialState, action);

    expect(result.ingredients).toEqual({
      ...initialState.ingredients,
      bun,
    });
  });

  it('should add new stuffing with "setStuffing" action', () => {
    const action = { type: setStuffing.type, payload: stuffing };
    const result = reducer(initialState, action);

    expect(result.ingredients.stuffing[0]).toEqual(expect.objectContaining(stuffing));
  });

  it('should add new stuffing with uuid with "setStuffing" action', () => {
    const action = { type: setStuffing.type, payload: stuffing };
    const result = reducer(initialState, action);

    expect(result.ingredients.stuffing[0].uuid).not.toBeUndefined();
  });

  it('should remove stuffing with "removeStuffing" action', () => {
    const action = { type: removeStuffing.type, payload: stuffing._id };
    const state = { ...initialState };
    state.ingredients.stuffing = [stuffing];
    const result = reducer(state, action);

    expect(result.ingredients.stuffing).not.toEqual(expect.arrayContaining([stuffing]));
  });

  it('should remove bun with "removeBun" action', () => {
    const action = { type: removeBun.type };
    const state = { ...initialState };
    state.ingredients.bun = bun;
    const result = reducer(state, action);

    expect(result.ingredients.bun).toBeNull();
  });

  it('should update stuffing with "removeBun" action', () => {
    const action = { type: updateOrder.type, payload: { idFrom: 2, idTo: 0 } };
    const state = { ...initialState };
    state.ingredients.stuffing = [
      { ...stuffing, _id: '0' },
      { ...stuffing, _id: '1' },
      { ...stuffing, _id: '2' },
    ];
    const result = reducer(state, action);

    expect(result.ingredients.stuffing).toEqual([
      { ...stuffing, _id: '2' },
      { ...stuffing, _id: '0' },
      { ...stuffing, _id: '1' },
    ]);
  });
});
