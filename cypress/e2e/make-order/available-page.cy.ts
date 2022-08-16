import getIngredients from '../../fixtures/constructor.fixture';

describe('Главная страница', () => {
  it('Страница доступна по адресу baseUrl', () => {
    cy.visit('/');
    cy.contains('Соберите бургер');
  });

  describe('Ингредиенты отображаются на странице', () => {
    beforeEach(() => {
      getIngredients();
      cy.visit('/');
    });

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

  describe('Детали ингредиента', () => {
    beforeEach(() => {
      getIngredients();
      cy.visit('/');
    });

    it('При клике на ингредиент открывается модальное окно', () => {
      cy.wait('@ingredients');
      cy.contains('Ингредиент 1').click();
      cy.get('#modal').should('contain', 'Детали ингредиента');
      cy.get('#modal').should('contain', 'Ингредиент 1');
    });

    it('При клике на ингредиент, в модальном окне есть информация об ингредиенете ', () => {
      cy.wait('@ingredients');
      cy.contains('Ингредиент 1').click();
      cy.get('#modal').should('contain', 'Ингредиент 1');
      cy.get('#modal').should('contain', '420');
      cy.get('#modal').should('contain', '80');
      cy.get('#modal').should('contain', '24');
      cy.get('#modal').should('contain', '53');
    });

    it('При клике на кнопку "крестик", модальное окно закрывается', () => {
      cy.wait('@ingredients');
      cy.contains('Ингредиент 1').click();
      cy.get('#modal').should('contain', 'Детали ингредиента');

      cy.get('#modal button').first().click();
      cy.contains('Детали ингредиента').should('not.be');
    });

    it('При клике на пустое место сбоку, модальное окно закрывается', () => {
      cy.wait('@ingredients');
      cy.contains('Ингредиент 1').click();
      cy.get('#modal').should('contain', 'Детали ингредиента');

      cy.get('#modal').click('topLeft');
      cy.contains('Детали ингредиента').should('not.exist');
    });
  });
});
