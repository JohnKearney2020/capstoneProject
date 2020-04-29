import React, {useState} from 'react'
import { CardElement, injectStripe } from 'react-stripe-elements'


function CheckoutForm({stripe, totalCost}) {
    const [status, setStatus] = useState('default')

    const submit = async e => {
        e.preventDefault();
        setStatus('submitting');

        try {
            let { token } = await stripe.createToken({ name:'Name' });
            let response = await fetch('./netlify/functions/charge', {
                method: 'POST',
                body: JSON.stringify({
                    amount: totalCost * 100,
                    toke: token.id,
                }),
            });
            if(response.ok) {
                setStatus('complete');
            } else {
                throw new Error('Network Response Failed');
            }
        } catch(err) {
            setStatus('Error!')
        }
    };

    if(status === 'complete'){
        return <div className="form-complete">Payment Succesful! Thank You!</div>
    };


    return (
        <form className="checkout-form" onSubmit={submit}>
            <h4>Complete the Purchase?</h4>
            <CardElement />

            <button className="checkout-form-button" type="submit" disabled={status==='submitting'}>
                {status === 'submitting' ? 'Submitting' : 'Submit Order'}
            </button>
            {status === 'error' && (
                <div className="checkout-form-error">An error occured</div>
            )}
        </form>
    );
}
export default injectStripe(CheckoutForm);