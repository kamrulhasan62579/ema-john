import React, { useEffect, useState } from 'react';
import { getDatabaseCart, removeFromDatabaseCart, processOrder} from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Review.css'
import { useHistory } from 'react-router-dom';
import Loading from '../Loading/Loading';


const Review = () => {
    const [products, setProducts] = useState([]);

    useEffect(() =>{
        fetch('https://floating-river-16759.herokuapp.com/products')
        .then(res=> res.json())
        .then(data => setProducts(data))
    }, [])
    const [cart, setCart] = useState([]);
useEffect(() => {
    const saveProduct = getDatabaseCart()
    const productKey = Object.keys(saveProduct);
    if (products.length) {
        const cartProducts = productKey.map(key => {
            const product = products.find(pd => pd.key === key);
            product.quantity = saveProduct[key];
            return product;
        })
        setCart(cartProducts);
    }
}, [products])
const handleRemove = (key) => {
    removeFromDatabaseCart(key);
    const sameProduct = cart.find(prd => prd.key === key);
    let newCart;
    let count = 1;
    if (sameProduct ) {
        sameProduct.quantity = sameProduct.quantity - 1;
        newCart = [...cart];
    }
    if (sameProduct.quantity < 1) {
        const others = cart.filter(prod => prod.key !== key);
        newCart = [...others];
    }
    setCart(newCart);
}

const history = useHistory();
const handleProceedCheakout = () =>{
    history.push('/shipment')
}
    return (
        <div className="shop-container" >
            <div className="product-container">
            <div className="text-center">
                     {
                        cart.length === 0 && <Loading></Loading>
                    }
               </div>
                 {
                     cart.map(prd => <Product product={prd}>
                     <br/><button onClick={() => handleRemove(prd.key)} className="btn">Remove</button></Product> )
                 }
            </div>
            <div className="cart-container">
                 <Cart cart={cart}> <button onClick={handleProceedCheakout} className="btn">Proceed Cheakout</button> </Cart>
            </div> 
        </div>
    );
};

export default Review;