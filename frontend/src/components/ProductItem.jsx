
/*import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom';

const ProductItem = ({id,image,name,price}) => {


    const{currency} = useContext(ShopContext);
  return (
    <Link className='text-gray-700 cursor-pointer' to={`/product/${id}`}>
 <div className='overflow-hidden'>
<img className='hover:scale-110 transition ease-in-out' src={image[0]}  alt=""/>
 </div>
 <p className='pt-3 pb-1 text-sm'>{name}</p>
 <p className='text-sm font-medium'>{currency}{price}</p>
    </Link>
  )
}

export default ProductItem */



/* 2 import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';

const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext);

  return (
    <Link className="text-gray-700 cursor-pointer" to={`/product/${id}`}>
      <div className="overflow-hidden rounded-lg shadow-md">
        <img
          className="hover:scale-110 transition-transform ease-in-out duration-300 w-full h-auto object-cover"
          src={image?.[0] || 'path/to/fallback.jpg'}
          alt={name}
        />
      </div>
      <p className="pt-3 pb-1 text-sm font-medium">{name}</p>
      <p className="text-sm font-semibold">
        {currency}
        {price}
      </p>
    </Link>
  );
};

export default ProductItem; */



import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';

const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext);

  console.log("Image: ", image); // Debugging to check the image source

  return (
    <Link className="text-gray-700 cursor-pointer" to={`/product/${id}`}>
      <div className="overflow-hidden rounded-lg shadow-md">
        <img
          className="hover:scale-110 transition-transform ease-in-out duration-300 w-full h-auto object-cover"
          src={image?.[0] || 'path/to/fallback.jpg'} // Use fallback if image is not available
          alt={name || 'Product image'}
        />
      </div>
      <p className="pt-3 pb-1 text-sm font-medium">{name}</p>
      <p className="text-sm font-semibold">
        {currency}
        {price}
      </p>
    </Link>
  );
};

export default ProductItem;

