// const express = require("express");
// const Stripe = require("stripe");
// const  Order  = require("../models/order");
// const Product=require('../models/products');
// require("dotenv").config();

// const stripe = Stripe(process.env.STRIPE_API_KEY);

// const router = express.Router();


// router.post('/api/create-checkout-session',async(req,res)=>{
//   const product =req.body;
//   res.send(product
// });

// module.exports=router;



const express = require('express');
const router = express.Router();

const dotenv = require('dotenv'); 
dotenv.config();
const stripe = require('stripe')(process.env.STRIPE_API_SECRET);

router.post('api/stripe/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: 'inr',
          product_data: {
            name: 'Apple-Headphones',
          },
          unit_amount: 2000,
        },
        quantity: 2,
      },
    ],
    mode: 'payment',
   success_url: `${process.env.CLIENT_URL}/api/checkout-success`,
   cancel_url: `${process.env.CLIENT_URL}/api/cart`,
  });

  res.send({url:session.url});
});


// router.post('/api/stripe/create-checkout-session', async (req, res) => {
//     const line_items = req.body.order.orderItems.map((item) => {
//       return {
//         price_data: {
//           currency: "inr",
//           product_data: {
//             name: item.name,
//             images: [item.image],
//             description: item.description,
//             metadata: {
//               id: item._id,
//             },
//           },
//           unit_amount: item.price * 100,
//         },
//         quantity: item.qty,
//       };
//     });

//     const session = await stripe.checkout.sessions.create({
//       line_items,
//     mode: 'payment',
//     success_url: `${process.env.CLIENT_URL}/api/checkout-success`,
//     cancel_url: `${process.env.CLIENT_URL}/api/cart`,
//   });

//   res.send({url:session.url});
// });


module.exports=router;
