import reducer from './app.reducer';

const initialState = {
  allIngredients: [],
  allIngredientsLoading: false,
  allIngredientsFailed: false,
  order: null
};

describe('app slice', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });
});
