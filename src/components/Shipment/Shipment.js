import React, { useContext } from 'react';
import './Shipment.css'
import { useForm } from 'react-hook-form';
import { userContext } from '../../App';
import { getDatabaseCart, processOrder} from '../../utilities/databaseManager';



const Shipment = () => {
  const [loggedInUser, setLoggedInUser] = useContext(userContext)
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => {
    const savedProduct = getDatabaseCart();
    const orderDetails = {...loggedInUser, product: savedProduct, shipment: data, orderDate: new Date()}
    console.log(orderDetails);
    fetch('https://floating-river-16759.herokuapp.com/addOrder',{
      method: "POST",
      body: JSON.stringify(orderDetails),
      headers:{
        "Content-type": 'application/json'
      }
    })
    .then(res => res.json())
    .then(data => {
       if(data){
        processOrder();
        alert("Your order is successfully placed")
        console.log('Succesfully order Placed', data)
       }

     })
  };


  return (
    <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
     <h1>Shipment Information</h1>
      <br/> <br/>
      <label htmlFor="name">Your Name: </label> <br/>
      <input defaultValue={loggedInUser.name} {...register("name", { required: true })} /> <br/> 
      {errors.name && <span className="error">Name is required</span>}<br/> 
      
      <label htmlFor="email">Your Email: </label> <br/>
      <input defaultValue={loggedInUser.email} {...register("email", { required: true })} /> <br/> 
      {errors.email && <span className="error">Email is required</span>}<br/>
      
      <label htmlFor="address">Your Address: </label> <br/>
      <input {...register("address", { required: true })} /> <br/> 
      {errors.address && <span className="error">Address is required</span>}<br/>

      <label htmlFor="division">Your Division Name: </label> <br/>
      <input {...register("division", { required: true })} /> <br/> 
      {errors.division && <span className="error">Division is required</span>}<br/>

      <label htmlFor="ditrict">Your District Name: </label> <br/>
      <input {...register("district", { required: true })} /> <br/> 
      {errors.district && <span className="error">District is required</span>}<br/> 

      <label htmlFor="upzilla">Your Upzilla Name: </label> <br/>
      <input {...register("upzilla", { required: true })} /> <br/> 
      {errors.upzilla && <span className="error">Upzilla is required</span>}<br/> 

      <label htmlFor="village">Your Village Name: </label> <br/>
      <input {...register("village", { required: true })} /> <br/> 
      {errors.village && <span className="error">Village is required</span>}<br/> 

      <label htmlFor="phoneNumber">Your Phone Number: </label> <br/>
      <input {...register("phoneNumber", { required: true })} /> <br/> 
      {errors.phoneNumber && <span className="error">Phone Number is required</span>}<br/> <br/> 
      <input type="submit" />
    </form>
  );
};

export default Shipment;