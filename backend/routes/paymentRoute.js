const express = require("express");
const Stripe = require("stripe");
const Order = require("../models/order");

require("dotenv").config();

const stripe = Stripe(process.env.STRIPE_API_SECRET);

const router = express.Router();

router.post('/api/stripe/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: 'USD',
          product_data: {
            name: 'i-Phone',
          },
          unit_amount: 20000,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: 'http://localhost:3000/checkout-success',
    cancel_url: 'http://localhost:3000/cart',
  });

  res.send({ url: session.url });
});
module.exports = router;


// router.post("/create-checkout-session", async (req, res) => {
//   const customer = await stripe.customers.create({
//     metadata: {
//       userId: req.body.userId,
//       cart: JSON.stringify(req.body.orderItems),
//     },
//   });

//   const line_items = req.body.order.map((item) => {
//     return {
//       price_data: {
//         currency: "inr",
//         product_data: {
//           name: item.name,
//           images: [item.image],
//           description: item.desc,
//           metadata: {
//             id: item.id,
//           },
//         },
//         unit_amount: item.price * 100,
//       },
//       quantity: item.cartQuantity,
//     };
//   });

//   const session = await stripe.checkout.sessions.create({
//     payment_method_types: ["card"],
//     shipping_address_collection: {
//       allowed_countries: ["US", "IN"],
//     },
//     shipping_options: [
//       {
//         shipping_rate_data: {
//           type: "fixed_amount",
//           fixed_amount: {
//             amount: 0,
//             currency: "inr",
//           },
//           display_name: "Free shipping",

//           delivery_estimate: {
//             minimum: {
//               unit: "business_day",
//               value: 5,
//             },
//             maximum: {
//               unit: "business_day",
//               value: 7,
//             },
//           },
//         },
//       },
//       {
//         shipping_rate_data: {
//           type: "fixed_amount",
//           fixed_amount: {
//             amount: 1500,
//             currency: "inr",
//           },
//           display_name: "Next day air",
//           // Delivers in exactly 1 business day
//           delivery_estimate: {
//             minimum: {
//               unit: "business_day",
//               value: 1,
//             },
//             maximum: {
//               unit: "business_day",
//               value: 1,
//             },
//           },
//         },
//       },
//     ],

//     line_items,
//     mode: "payment",
//     customer: customer.id,
//     success_url: `${process.env.CLIENT_URL}/checkout-success`,
//     cancel_url: `${process.env.CLIENT_URL}/`,
//   });

//   // res.redirect(303, session.url);
//   res.send({ url: session.url });
// });


