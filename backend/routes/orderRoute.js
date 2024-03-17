const wrapAsync = require('../middleware/errorHandling');
const Order = require('../models/order');
const Product = require('../models/products');
const express = require('express');
const router = express.Router();
const { protect, checkAdmin } = require('../middleware/authenticate');


//creating new orders

router.post('/api/orders', protect, wrapAsync(async (req, res) => {
  const { orderItems, shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice, } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('No order items');
  }
  else {
    // const itemsFromDB = await Product.find({
    //   _id: { $in: orderItems.map((x) => x._id) },
    // });

    const order = new Order({
      orderItems: orderItems.map((x) => ({
        ...x,
        product: x._id,
        _id: undefined
      })),
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
  }
}));


//getting all user orders
router.get('/api/orders/myorders', protect, wrapAsync(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
}));


//gettting the user orders by id
router.get('/api/orders/:id', protect, wrapAsync(async (req, res) => {
  const order = await Order.findById(req.params.id).populate('user', 'name email');

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
}));


//updating the payment status

router.put('/api/orders/:id/pay', protect, wrapAsync(async (req, res) => {
  const order = await Order.findById(req.params._id);
  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {

      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };
    const updatedOrder = await order.save();
    res.status(200).json(updatedOrder);
  }
}));


//integrating admin routes

router.get('/api/orders/:id/deliver', protect, checkAdmin, wrapAsync(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();
    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
}));


router.get('/api/orders', protect, checkAdmin, wrapAsync(async (req, res) => {
  const orders = await Order.find({}).populate('user', 'id name');
  res.json(orders);
}));


module.exports = router;