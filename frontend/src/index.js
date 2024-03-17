import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

// import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/Styles/bootstrap.custom.css';
import './assets/Styles/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import HomeScreen from './Screens/HomeScreen';

import ProductScreen from './Screens/ProductScreen';
import AdminRoute from './components/AdminRoute';
// import { PayPalScriptProvider } from '@paypal/react-paypal-js'
import { Provider } from 'react-redux';
import store from './store';
import CartScreen from './Screens/CartScreen';
import LoginScreen from './Screens/LoginScreen';
import RegisterScreen from './Screens/RegisterScreen';
import ShippingScreen from './Screens/ShippingScreen';
import PaymentScreen from './Screens/PaymentScreen';
import PrivateRoute from './components/PrivateRoute';
import PlaceOrderScreen from './Screens/PlaceOrderScreen';
import OrderListScreen from './Screens/admin/OrderListScreen';
import ProductListScreen from './Screens/admin/ProductListScreen';
import ProductEditScreen from './Screens/admin/ProductEditScreen';
import OrderScreen from './Screens/OrderScreen';
import ProfileScreen from './Screens/ProfileScreen';
// const stripePromise=loadStripe (//strpe public key);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<HomeScreen />} />{/*index={true} so that it doesnot show multiple screen */}
      <Route path='/product/:id' element={<ProductScreen />} />
      <Route path='/page/:pageNumber' element={<HomeScreen />} />
      <Route path='/search/:keyword' element={<HomeScreen />} />
      <Route path='/product/:id' element={<ProductScreen />} />
      <Route path='/cart' element={<CartScreen />} />
      <Route path='/login' element={<LoginScreen />} />
      <Route path='/register' element={<RegisterScreen />} />

      <Route path='' element={<PrivateRoute />}>
        <Route path='/shipping' element={<ShippingScreen />} />
        <Route path='/payment' element={<PaymentScreen />} />
        <Route path='/placeorder' element={<PlaceOrderScreen />} />

        <Route path='/order/:id' element={<OrderScreen />} />
        <Route path='profile' element={<ProfileScreen />} />
        {/* Admin users */}
        <Route path='' element={<AdminRoute />}>
          <Route path='/admin/orderlist' element={<OrderListScreen />} />
          <Route path='/admin/productlist' element={<ProductListScreen />} />
          <Route path='/search/:keyword' element={<HomeScreen />} />
          <Route
            path='/admin/productlist/:pageNumber'
            element={<ProductListScreen />}
          />
          <Route path='/admin/product/:id/edit' element={<ProductEditScreen />} />
          <Route
            path='/search/:keyword/page/:pageNumber'
            element={<HomeScreen />}
          />
        </Route>

      </Route>
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <Elements stripe={stripePromise}> */}
      {/* <PayPalScriptProvider deferLoading={true}> */}
      <RouterProvider router={router} />
      {/* </PayPalScriptProvider> */}
      {/* </Elements> */}
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
