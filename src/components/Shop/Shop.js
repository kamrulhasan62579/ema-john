import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import "./Shop.css";
import Loading from '../Loading/Loading'


const Shop = () => {
    const [products, setProducts] = useState([]);

    useEffect(() =>{
        fetch('https://floating-river-16759.herokuapp.com/products')
        .then(res=> res.json())
        .then(data => setProducts(data))
    }, [])
    const [cart, setCart] = useState([]);
        const handleAddCart = (pd) => {
            const sameProduct = cart.find(prd => prd.key === pd.key);
            let newCart;
            let count = 1;
            if (sameProduct) {
                count = sameProduct.quantity + 1;
                 sameProduct.quantity = count;
                const others = cart.filter(prod => prod.key !== pd.key);
                newCart = [...others, sameProduct];
            }
            else{
                pd.quantity = 1;
                newCart = [...cart, pd]; 
            }
            setCart(newCart);
            addToDatabaseCart(pd.key, count)
           }
           useEffect(() => {
            const saveProduct = getDatabaseCart()
            const productKey = Object.keys(saveProduct);
           if (products.length) {
                const filterProducts = productKey.map(key => {
                    const product = products.find(pd => pd.key === key);
                    product.quantity = saveProduct[key];
                    return product;
                })
                setCart(filterProducts);
           }
        }, [products])
    return (
        <div className="shop-container" >
            <div className="product-container">
               <div className="text-center">
                     {
                        products.length === 0 && <Loading></Loading>
                    }
               </div>
                 {
                     products.map(pd => <Product key={pd.key} product={pd}>
                         <button onClick={() => handleAddCart(pd)} className="btn">Add to cart</button>
                     </Product> )
                 }
            </div>
            <div className="cart-container">
                 <Cart cart={cart}> <Link to={`/review`} > <button className="btn">Review order</button> </Link> </Cart>
            </div>
        </div>
    );
};

export default Shop;