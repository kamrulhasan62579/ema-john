import React, { useEffect } from 'react';
import fakeData from '../../fakeData';
import './Manage.css'
import { useForm } from "react-hook-form";

const Manage = () => {

        //  setInterval(() => {
        //         const day = document.querySelector(".day .num")
        //         const hour = document.querySelector(".hour .num")
        //         const minute = document.querySelector(".minute .num")
        //         const second = document.querySelector(".second .num")
                
        //         const currentDate = new Date().getTime();
        //         const lunchDate = new Date("20 june, 2021 13:00:00").getTime()
        //         const duration = currentDate - lunchDate;
        //         const days = Math.round(duration / (1000*60*60*24))
        //         const hours = Math.round((duration % (1000*60*60*24)) / (1000*60*60))
        //         const minutes = Math.round((duration % (1000*60*60)) / (1000*60))
        //         const seconds = Math.round((duration % (1000*60)) / (1000))             

        //         day.innerHTML = days;
        //         hour.innerHTML = hours;
        //         minute.innerHTML = minutes;
        //         second.innerHTML = seconds;
                        
        //         if(days < 10){
        //             day.innerHTML = "0" + days;
        //         }
        //         if(hours < 10){
        //             hour.innerHTML = "0" + hours;
        //         }
        //         if(minutes < 10){
        //             minute.innerHTML = "0" + minutes;
        //         }
        //         if(seconds < 10){
        //             second.innerHTML = "0" + seconds;
        //         }
        
        //     }, 1000);
 

            const { register, handleSubmit, watch, formState: { errors } } = useForm();
            const onSubmit = (data) => {
                fetch('https://floating-river-16759.herokuapp.com/addProduct', {
                    method: "POST",
                    body: JSON.stringify(data),
                    headers: {
                     'Content-type': 'application/json; charset=UTF-8'
                    }
                })
                console.log(data);
            };
    return (
        <div>
            {/* <h1 className="h1">Times Left</h1>
            <div className="duration">
                <div className="count day">
                    <div className="num">00</div>
                    <div className="txt">Days</div>
                </div>
                <div className="count hour">
                    <div className="num">00</div>
                    <div className="txt">Hours</div>
                </div>
                <div className="count minute">
                    <div className="num">00</div>
                    <div className="txt">Minutes</div>
                </div>
                <div className="count second">
                    <div className="num">00</div>
                    <div className="txt">Seconds</div>
                </div>
            </div> */}
            <div className="text-center container">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <span>Product Name</span>                    
                    <input className="form-control" {...register("name", { required: true })} />
                    {errors.name && <span className="error">Product name is required</span>} <br/>

                     <span>Product Key</span>
                    <input className="form-control" {...register("key", { required: true })} />
                    {errors.key && <span className="error">Product key is required</span>} <br/>  

                    <span>Product Category</span>
                    <input className="form-control" {...register("category", { required: true })} />
                    {errors.category && <span className="error">Product category is required</span>} <br/>  

                    <span>Product Seller Company</span>
                    <input className="form-control" {...register("seller", { required: true })} />
                    {errors.seller && <span className="error">Product seller is required</span>} <br/>  

                    <span>Product Stock Quantity</span>
                    <input className="form-control" {...register("stock", { required: true })} />
                    {errors.stock && <span className="error">Stock is required</span>} <br/>  

                    <span>Product Star Ratings</span>
                    <input className="form-control" {...register("star", { required: true })} />
                    {errors.star && <span className="error">Star is required</span>} <br/>  

                    <span>Product Price</span>
                    <input className="form-control" {...register("price", { required: true })} />
                    {errors.price && <span className="error">Product price is required</span>} <br/>

                    <span>Product Shipping Charge</span>
                    <input className="form-control" {...register("shipping", { required: true })} />
                    {errors.shipping && <span className="error">Shipping charge is required</span>} <br/>  

                    <span>Insert hosted image url </span>
                    <input className="form-control" {...register("img", { required: true })} />
                    {errors.img && <span className="error">Hosted imgage url is required</span>} <br/>                    
                    <input className="btn-success" type="submit" />
                </form>
            </div>
        </div>
    );
};

export default Manage;