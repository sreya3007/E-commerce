const path=require('path');
const express= require('express');
const dotenv= require('dotenv');
dotenv.config();
const connectDB = require('./config/database');
const cors = require('cors');

//import express from 'express';
//const product=require('./models/products');
const ProductRoutes = require('./routes/productRoute');
const UserRoutes = require('./routes/userRoute');
const OrderRoutes = require('./routes/orderRoute');
const PaymentRoutes = require('./routes/paymentRoute');
const uploadRoutes = require('./routes/uploadRoute');
const cookieParser = require('cookie-parser');
const { notFound, errorHandler } = require('./middleware/errorType');
const port = process.env.PORT; // just in case our actual port is down we can use a default 8080
connectDB();
const app = express();

app.use(express.json());// puts data in req.body
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // will allow us to access req.cookie ( our cookie here is jwt)
app.use(cors());

app.get('/', (req, res) => {
    res.send("server testing");
});

app.use(ProductRoutes); // froms  the baseURL for all the routes in ProductRoutes file
app.use(UserRoutes);
app.use(OrderRoutes);
app.use(PaymentRoutes);
app.use(uploadRoutes);

app.get('/api/hello', (req, res) => {
    res.send("hello testing 123");
       });

const __dirname=path.resolve(); // setting dirname as the current dirname
app.use('/uploads',express.static(path.join(__dirname, '/uploads')));
      
app.use(notFound);

app.use(errorHandler);

app.listen(port,()=>{
    console.log(`Server is running on ${port}`);
});
