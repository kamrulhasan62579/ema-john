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
            <div className="text-center">
                <form className="manage-form" onSubmit={handleSubmit(onSubmit)}>
                    <br/><span>Product Name</span> <br/>                   
                    <input className="int" {...register("name", { required: true })} /> <br/>
                    {errors.name && <span className="error">Product name is required</span>} <br/>

                     <span>Product Key</span> <br/>
                    <input className="int" {...register("key", { required: true })} /> <br/>
                    {errors.key && <span className="error">Product key is required</span>} <br/>  

                    <span>Product Category</span> <br/>
                    <input className="int" {...register("category", { required: true })} /> <br/>
                    {errors.category && <span className="error">Product category is required</span>} <br/>  

                    <span>Product Seller Company</span> <br/>
                    <input className="int" {...register("seller", { required: true })} /> <br/>
                    {errors.seller && <span className="error">Product seller is required</span>} <br/>  

                    <span>Product Stock Quantity</span> <br/>
                    <input className="int" {...register("stock", { required: true })} /> <br/>
                    {errors.stock && <span className="error">Stock is required</span>} <br/>  

                    <span>Product Star Ratings</span> <br/>
                    <input className="int" {...register("star", { required: true })} /> <br/>
                    {errors.star && <span className="error">Star is required</span>} <br/>  

                    <span>Product Price</span> <br/>
                    <input className="int" {...register("price", { required: true })} /> <br/>
                    {errors.price && <span className="error">Product price is required</span>} <br/>

                    <span>Product Shipping Charge</span> <br/>
                    <input className="int" {...register("shipping", { required: true })} /> <br/>
                    {errors.shipping && <span className="error">Shipping charge is required</span>} <br/>  

                    <span>Insert hosted image url </span> <br/>
                    <input className="int" {...register("img", { required: true })} /> <br/>
                    {errors.img && <span className="error">Hosted imgage url is required</span>} <br/>   <br/>                 
                    <input className="int btn btn-success" type="submit" /> <br/> <br/>
                </form>
            </div>
        </div>
    );
};

export default Manage;