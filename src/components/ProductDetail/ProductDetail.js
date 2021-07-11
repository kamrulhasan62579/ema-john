import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Product from '../Product/Product';

const ProductDetail = () => {
    const product = useParams()
    
    const [productDetail, setProductDetail] = useState({});

    useEffect(() =>{
        fetch(`https://floating-river-16759.herokuapp.com/product/${product.key}`)
        .then(res => res.json())
        .then(data => setProductDetail(data))
    }, [])
    
    return (
        <div>
            {
              <Product key={product.key} product={productDetail}> <button className="btn">Details</button> </Product>  
            }
        </div>
    );
};

export default ProductDetail;