import React from 'react';

const Cart = (props) => {
    const cart = props.cart

    const total = cart.reduce((total, prd) => total + (prd.price*prd.quantity), 0)
    const shipping = cart.reduce((shipping, prd) => shipping + prd.shipping * prd.quantity || 1, 0)

    const total1 = Number(total.toFixed(2));
    const shipping1 = Number(shipping.toFixed(2));

    const tax = Number((total * 0.1).toFixed(2));

    const grandTotal = (total1+tax+shipping1).toFixed(2)
    return (
        <div className="cart-content">
            <h3>Order Summary</h3>
                      <br/>
            <div>Items ordered: {cart.length}</div>
            <div>Product Total: {total1}</div>
            <div>Tax & VAT: {tax}</div>
            <div>Shipping: {shipping1}</div>
            <div>Grand Total: {grandTotal}</div>
                       <br/>
            {
                props.children
            }
        </div>
    );
};

export default Cart;