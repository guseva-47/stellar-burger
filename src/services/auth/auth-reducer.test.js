import reducer from './auth.reducer';

const initialState = {
  user: {
    email: '',
    name: '',
  },
  isUser: { isLoading: false, isFailed: false },
  isReg: { isLoading: false, isFailed: false, errMessage: '' },
  isLogin: { isLoading: false, isFailed: false, errMessage: '' },
  isEdit: { isLoading: false, isFailed: false },
};

describe('app slice', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });
});
