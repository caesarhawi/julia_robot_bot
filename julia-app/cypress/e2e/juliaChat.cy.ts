describe('JuliaChat Component', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000');
    });
  
    it('responds with correct message for "help"', () => {
      cy.get('input[placeholder="Type your message..."]').type('help');
      cy.contains('Send').click();
  
      cy.contains('Please be specific on what you need help with.').should('be.visible');
    });
  
    it('responds with correct message for "machine"', () => {
      cy.get('input[placeholder="Type your message..."]').type('machine');
      cy.contains('Send').click();
  
      cy.contains('Yes, I am in fact a machine.').should('be.visible');
    });
  
    it('responds with correct message for "order"', () => {
      cy.get('input[placeholder="Type your message..."]').type('order');
      cy.contains('Send').click();
  
      cy.contains("I can't give out any information about any specific order.").should('be.visible');
    });
  
    it('responds with correct message for "bye"', () => {
      cy.get('input[placeholder="Type your message..."]').type('bye');
      cy.contains('Send').click();
  
      cy.contains('Thank you for contacting us! Have a nice day!').should('be.visible');
    });
  
    it('responds with a default message for unknown input', () => {
      cy.get('input[placeholder="Type your message..."]').type('random text');
      cy.contains('Send').click();
  
      cy.contains("I'm sorry, I don't understand.").should('be.visible');
    });
  });
  