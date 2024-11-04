
/*import React, {useState, useEffect } from 'react'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'
import axios from 'axios'
const List = () => {

  const [list,setList] = useState([])

  const fetchList = async () => {
  try{
 const response = await axios.get(backendUrl + '/api/product/list')
 if(response.data.success){
  setList(response.data.products);
 }
 else {
  toast.error(response.data.message)

 }
  } catch (error){
console.log(error)
toast.error(error.message)
  }
  }

  useEffect(()=>{
    fetchList()

  },[])
  return (
   <>
   <p className='mb-2'>All Products List</p>
   <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2'>

    {/* ---------- List Table List -------- */  
   /* <div>
      <b>Image</b>
      <b>Name</b>
      <b>Category</b>
      <b>Price</b>
      <b className='text-center'>Action</b>
    </div>

    {/* --------------Product List---------------- */
   /* {
      list.map((item,index)=>(
  <div className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm' key={index}>
<img className='w-12' src={item.image[0]} alt=""/>
<p>{item.name}</p>
<p>{item.category}</p>
<p>{currency}{item.price}</p>
<p className='text-right md:text-ccenter cursor-pointer text-lg'>X</p>
  </div>
      ))
    }
   </div>
   
   </>
  )
}

export default List */






import React, { useState, useEffect, useCallback } from 'react';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';
import axios from 'axios';

const currency = '$'; // Moved outside component for consistency

const List = ({ token }) => {
  const [list, setList] = useState([]);

  const fetchList = useCallback(async () => {
    try {
      const response = await axios.get(backendUrl + '/api/product/list');
      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to fetch products.');
    }
  }, []);

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(
        backendUrl + '/api/product/remove',
        { id },
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
       // setList((prevList) => prevList.filter((item) => item._id !== id)); // Update the list locally // Re-fetch product list
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to remove product.');
    }
  };

  useEffect(() => {
    fetchList();
  }, [fetchList]);

  return (
    <>
      <p className='mb-2'>All Products List</p>
      <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2'>
        {/* ---------- List Table Headers -------- */}
        <b>Image</b>
        <b>Name</b>
        <b>Category</b>
        <b>Price</b>
        <b className='text-center'>Action</b>
      </div>

      {/* --------------Product List---------------- */}
      {list.map((item, index) => (
        <div
          className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm'
          key={item._id || index} // Use item._id if available
        >
          <img
  className='w-12'
  src={Array.isArray(item.image) && item.image.length ? item.image[0] : 'placeholder.jpg'}
  alt={item.name || 'Product Image'}
/>

          <p>{item.name}</p>
          <p>{item.category}</p>
          <p>{currency}{item.price}</p>
          <p
            onClick={() => removeProduct(item._id)}
            className='text-right md:text-center cursor-pointer text-lg'
            aria-label={`Remove ${item.name}`}
          >
            X
          </p>
        </div>
      ))}
    </>
  );
};

export default List;
