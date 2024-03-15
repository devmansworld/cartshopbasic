import faker from 'faker';

describe('Main Test Suite', () => {
  it('test with product actions, subscription, checkout, payment, and confirm order', () => {
    const randomFirstName = faker.name.firstName();
    const randomLastName = faker.name.lastName();
    const randomEmail = faker.internet.email();
    const randomPassword = faker.internet.password();
    const randomAddress = faker.address.streetAddress();
    const randomCity = faker.address.city();
    const randomState = faker.address.state();
    const randomZipcode = faker.address.zipCode();
    const randomMobileNumber = faker.phone.phoneNumber();

    // main-page
    cy.visit('https://automationexercise.com');
    cy.contains('Sleeve').scrollIntoView();
    cy.wait(3000);

    // Locate the first element with class 'col-sm-4' containing the text 'Sleeve'
    cy.get('.col-sm-4:contains("Sleeve")').first().within(($col) => {
      cy.get('.choose a:contains("View Product")').dblclick();
    });

    // product-details
    cy.url().should('include', '/product_details/');
    cy.wait(2000);

    cy.get('.col-sm-7').within(() => {
      cy.get('input#quantity').clear().type('30');
      cy.contains('Add to cart').click();
    });

    cy.wait(1000);
    cy.get('#cartModal').should('be.visible');
    cy.contains('.col-sm-9', 'Your product has been added to cart');

    cy.get('#cartModal').find('.modal-body').should('contain.text', 'View Cart');
    cy.get('#cartModal').contains('View Cart').click();
    cy.wait(3000);

    // cart-view
    cy.url().should('include', '/view_cart');
    cy.wait(1000);

    cy.get('#do_action a.check_out').should('exist').dblclick();
    cy.contains('Checkout').should('exist');
    cy.contains('proceed').should('exist');
    cy.contains('Register').parent().find('a').dblclick();
    cy.wait(2000);

    cy.url().should('include', '/login');
    cy.contains('Signup').should('exist');

    cy.get('[data-qa="signup-name"]').type(randomFirstName + ' ' + randomLastName);
    cy.wait(1000);
    cy.get('[data-qa="signup-email"]').type(randomEmail);
    cy.wait(1000);
    cy.get('[data-qa="signup-button"]').click();
    cy.wait(2000);

    // signup-form
    cy.url().should('include', '/signup');

    cy.get('[data-qa="title"] input[type="radio"]').eq(0).check();
    cy.get('[data-qa="password"]').type(randomPassword);

    // Function to generate a random date within a given range
function getRandomDate(minYear, maxYear) {
  const year = Math.floor(Math.random() * (maxYear - minYear + 1)) + minYear;
  const month = Math.floor(Math.random() * 12) + 1; // Months are 1-12
  const daysInMonth = new Date(year, month, 0).getDate();
  const day = Math.floor(Math.random() * daysInMonth) + 1; // Days are 1 to the last day of the month
  return { year, month, day };
}

// Example usage
const minYear = 1980;
const maxYear = 2000;
const randomDate = getRandomDate(minYear, maxYear);

// Set the selected values in your Cypress test
cy.get('[data-qa="days"]').select(randomDate.day.toString());
cy.get('[data-qa="months"]').select(randomDate.month.toString());
cy.get('[data-qa="years"]').select(randomDate.year.toString());


    //cy.get('[data-qa="days"]').select('15');
    //cy.get('[data-qa="months"]').select('March');
    //cy.get('[data-qa="years"]').select('1990');
    cy.get('#newsletter').check();
    cy.get('#optin').check();
    cy.get('[data-qa="first_name"]').type(randomFirstName);
    cy.get('[data-qa="last_name"]').type(randomLastName);
    cy.get('[data-qa="company"]').type('Example Company');
    cy.get('[data-qa="address"]').type(randomAddress);
    cy.get('[data-qa="address2"]').type('Apt 45');
    cy.get('[data-qa="country"]').select('United States');
    cy.wait(2000);
    cy.get('[data-qa="state"]').type(randomState);
    cy.get('[data-qa="city"]').type(randomCity);
    cy.get('[data-qa="zipcode"]').type(randomZipcode);
    cy.get('[data-qa="mobile_number"]').type(randomMobileNumber);
    cy.get('[data-qa="create-account"]').click();
    cy.wait(5000);
    cy.get('[data-qa="account-created"]').should('exist');

    // Additional steps after creating an account
    cy.url().should('include', '/account_created');
    cy.wait(2000);
    cy.contains('Congratulations!').should('exist');

    // Subscribe with a random email
    cy.get('#subscribe').click();
    cy.get('#success-subscribe').should('exist');
    cy.get('[data-qa="continue-button"]').click();

    // Main page and Cart navigation
    cy.url().should('include', '/');
    cy.wait(2000);

    // Check if logged in (optional)
   // cy.get('[data-qa="logout"]').should('exist'); // Optional: Check for Logout text

    // Click on the Cart button
    cy.contains('Cart').click();cy.contains('Cart').click();
  //  cy.get('#cartButton').click(); // Replace 'cartButton' with the actual ID or selector
    cy.url().should('include', '/view_cart');

// Click on "Proceed To Checkout"
cy.contains('Proceed To Checkout').click();

// Ensure you are on the correct page after the modal
cy.url().should('include', '/checkout');

// Scroll to find the "Place Order" button
cy.contains('Place Order').scrollIntoView().should('be.visible');

// Click on "Place Order" button
cy.contains('Place Order').click();



    // Payment and Confirm order
    cy.url().should('include', '/payment');
 // Payment and Confirm order
 cy.url().should('include', '/payment');

 // Type in credit card information using fake data
cy.get('[data-qa="name-on-card"]').type(faker.name.findName());
cy.get('[data-qa="card-number"]').type(faker.finance.creditCardNumber());
cy.get('[data-qa="cvc"]').type(faker.finance.creditCardCVV());
const futureExpiryDate = faker.date.future();
const expiryMonth = futureExpiryDate.getMonth() + 1; // Months are zero-based
const expiryYear = futureExpiryDate.getFullYear();

cy.get('[data-qa="expiry-month"]').type(expiryMonth.toString().padStart(2, '0'));
cy.get('[data-qa="expiry-year"]').type(expiryYear.toString());


 cy.url().should('include', '/payment');


// Find and click the "Pay and Confirm Order" button by its text
cy.contains('Pay and Confirm Order').click();

// Assert that the success message is displayed (modify the selector as needed)
//

cy.wait(2000);

// Order Placed page actions

// Ensure the URL contains "payment_done" (partial match)
cy.url().should('include', 'payment_done');
// Wait for the "Download Invoice" text and click it
cy.contains('Download Invoice').click();
//Wait for 2 seconds (adjust the duration as needed)
cy.wait(2000);

// Find and click the "Continue" button by its text
cy.contains('Continue').click();

cy.wait(2000);

cy.url().should('include', '/');



  });
});
