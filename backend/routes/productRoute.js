const express= require('express');
const router=express.Router();
//const mongoose=require('mongoose');
const Product =require('../models/products'); // later we will use the data in mongoDb this just for test
const wrapAsync =require('../middleware/errorHandling'); // our custom error handler
const {protect,checkAdmin}=require('../middleware/authenticate');
// const dotenv =require ('dotenv');
// const connectDB =require('../config/database.js');

// dotenv.config();

// connectDB();

// getting all products from database
router.get('/api/products', wrapAsync(async (req,res)=>{
    const products =  await Product.find({});// passing empty object to get all product
    //res.send("hello");
    res.json(products);
}));

router.get('/api/products/work',(req,res)=>{
    res.send("work please");
})


// getting a single product along with its details
router.get('/api/products/:id', wrapAsync(async(req,res)=>{
    const product= await Product.findById(req.params.id);
    if(product){
return res.json(product);
    }
        res.status(404).json({message:"Product not available"});
      
}));

// creating a new product 
router.post( '/api/products',protect,checkAdmin,wrapAsync(async (req, res) => {
    const product = new Product({
      name: 'default name',
      price: 0,
      user: req.user._id,
      image: '/images/sample.jpg',
      brand: 'default brand',
      category: 'default category',
      countInStock: 0,
      numReviews: 0,
      description: 'default description',
    });
  
    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  }));
  
 //updating the features of the product 
  router.put( '/api/products/:id',protect,checkAdmin,wrapAsync(async (req, res) => {
    const { name, price, description, image, brand, category, countInStock } =
      req.body;
  
    const product = await Product.findById(req.params.id); // finding by id to update the product
  
    if (product) {
      product.name = name;
      product.price = price;
      product.description = description;
      product.image = image;
      product.brand = brand;
      product.category = category;
      product.countInStock = countInStock;
  
      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404);
      throw new Error('Product not found');
    }
  }));
  

  //deleting a product
//   router.delete( '/api/products/:id', protect , checkAdmin , wrapAsync(async (req, res) => {
//     const  product=await Product.findById(req.params.id); // finding the product by id 
  
//     if (product) {
//       await Product.deleteOne({ _id: product._id });
//       res.json({ message: 'Product removed' });
//     } else {
//       res.status(404);
//       throw new Error('Product not found');
//     }
//   }));
  

  router.delete('/api/products/:id', protect, checkAdmin, wrapAsync(async (req, res) => {
    const product = await Product.findByIdAndDelete(req.params.id);
  
    if (product) {
      res.json({ message: 'Product removed' });
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  }));

//   router.delete( '/api/products/:id',protect, checkAdmin, async (req, res) => {
//     try {
//       await Product.findByIdAndDelete(req.params.id);
//       res.status(200).json({
       
//         message: 'Product removed',
//       });
//     } catch (error) {
      
//       res.status(404).json({
//         message: "Product not found",
//         error,
        
//       });
//     }
//   });


module.exports=router;