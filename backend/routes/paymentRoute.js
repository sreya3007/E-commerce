const express = require("express");
const router = express.Router();
const wrapAsync = require("../middleware/errorHandling");
const {protect} = require("../middleware/authenticate");
const stripe = require("stripe")(process.env.STRIPE_API_KEY);

router.post('/api/payment/process' , protect, wrapAsync(async (req, res, next) => {
  const myPayment = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "inr",
    metadata: { 
      company: "Ecommerce",
    },
  });

  
  res.status(200).json({ success: true, client_secret: myPayment.client_secret });
}));

router.get( '/api/stripeapikey', protect ,wrapAsync(async (req, res, next) => {
  res.status(200).json({ stripeApiKey: process.env.STRIPE_API_KEY });
}));

module.exports = router;




