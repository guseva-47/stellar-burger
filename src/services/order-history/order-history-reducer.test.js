import reducer, { setData } from './order-history.reducer';

const initialState = {
  orders: [],
  total: 0,
  totalToday: 0,
};

const orders = {
  orders: [
    {
      ingredients: ['1234'],
      _id: '1',
      status: 'done',
      name: 'order',
      number: '1',
      createdAt: '123456',
      updatedAt: '123456',
    },
  ],
  total: 11,
  totalToday: 1,
};

describe('order-history slice', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should set order, total counts with success status with "setData" action', () => {
    const payload = { ...orders, success: true };
    const action = { type: setData.type, payload };
    const result = reducer(initialState, action);

    expect(result.total).toEqual(11);
    expect(result.totalToday).toEqual(1);
    expect(result.orders[0]._id).toEqual('1');
  });

  it('should set initial state with not success status with "setData" action', () => {
    const action = { type: setData.type, payload: { ...orders } };
    const result = reducer(initialState, action);

    expect(result).toEqual(initialState);
  });
});
