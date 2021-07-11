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
    <form className="ship-form " onSubmit={handleSubmit(onSubmit)}>
     <h1>Shipment Information</h1>
      <br/> <br/>
      <span htmlFor="name">Your Name: </span> <br/>
      <input className="int" defaultValue={loggedInUser.name} {...register("name", { required: true })} /> <br/> 
      {errors.name && <span className="error">Name is required</span>}<br/> 
      
      <span htmlFor="email">Your Email: </span> <br/>
      <input className="int" defaultValue={loggedInUser.email} {...register("email", { required: true })} /> <br/> 
      {errors.email && <span className="error">Email is required</span>}<br/>
      
      <span htmlFor="address">Your Address: </span> <br/>
      <input className="int" {...register("address", { required: true })} /> <br/> 
      {errors.address && <span className="error">Address is required</span>}<br/>

      <span htmlFor="division">Your Division Name: </span> <br/>
      <input className="int" {...register("division", { required: true })} /> <br/> 
      {errors.division && <span className="error">Division is required</span>}<br/>

      <span htmlFor="ditrict">Your District Name: </span> <br/>
      <input className="int" {...register("district", { required: true })} /> <br/> 
      {errors.district && <span className="error">District is required</span>}<br/> 

      <span htmlFor="upzilla">Your Upzilla Name: </span> <br/>
      <input className="int" {...register("upzilla", { required: true })} /> <br/> 
      {errors.upzilla && <span className="error">Upzilla is required</span>}<br/> 

      <span htmlFor="village">Your Village Name: </span> <br/>
      <input className="int" {...register("village", { required: true })} /> <br/> 
      {errors.village && <span className="error">Village is required</span>}<br/> 

      <span htmlFor="phoneNumber">Your Phone Number: </span> <br/>
      <input className="int" {...register("phoneNumber", { required: true })} /> <br/> 
      {errors.phoneNumber && <span className="error">Phone Number is required</span>}<br/> <br/> 
      <input className="int btn btn-success" type="submit" /> <br/><br/>
    </form>
  );
};

export default Shipment;