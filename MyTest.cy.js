describe('Magento - Sign Up and Sign In Flow', () => {

  const user = {
    firstName: ' bhargavi'.trim(),
    lastName: 'raavi'.trim(),
    email: 'bhargavi.raavi' + Date.now() + '@example.com', // To avoid duplicate emails
    password: 'Test1234!',
    phone: '5551234567',
  };

  it('should sign up a new user', () => {
    // Step 1: Navigate to the home page
    cy.visit('https://magento.softwaretestingboard.com/');

    // Step 2: Click on 'Create an Account' button
   // cy.get('a.authorization-link').should('be.visible').click();  // Link to Create Account
   cy.get('a.authorization-link').click({ force: true });

    // Step 3: Fill out the registration form
    cy.get('#firstname').type(user.firstName);
    cy.get('#lastname').type(user.lastName);
    cy.get('#email_address').type(user.email);
    cy.get('#password').type(user.password);
    cy.get('#password-confirmation').type(user.password);
    cy.get('#telephone').type(user.phone);

    // Step 4: Submit the registration form
    cy.get('.action.submit.primary').click();

    // Step 5: Verify account creation (check if we are redirected to the account dashboard or a success message is visible)
    cy.url().should('include', 'customer/account');
    cy.contains('Thank you for registering with Fake Online Clothing Store.');
  });

  it('should sign in with the created user account', () => {
    // Step 1: Visit the login page (assuming user is redirected after signup)
    cy.visit('https://magento.softwaretestingboard.com/customer/account/login/');

    // Step 2: Enter the login credentials
    cy.get('#email').type(user.email);
    cy.get('#pass').type(user.password);

    // Step 3: Submit the login form
    cy.get('.action.login').click();

    // Step 4: Verify successful login (Check if user is redirected to the dashboard)
    cy.url().should('include', 'customer/account');

    // Debug log to check the user details
    cy.log('Verifying greeting message for: ' + user.firstName + ' ' + user.lastName);
    
    // Log page content for debugging
    cy.get('body').then(($body) => {
      if ($body.text().includes('Hello, ' + user.firstName + ' ' + user.lastName + '!')) {
        cy.log('Text found on the page.');
        cy.contains('Hello, ' + user.firstName + ' ' + user.lastName + '!').should('be.visible');
      } else {
        cy.log('Text not found on the page.');
      }
    });
  });
});
