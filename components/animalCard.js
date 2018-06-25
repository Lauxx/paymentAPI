var React = require('react');

var AnimalCard = React.createClass({


	render: function(){

		return (
			<div className="card-column">
				<div className="col-sm-4">
					<div className="card ">
						<div className="card-body well animalCard">
							<img className="stockPhoto" src={this.props.image}/>
							<h4 className=""> Name: { this.props.name }  </h4>
							<h4 className=""> Species: { this.props.species } </h4>
							<h4 className=""> Color: { this.props.color } </h4>
							<h4 className=""> Age: { this.props.age } </h4>
							<h4 className=""> Price: ${ this.props.price } USD</h4>
							<button type="button" className="btn btn-success">
								<Button
								    total= {this.props.price + 5}
								    displayItems={[
								      {
								        label: "Promo code",
								        amount: {
								          currency: 'USD',
								          value: this.props.price,
								        }
								      },
								      {
								        label: "Taxes",
								        amount: {
								          currency: 'USD',
								          value: 5
								        }
								      }
								    ]}
								    onSuccess={(data) => console.log(data) }
								>Purchase</Button>
							</button>
						</div>	
					</div>
				</div>
			</div>
			)
	}
});

import PropTypes from "prop-types";

const Button = ({
  supportedNetworks,
  supportedMethods,
  onClick,
  children,
  requestPayerName,
  requestPayerEmail,
  onSuccess,
  onError,
  currency,
  totalLabel,
  total,
  displayItems
}) => {
  const paymentMethods = [
    {
      supportedMethods: supportedMethods,
      supportedNetworks: supportedNetworks
    }
  ];

  const paymentDetails = {
    total: {
      label: totalLabel,
      amount: {
        currency: currency,
        value: total
      }
    },
    displayItems
  };

  const options = {
    requestPayerName,
    requestPayerEmail
  };

  const paymentRequest = new PaymentRequest(
    paymentMethods,
    paymentDetails,
    options
  );

  const showUI = () =>
    paymentRequest
      .show()
      .then(paymentResponse => {
        return paymentResponse.complete().then(() => {
          onSuccess(paymentResponse);
        });
      })
      .catch(err => {
        onError(err);
      });

  if (window.PaymentRequest) {
    return (
      <span role="button" onClick={showUI}>
        {children}
      </span>
    );
  } else {
    // No support. Proceed the old school way
  }
};


Button.propTypes = {
  /** Button label */
  children: PropTypes.string.isRequired,
  /** The size of the button */
  supportedMethods: PropTypes.array,
  methodData: PropTypes.object,
  /** Gets called when the user clicks on the button */
  onClick: PropTypes.func,
  onSuccess: PropTypes.func,
  onError: PropTypes.func,
  requestPayerName: PropTypes.bool,
  requestPayerEmail: PropTypes.bool
};

Button.defaultProps = {
  supportedMethods: ["basic-card"],
  supportedNetworks: ["visa", "mastercard"],
  requestPayerName: false,
  requestPayerEmail: false,
  onSuccess: () => {},
  onError: () => {},
  currency: "USD",
  totalLabel: "",
  total: 0,
  /* eslint-disable no-console */
  onClick: event => {
    console.log("You have clicked me!", event.target);
  }
  /* eslint-enable no-console */
};

module.exports = AnimalCard;