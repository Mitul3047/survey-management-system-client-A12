import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";

import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import useAuth from "../Hooks/useAuth";
// import useSurveys from "../Hooks/useSurveys";
import moment from "moment/moment";
import useUser from "../Hooks/useUser";


const CheckoutForm = () => {
    const [users, , refetch] = useUser();
    console.log(users);
    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState('')
    const [transactionId, setTransactionId] = useState('');
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    console.log(user?.email);
    // const [cart, refetch] = useCart();
    const navigate = useNavigate();

    const filterUser = users.filter(survey => survey?.email === user?.email)
    console.log('fghj', filterUser[0]?.email);
    const userId = filterUser[0]?._id

    const totalPrice = 30

    useEffect(() => {
        if (totalPrice > 0) {
            axiosSecure.post('/create-payment-intent', { price: totalPrice })
                .then(res => {
                    console.log(res.data.clientSecret);
                    setClientSecret(res.data.clientSecret);
                })
        }

    }, [axiosSecure, totalPrice])

    // const handleSubmit = async (event) => {
    //     event.preventDefault();

    //     if (!stripe || !elements) {
    //         return
    //     }

    //     const card = elements.getElement(CardElement)

    //     if (card === null) {
    //         return
    //     }

    //     const { error, paymentMethod } = await stripe.createPaymentMethod({
    //         type: 'card',
    //         card
    //     })

    //     if (error) {
    //         console.log('payment error', error);
    //         setError(error.message);
    //     }
    //     else {
    //         console.log('payment method', paymentMethod)
    //         setError('');
    //     }

    //     // confirm payment
    //     const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
    //         payment_method: {
    //             card: card,
    //             billing_details: {
    //                 email: user?.email || 'anonymous',
    //                 name: user?.displayName || 'anonymous'
    //             }
    //         }
    //     })

    //     if (confirmError) {
    //         console.log('confirm error')
    //     }
    //     else {
    //         console.log('payment intent', paymentIntent)
    //         if (paymentIntent.status === 'succeeded') {
    //             console.log('transaction id', paymentIntent.id);
    //             setTransactionId(paymentIntent.id);

    //             // now save the payment in the database
    //             const payment = {
    //                 email: user.email,
    //                 name: user?.displayName,
    //                 photo: user?.photoURL,

    //                 transactionId: paymentIntent.id,
    //                 date: moment().utc().toDate(),

    //                 proUser: true
    //             }

    //             const res = await axiosSecure.post('/payments', payment);
    //             console.log('payment saved', res.data);
    //             refetch();
    //             if (res.data?.insertedId) {
    //                 Swal.fire({

    //                     icon: "success",
    //                     title: "Thank you for the taka paisa",
    //                     showConfirmButton: false,
    //                     timer: 1500
    //                 });
    //                 navigate('/surveys')
    //             }

    //         }
    //     }

    // }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (card === null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        });

        if (error) {
            console.log('payment error', error);
            setError(error.message);
        } else {
            console.log('payment method', paymentMethod);
            setError('');
        }

        // confirm payment
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        });

        if (confirmError) {
            console.log('confirm error:', confirmError);
        } else {
            console.log('payment intent:', paymentIntent);
            if (paymentIntent.status === 'succeeded') {
                console.log('transaction id:', paymentIntent.id);
                setTransactionId(paymentIntent.id);

                // Save the payment in the database
                const payment = {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous',

                    photo: user?.photoURL,

                    transactionId: paymentIntent.id,
                    date: moment.utc(new Date()).format('YYYY-MM-DD HH:mm'),
                    proUser: true
                };

                const res = await axiosSecure.post('/payments', payment);
                console.log('payment saved:', res.data);
                refetch();

                if (res.data?.insertedId) {
                    // Update user status to 'pro user'
                    axiosSecure.patch(`/users/prouser/${userId}`)
                        .then(updateRes => {
                            console.log(updateRes.data);
                            if (updateRes.data.modifiedCount > 0) {
                                refetch();
                                Swal.fire({
                                    icon: "success",
                                    title: `${user.name}  Pro user Now!`,
                                    showConfirmButton: false,
                                    timer: 1500
                                });
                            }
                        })
                        .catch(err => {
                            // Handle error if the user update fails
                            console.error("Error updating user status:", err);
                        });

                    // Show success message and navigate
                    Swal.fire({
                        icon: "success",
                        title: "Thank you for the payment!",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    navigate('/surveys');
                }
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <button className="btn btn-sm btn-primary my-4" type="submit" disabled={!stripe || !clientSecret}>
                Pay
            </button>
            <p className="text-red-600">{error}</p>
            {transactionId && <p className="text-green-600"> Your transaction id: {transactionId}</p>}
        </form>
    );
};

export default CheckoutForm;