import getIngredients from '../../fixtures/constructor.fixture';

describe('На главной странице работает конструктор создания бургера', () => {
  beforeEach(() => {
    getIngredients();
    cy.visit('/');
  });

  it('Ингредиент можно перетянуть в конструктор, и он добавится в него', () => {
    cy.wait('@ingredients');
    cy.contains('Ингредиент 1').as('item');

    cy.get('#burger-constructor').as('constructor');

    const dataTransfer = new DataTransfer();
    cy.get('@item').trigger('dragstart', { dataTransfer });

    cy.get('@constructor').trigger('drop').trigger('dragend');
    expect(cy.get('@constructor').contains('Ингредиент 1'));

    cy.contains('Добавьте булку').should('not.exist');
  });

  it('В конструкторе есть надпись "Добавьте булку", когда булка добавлена, надпись исчезает', () => {
    cy.wait('@ingredients');
    cy.get('#burger-constructor').as('constructor');

    expect(cy.get('@constructor').contains('Добавьте булку'));

    cy.contains('Ингредиент 1').as('item');

    const dataTransfer = new DataTransfer();
    cy.get('@item').trigger('dragstart', { dataTransfer });

    cy.get('@constructor').trigger('drop').trigger('dragend');
    expect(cy.get('@constructor').contains('Ингредиент 1'));

    cy.contains('Добавьте булку').should('not.exist');
  });
});
