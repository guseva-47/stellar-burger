export type TIngredient = {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  image: string;
  image_mobile: string;
  image_large: string;
  price: number;
};

export type TIngredientInOrder = { uuid: string } & TIngredient;

export enum TypesOfIngredients {
  bun = 'bun',
  main = 'main',
  sauce = 'sauce',
}
