// @ts-ignore
describe('test constructor page', () => {

  before(function() {
    cy.visit('http://localhost:3000');
  });

  beforeEach(function() {
    cy.intercept("GET", "api/ingredients", { fixture: "ingredients.json" });
    cy.intercept("GET", "api/orders", { fixture: "orders.json" });
  });

  it('Проверка открытия и закрытия модалки ингредиента', () => {
    cy.get('[class^=ProductCard_card__]').first().as('product');
    cy.get('@product').click();
    cy.get('[class^=Modal_modal__]').should('exist');
    cy.get('[class^=Modal_modal__]').contains('Краторная булка N-200i');
    cy.get('[class^=Modal_modal__close__]').first().as('modalClose1');
    cy.get('@modalClose1').click();
    cy.get('[class^=Modal_modal__]').should('not.exist');
  })

  it('Проверка перетаскивания ингредиента', () => {
    cy.visit('http://localhost:3000');
    cy.get('[class^=ProductCard_card__]').first().as('product');
    cy.get('[class^=BurgerConstructor_section__]').last().as('container');
    cy.get('@product').trigger('dragstart');
    cy.get('@container').trigger('drop');
    cy.get('@container').contains('Краторная булка N-200i');
  })

  beforeEach(function() {
    cy.intercept("POST", "api/orders", { fixture: "orders.json" }).as('orders');
  });

  it('Проверка оформления заказа', () => {
    cy.visit('http://localhost:3000');
    cy.get('[class^=ProductCard_card__]').first().as('product');
    cy.get('[class^=BurgerConstructor_section__]').last().as('container');
    cy.get('@product').trigger('dragstart');
    cy.get('@container').trigger('drop');
    cy.get('@container').contains('Краторная булка N-200i');
    cy.get('@container').get('[class^=button]').click();

    cy.get('[type=email]').as('email');
    cy.get('@email').type('wozli2333@gmail.com');
    cy.get('[type=password]').as('password');
    cy.get('@password').type('12345s');
    cy.get('[type=submit]').contains('Войти').click();

    cy.get('@container').get('[class^=button]').click();
    cy.wait('@orders');
    cy.get('[class^=Modal_modal__]').should('exist');
    cy.get('[class^=Modal_modal__close__]').first().as('modalClose1');
    cy.get('[class^=Modal_modal__]').contains('35085');
    cy.get('@modalClose1').click();
    cy.get('[class^=Modal_modal__]').should('not.exist');
  })
})