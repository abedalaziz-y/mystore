import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import StripeCheckout from "../stripe/StripeCheckout";
import "../stripe/stripe.css";

// load stripe outside of components render to avoid recreating stripe object on every render
const promise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

const Payment = () => {
    return (
        <div className="container p-5 text-center">
           <p className="alert alert-warning"> 
                Please Don't buy from real card insted use 
                4242 4242 4242 4242 as card number<br/>
                moth 04 and year 24 and CVC 242  and ZIPCODE 42424 </p>
            <h4>Complete your purchase</h4>
            <Elements stripe={promise}>
                <div className="col-md-8 offset-md-2">
                    <StripeCheckout />
                </div>
            </Elements>
        </div>
    );
};

export default Payment;
