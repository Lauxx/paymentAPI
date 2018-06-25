/*
React Hierarchy for this Application

Animal App
	All Animals
		Animal Card

*/

import React from "react";
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
      supportedMethods: ["basic-card"],
      supportedNetworks: ["visa", "mastercard"]
    }
  ];

  const paymentDetails = {
    total: {
      label: "Total",
      amount: {
        currency: "USD",
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
    	<button type="button" className="btn btn-success" onClick={showUI}>
    	  	{children}
    	</button>
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
  onSuccess: PropTypes.func,
  onError: PropTypes.func
};

Button.defaultProps = {
  requestPayerName: true,
  requestPayerEmail: true,
  onSuccess: () => {},
  onError: () => {},
  total: 0,
  onClick: event => {
    console.log("You have clicked me!", event.target);
  }
};

class AnimalCard extends React.Component{

	render(){
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
								<Button
								    total= {this.props.price + 5}
								    displayItems={[
								      {
								        label: "Subtotal",
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
								    onSuccess={(data) => console.log(data) } >
									Purchase
								</Button>
						</div>	
					</div>
				</div>
			</div>
		)
	}
}

module.exports = AnimalCard;