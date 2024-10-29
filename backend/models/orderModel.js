
/*import mongoose from 'mongoose'
const orderSchema = new mongoose.Schema({
   userId: {type: String, required: true} ,
   items: {type: Array, required: true},
   amount: {type: Number, required: true},
   address: {type: object, required: true},
   status: {type: String, required: true,default:'Order Placed'},
   paymentMethod: {type: String, required: true},
   payment: {type: Boolean, required: true, default: false},
   date: {type: Number, required:true}
})
const orderModel = mongoose.models.order || mongoose.model('order',orderSchema)
export default orderModel;*/


import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  items: [{
    productId: { type: String, required: true },
    quantity: { type: Number, required: true },
  }],
  amount: { type: Number, required: true },
  address: { type: Object, required: true }, // Alternatively, you can further structure the address
  status: { type: String, enum: ['Order Placed', 'Shipped', 'Delivered', 'Cancelled'], default: 'Order Placed' },
  paymentMethod: { type: String, required: true },
  payment: { type: Boolean, required: true, default: false },
  date: { type: Date, required: true, default: Date.now } // Use Date instead of Number
});

const orderModel = mongoose.models.order || mongoose.model('order', orderSchema);
export default orderModel;
