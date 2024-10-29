
//import {v2 as cloudinary} from "cloudinary"
//import productModel from "../models/productModel.js"
//function for add product
/*const addProduct = async (req,res) =>{
 try{ 
 const{name,description,price, category, subCategory, sizes, bestseller} = req.body
 const image1 = req.files.image1[0]
 const image2 = req.files.image2[0]
 const image3 = req.files.image3[0]
 const image4 = req.files.image4[0]

 console.log(name,description,price, category, subCategory, sizes, bestseller)
 console.log(image1,image2,image3,image4)

const images = [image1,image2,image3,image4].filter((item)=> item!== undefined)

let imagesUrl = await promise.all(
images.map(async(item)=>{
let result = await cloudinary.uploader.upload(item.path,{resource_type:'image'})
return result.secure_url
})
)
 const productData = {
   name,
   description,
   category,
   price: Number(price),
   subCategory,
   bestseller: bestseller === 'true' ? true : false,
   sizes: JSON.parse(sizes),
   images: imagesUrl,
   date:Date.now()
 }
console.log(productData);
const product = new productModel(productData);
await product.save()
 res.json({success:true, message: "product Added"})
 } catch(error){
    console.log(error)
 res.json({success:false, message:error.message})
 }
}

//function for list product
const listProducts = async (req,res) =>{
  try{
 const products = await productModel.find({});
 res.json({success:true,products})
 res.json({})
  }  catch(error){
   console.log(error)
   res.json({success:false, message:error.message})
  }
}

//function for removing product
const removeProduct = async (req,res) =>{
   try{
    await productModel.ffindByIdAndDelete(req.body.id)
    res.json({success:true,message:"Product Removed"})
   } catch(error){
    console.log(error)
   res.json({success:false, message:error.message})

   }

}
//function for single product
const singleProduct = async (req,res) =>{
    try{
  const { productId }  = req.body
  const product = await productModel.findById(productId)
  res.json({success:true,product})
    }catch(error){
      console.log(error)
      res.json({success:false, message:error.message})
    }
}
export {listProducts,addProduct,removeProduct,singleProduct}*/










 //cha
import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";
const addProduct = async (req, res) => {
  try {
    const { name, description, price, category, subCategory, sizes, bestseller } = req.body;
    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    
    // Filter undefined images
    const images = [image1, image2, image3, image4].filter((item) => item !== undefined);
    
    
   
    // Upload images to Cloudinary
    let imagesUrl = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, { resource_type: "image" });
       return result.secure_url;
      })
    )

   // console.log(name, description, price, category, subCategory, sizes, bestseller);
   
   
    // Create product data
    const productData = {
      name,
      description,
      category,
      price: Number(price),
      subCategory,
      bestseller: bestseller === "true" ? true : false,
      sizes: (() => {
        try {
          return sizes ? JSON.parse(sizes) : []; // Use an empty array or default value if sizes is undefined
        } catch (error) {
          console.error("Error parsing sizes:", error.message);
          return []; // Default to an empty array if parsing fails
        }
      })(),
      //sizes: JSON.parse(sizes),
      image: imagesUrl,
      date: Date.now(),
    };
console.log(productData);
    const product = new productModel(productData);
    await product.save();

    res.json({ success: true, message: "Product Added" });
    res.json({success:true,message:"product added"})
  } catch (error) {
    console.log(error);
    res.json({success:false,message:error.message})
   /* if (!res.headersSent) {  // Ensures headers are sent only once
      res.status(500).json({ success: false, message: error.message });
    }*/
  }
};



//cha
// function for listing products
const listProducts = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.json({ success: true, products });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// function for removing a product
const removeProduct = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Product Removed" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// function for fetching a single product
const singleProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    const product = await productModel.findById(productId);
    res.json({ success: true, product });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Exporting the functions
export { listProducts, addProduct, removeProduct, singleProduct };

  