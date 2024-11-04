
import React from 'react'
import { useState,useEffect } from 'react'
import axios from 'axios'
import {backendUrl}  from '../App'
import {toast} from 'react-toastify'
import { currency } from '../App'
import { assets } from '../assets/assets'


const Orders = ({token}) => {
  const [orders,setOrders] = useState([])
  const fetchAllOrderrs = useState([])
  const fetchAllOrders = async () => {

    if(!token){
  return null;
    }
    try{
  const response = await axios.post(backendUrl + '/api/order/list', {},{headers:{token}} )
 // console.log(response.data);
 if(response.data.success){
 setOrders(response.data.orders)
 } else{
  toast.error(response.data.message)
 }
    } catch(error){
 toast.error(error.message)
    }

  }
  const statusHandler = async (event, orderId) => {
    try{
const response = await axios.post(backendUrl + '/api/order/status',{orderId,status:event.target.value},{headers:{token}})
if(response.data.success){
await fetchAllOrderrs()
}
    } catch(error){
console.log(error);
toast.error(response.data.message)
    }
  }
  useEffect(()=>{
  fetchAllOrders();
},[token])

  return (
    <div>
      <h3>Order Page</h3>
      {
        orders.map((order,index) =>(
          <div className='grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[o.5fr_2fr_1fr_1fr] gap-3 items-start border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700' key={index}>
  <img className='w-12' src={assets.parcel_icon} alt="" />
  <div>
  <div>
    {order.item.map((item,index)=>{
      if (index === order.item.length - 1){
  return <p className='py-0.5' key={index}>{item.name} x {item.quantity}<span>{item.size}</span></p>
      }else{
        <p className='py-0.5' key={index}>{item.name} x {item.quantity}<span>{item.size}</span> ,</p>
      }
    })}
  </div>
  <p className='mt-3 mb-2 font-medium'>{order.address.firstName + " " + order.address.lastName }</p>
  <div>
    <p>{order.address.street + ","}</p>
    <p>{order.address.city + ", "+ order.address.city + "," + order.address.state + "," + order.address.zip-cod + ","+ order.address.country }</p>
  </div>
  <p>{order.address.phone}</p>
          </div>
   <diV>
    <p className='text-sm sm:text-[15px]'>items: {order.item.length}</p>
    <p className='mt-3'>Method : {order.paymentMethod}</p>
    <p>Payment : {}order.payment ? 'Done': 'Pending'</p>
    <p>Date : {new Date(order.date).toLocaleDateString()}</p>
   </diV>
<p className='text-sm sm:text-[15px]'>{currency}{}order.amount</p>
<select onChange={(event)=>statusHandler(event,order._id)} value={order.status} className='p-2 font-semibold'>
  
<option value="Order placed">Order Placed</option>
<option value="Packing">Packing</option>
<option value="Shipped">Shipped</option>
<option value="Out for delivery">Ou for delivey</option>
<option value="Delivered">Delivered</option>
</select>
          </div>
        ))
      }
    </div>
   
  )
  
}
export default Orders 



