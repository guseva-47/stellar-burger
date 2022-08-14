import getIngredients from '../../fixtures/constructor.fixture';

describe('Главная страница', () => {
  it('Страница доступна по адресу baseUrl', () => {
    cy.visit('/');
    cy.contains('Соберите бургер');
  });

  describe('Ингредиенты отображаются на странице', () => {
    getIngredients();

    it('Должен появиться ингредиент', () => {
      cy.wait('@ingredients');
      cy.contains('Ингредиент 1');
    });
  });

  describe('Отображение информации, об отсутствии ингредиентов', () => {
    beforeEach(() => {
      cy.intercept('GET', 'api/ingredients', { fixture: 'empty-ingredient.json' }).as(
        'ingredients'
      );
      cy.visit('/');
    });

    it('Должна появиться надпись Загрузка', () => {
      cy.contains('Загрузка');
    });

    it('Должна появиться надпись Пусто, когда ингредиенты не загрузились', () => {
      cy.wait('@ingredients');
      cy.contains('Пусто');
    });
  });
});
