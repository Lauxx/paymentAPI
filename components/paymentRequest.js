//Designed to support debit & credit card payments, as well as third party payments such as Google Pay
//If a user has no cards setup, they'll be prompted to add details, otherwise an existing card will be selected
const creditCardPaymentMethod = {
    supportedMethods: 'basic-card', //allows the support of credit/debit cards
    data: {
      supportedNetworks: ['visa', 'mastercard', 'amex'],
      supportedTypes: ['debit', 'credit'],//An option to filter out existing cards - does not guarentee that the final card enter is supported or not
  }
};

const fakePaymentProcessor = {
  supportedMethods: 'https://exampleFakePaymentProcessor', 
  data: {
    merchantIdentified: 'XXXXX',
    fooBarSpecificField: true
  }
};

//Supporting mutliple payment methods by storing in an array before passing it into the PaymentRequest Constructor
const supportedPaymentMethods = [creditCardPaymentMethod, fakePaymentProcessor];


//Leveraged to display a high-level breakdown of the total including things like: subtotal, discount, tax
const allDisplayItems = [
  {
    label: 'Subtotal',
    amount: {
      currency: 'USD',
      value: 10,
    },
  }, {
    label: 'Discount (10%)',
    amount: {
      currency: 'USD',
      value: -1,
    },
  }, {
    label: 'Tax',
    pending: true,
    amount: {
      currency: 'USD',
      value: 0.68,
    },
  },
];


const paymentDetails = {
  //total is the only required piece of information in the payment details object
  total: {
    //label can reflect whatever suites you
    label: 'Total',
    amount:{
      currency: 'USD',
      value: 0
    }
  },
  // displayitem: allDisplayItems,
};

/* 
- Options isn't required. - could utilize things like the person's name, email ect.
- Note only add what you need, this will result in a longer checkout time
- If data is already available this will be pre-populated
*/
const options = {
  requestPayerName: true,
  requestPayerPhone: true,
  requestPayerEmail: true,
};

const paymentRequest = new PaymentRequest(supportedPaymentMethods, paymentDetails, options);


function oneMoreTry(){
  paymentRequest.show()
  .then((paymentResponse) => {
  // The user filled in the required fields and completed the flow
  // Get the details from `paymentResponse` and complete the transaction.
  return paymentResponse.complete();
})
.catch((err) => {
  // The API threw an error or the user closed the UI
  console.log(err);
});
}


/*
 - Things to note: 

 * Negative Total (Refunds) - Payment Requet API does not support negative totals
 * Invalid Currency - Must follow ISO Currency Codes (3 uppercase indication of currency, USD, GBP)
    - allows any combination of 3 letters to support future payments, such as Bitcoin (XBT)
    - does not support mulitple currencies
    - Currency formatting - only supports one decimal point: 1,000.00 is invalid, but 1000.00 is valid


*/