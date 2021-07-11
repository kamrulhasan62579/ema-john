import React from 'react';
import { Link } from 'react-router-dom';
import './Product.css';

const Product = (props) => {
const {name, category, key, img, quantity = 0, price, star, stock, features = [], shipping, seller} = props.product;
    return (
        <div className="single-product" >
            <h3><Link  className="name-link"  to={`/product/${key}`}>{name}</Link></h3>
            <div className="img">
            <img src={img} alt=""/>
            </div>
            <div className="product-detail">
                <div className="">
                    <div>Category: {category}</div>
                    <div>Seller: {seller}</div>
                    <div>Price: {price}</div>
                    <div>Shipping: {shipping}</div>
                    <div>Only {stock} pcs is available, Order now</div>
                    <div>Quantity : {quantity}</div>
                    <br/>
                    {
                        props.children
                    }
                </div>
                <div className="">
                    <br/>
                    <div>Rating: {star} star <small> <strong>({star}/5)</strong> </small> </div>
                    {
                        features.map(fea => <li>{fea.description} : <strong>{fea.value}</strong> </li> )
                    }
                </div>
            </div>
        </div>
    );
};

export default Product;