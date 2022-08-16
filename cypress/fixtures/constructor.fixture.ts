const getIngredients = () => {
  cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as('ingredients');
};

export default getIngredients;
