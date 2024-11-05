import { FormEvent, useState } from "react";
import { useSelector } from "react-redux";

import { StripeCardElement } from "@stripe/stripe-js";

import {PaymentFormContainer, FormContainer, PaymentButton} from "./payment-form.styles";

import { selectCartItemsTotal } from "../../store/cart/cart.selector";
import { selectCurrentUser } from "../../store/user/user.selector";

import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

import {BUTTON_TYPE_CLASSES} from "../button/button.component";

const ifValidCardElement = (card: StripeCardElement | null): card is StripeCardElement => card !== null;

export const PaymentForm = () => {

    const stripe = useStripe();
    const elements = useElements();
    const amount = useSelector(selectCartItemsTotal);
    const currentUser = useSelector(selectCurrentUser);
    const [isProcessingPayment, setIsProcessingPayment] = useState(false);

    const paymentHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(!stripe || !elements) {
            return;
        }

        setIsProcessingPayment(true);

        const response = await fetch("/.netlify/functions/create-payment-intent", {
            method: "post",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({amount: amount*100})
        }).then(res => res.json());

        const {paymentIntent: {client_secret}} = response;

        const cardDetails = elements.getElement(CardElement);

        if(!ifValidCardElement(cardDetails)) {
            return;
        }

        const paymentResult = await stripe.confirmCardPayment(client_secret, {
            payment_method: {
                card: cardDetails,
                billing_details: {
                    name: currentUser ? currentUser.displayName : "Guest",
                }
            }
        });

        setIsProcessingPayment(false);

        if(paymentResult.error) {
            alert("Payment Error");
        }
        else{
            if(paymentResult.paymentIntent.status === "succeeded") {
                alert("Payment Successfull");
            }
        }
    }

    return(
        <PaymentFormContainer>
            <FormContainer onSubmit={paymentHandler}>
                <h2>Credit Card Payment:</h2>
                <CardElement />
                <PaymentButton isLoading={isProcessingPayment} buttonType={BUTTON_TYPE_CLASSES.inverted}>Pay now</PaymentButton>
            </FormContainer>
        </PaymentFormContainer>
    )
}

export default PaymentForm;