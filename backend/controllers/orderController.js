import orderModel from "../models/orderModel.js";
// placeing orders using COD Method


const placeOrder = async (req,res) =>{
try{
const { userId, items, amount, address} = req.body;
const orderData = {
   userId,
   items,
   address,
   amount,
   paymentMethod : "COD",
   payment: false,
   date: Date.now()
}
const newOrder = new orderModel(orderData)
await newOrder.save()
await userModel.findByIdAndUpdte(userId,{cartData:{}})
res.json({success:true, message: "Order Placed"})

} catch(error){
    res.json({success:false,message:error.message})

}
}

// placeing orders using Strip Method


const placeOrderStrip = async (req,res) =>{
    
}

// placeing orders using Razorpay Method


const placeOrderRazorpay = async (req,res) =>{
    
}

//All orders data for Admin panel

const  allOrders = async (req,res) => {
try{
 const orders = await orderModel.find({})
 res.json({success:true,orders})
} catch(error){
console.log(error)
res.json({success:false,message:error.message})
}
}

//User Order Data For Frontend

const  userOrders = async (req,res) => {
try {
const {userId } = req.body
const orders = await orderModel.find({userId})
res.json({success:true,orders})
} catch (error) {
console.log(error)
res.json({success:false,message:error.message})

}
}

//update order status from Admin panel
const  updateStatus = async (req,res) => {
try{
const {orderId, status} = req.body
await orderModel.findByIdAndUpdate(orderId,{status})
res.json({success:true,message:'Status Updated'})
} catch(error){
    console.log(error)
    res.json({success:false,message:error.message})
}
}

export {placeOrder,placeOrderStrip,placeOrderRazorpay,allOrders, userOrders, updateStatus}