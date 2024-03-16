const express=require('express');
const router=express.Router();
router.get('/api/config/paypal', (req, res) =>
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
);

module.exports=router;