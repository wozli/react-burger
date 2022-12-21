// @ts-ignore
describe('test constructor page', () => {

  before(function() {
    cy.visit('http://localhost:3000');
  });

  beforeEach(function() {
    cy.intercept('POST', 'https://norma.nomoreparties.space/api/orders').as('orders')
  });


  it('passes', () => {
    cy.get('[class^=ProductCard_card__]').first().as('product');
    cy.get('@product').click();
    cy.get('[class^=Modal_modal__close__]').first().as('modalClose1');
    cy.wait(2000);
    cy.get('@modalClose1').click();

    cy.get('[class^=BurgerConstructor_section__]').last().as('container');
    cy.get('@product').trigger('dragstart');
    cy.get('@container').trigger('drop');
    cy.get('@container').get('[class^=button]').click();

    cy.get('[type=email]').as('email');
    cy.get('@email').type('wozli2333@gmail.com');

    cy.get('[type=password]').as('password');
    cy.get('@password').type('12345s');
    cy.get('[type=submit]').contains('Войти').click();

    cy.get('@container').get('[class^=button]').click();
    cy.wait('@orders');
    cy.wait(2000);
    cy.get('@modalClose1').click();
  })
})