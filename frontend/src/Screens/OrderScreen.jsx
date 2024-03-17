// import React, { useState } from 'react';
// import { Link, useParams } from 'react-router-dom';
// import { Row, Col, ListGroup, Image, Card, Button, Form } from 'react-bootstrap';
// import { useSelector, useDispatch } from 'react-redux';
// import { toast } from 'react-toastify';
// import Message from '../components/Message';
// import PayButton from "../components/PayButton";
// import Loader from '../components/Loader';
// import { loadStripe } from '@stripe/stripe-js';
// import {
//     useDeliverOrderMutation,
//     useGetOrderDetailsQuery,
//     usePayOrderMutation,
// } from '../slices/ordersApiSlice';
// import {
//     addToCart
// } from '../slices/cartSlice';

// const OrderScreen = () => {
//     const { id: orderId } = useParams();
//     const dispatch = useDispatch();

//     const {
//         data: order,
//         refetch,
//         isLoading,
//         error,
//     } = useGetOrderDetailsQuery(orderId);

//     console.log(order);
//     const orderItems = order && order.orderItems;




//     const [paymentMethod, setPaymentMethod] = useState('Stripe');

//     const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();
//     const [deliverOrder, { isLoading: loadingDeliver }] = useDeliverOrderMutation();

//     const { userInfo } = useSelector((state) => state.auth);

//     // const makePayment = async () => {
//     //     const stripe = await loadStripe("pk_test_51OtnyISAeRR9qbknSyk7cVUcCQ8TGDiIFiFvIDExt9iKmTOK2OcgKJKeTP0fFvGOoCrLvKxc3xFRrYfTOM7SWg7E003oPgXrWt");
//     //     const body = {
//     //         products: order,
//     //     }

//     //     const headers = {
//     //         "Content-Type": "application/json"
//     //     }
//     //     const response = await fetch("http://localhost:5000/api/create-checkout-session", {
//     //         method: "POST",
//     //         headers: headers,
//     //         body: JSON.stringify(body)
//     //     });
//     //     const session = await response.json();

//     //     const result = stripe.redirectToCheckout({
//     //         sessionId: session.id
//     //     });

//     //     if (result.error) {
//     //         console.log(result.error);
//     //     }
//     // }



//     // //chatgpt
//     //         try {
//     //             // Make an API call to your server to process the payment with Stripe
//     //             const res = await fetch("/api/payment/stripe", {
//     //                 method: "POST",
//     //                 headers: {
//     //                     "Content-Type": "application/json"
//     //                 },
//     //                 body: JSON.stringify({
//     //                     orderId,
//     //                     paymentMethod
//     //                 })
//     //             });

//     //             if (res.ok) {
//     //                 // Payment successful
//     //                 await payOrder(orderId);
//     //                 refetch();
//     //                 toast.success('Order is paid');
//     //             } else {
//     //                 // Payment failed
//     //                 toast.error('Payment failed. Please try again.');
//     //             }
//     //         } catch (err) {
//     //             // Error occurred while making the request
//     //             toast.error('Error processing payment. Please try again later.');
//     //         }
//     //     };




//     const deliverHandler = async () => {
//         await deliverOrder(orderId);
//         refetch();
//     };

//     return isLoading ? (
//         <Loader />
//     ) : error ? (
//         <Message variant='danger'>{error.data.message}</Message>
//     ) : (
//         <>
//             <h1>Order {order._id}</h1>
//             <Row>
//                 <Col md={8}>
//                     <ListGroup variant='flush'>
//                         <ListGroup.Item>
//                             <h2>Order Items</h2>
//                             {order.orderItems.length === 0 ? (
//                                 <Message>Order is empty</Message>
//                             ) : (
//                                 <ListGroup variant='flush'>
//                                     {order.orderItems.map((item, index) => (
//                                         <ListGroup.Item key={index}>
//                                             <Row>
//                                                 <Col md={1}>
//                                                     <Image
//                                                         src={item.image}
//                                                         alt={item.name}
//                                                         fluid
//                                                         rounded
//                                                     />
//                                                 </Col>
//                                                 <Col>
//                                                     <Link to={`/product/${item.product}`}>
//                                                         {item.name}
//                                                     </Link>
//                                                 </Col>
//                                                 <Col md={4}>
//                                                     {item.qty} x Rs.{item.price} = Rs.{item.qty * item.price}
//                                                 </Col>
//                                             </Row>
//                                         </ListGroup.Item>
//                                     ))}
//                                 </ListGroup>
//                             )}


//                             <h2>Order Items</h2>
//                             {order.orderItems.length === 0 ? (
//                                 <Message>Order is empty</Message>
//                             ) : (
//                                 <ListGroup variant='flush'>
//                                     {order.orderItems.map((item, index) => (
//                                         <ListGroup.Item key={index}>
//                                             <Row>
//                                                 <Col md={1}>
//                                                     <Image
//                                                         src={item.image}
//                                                         alt={item.name}
//                                                         fluid
//                                                         rounded
//                                                     />
//                                                 </Col>
//                                                 <Col>
//                                                     <Link to={`/product/${item.product}`}>
//                                                         {item.name}
//                                                     </Link>
//                                                 </Col>
//                                                 <Col md={4}>
//                                                     {item.qty} x Rs{item.price} = Rs.{item.qty * item.price}
//                                                 </Col>
//                                             </Row>
//                                         </ListGroup.Item>
//                                     ))}
//                                 </ListGroup>
//                             )}
//                         </ListGroup.Item>
//                     </ListGroup>
//                 </Col >
//                 <Col md={4}>
//                     <Card>
//                         <ListGroup variant='flush'>
//                             <ListGroup.Item>
//                                 <h2>Order Summary</h2>
//                                 <ListGroup variant='flush'>
//                                     <ListGroup.Item>
//                                         <Row>
//                                             <Col>Items</Col>
//                                             <Col>Rs.{order.itemsPrice}</Col>
//                                         </Row>
//                                     </ListGroup.Item>
//                                     <ListGroup.Item>
//                                         <Row>
//                                             <Col>Shipping</Col>
//                                             <Col>Rs.{order.shippingPrice}</Col>
//                                         </Row>
//                                     </ListGroup.Item>
//                                     <ListGroup.Item>
//                                         <Row>
//                                             <Col>Tax</Col>
//                                             <Col>Rs.{order.taxPrice}</Col>
//                                         </Row>
//                                     </ListGroup.Item>
//                                     <ListGroup.Item>
//                                         <Row>
//                                             <Col>Total</Col>
//                                             <Col>Rs.{order.totalPrice}</Col>
//                                         </Row>
//                                     </ListGroup.Item>
//                                 </ListGroup>
//                             </ListGroup.Item>
//                             {!order.isPaid && (
//                                 <ListGroup.Item>
//                                     <Form.Group>
//                                         <Form.Label as='legend'>Select Payment Method</Form.Label>
//                                         <Col>
//                                             <Form.Check
//                                                 type='radio'
//                                                 label='Stripe'
//                                                 id='Stripe'
//                                                 name='paymentMethod'
//                                                 value='Stripe'
//                                                 checked
//                                                 onChange={(e) => setPaymentMethod(e.target.value)}
//                                             ></Form.Check>
//                                         </Col>
//                                     </Form.Group>
//                                     <PayButton cartItems={order.orderItems} />
//                                 </ListGroup.Item>
//                             )}
//                             {loadingPay && <Loader />}
//                             {loadingDeliver && <Loader />}
//                             {userInfo &&
//                                 userInfo.isAdmin &&
//                                 order.isPaid &&
//                                 !order.isDelivered && (
//                                     <ListGroup.Item>
//                                         <Button
//                                             type='button'
//                                             className='btn btn-block'
//                                             onClick={deliverHandler}
//                                         >
//                                             Mark As Delivered
//                                         </Button>
//                                     </ListGroup.Item>
//                                 )}
//                         </ListGroup>
//                     </Card>
//                 </Col>
//             </Row >
//         </>
//     );
// };

// export default OrderScreen;


import { Link, useParams } from 'react-router-dom';
import { Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { useGetOrderDetailsQuery } from '../slices/ordersApiSlice';
import PayButton from '../components/PayButton';

const OrderScreen = () => {
    const { id: orderId } = useParams();



    const { data: order, isLoading, error } = useGetOrderDetailsQuery(orderId);
    // console.log(order);
    const orderArray = []; // Initialize an empty array

    if (order) {
        orderArray.push(order); // Push the order object into the array
    }
    // console.log(orderArray);
    return isLoading ? (
        <Loader />
    ) : error ? (
        <Message variant='danger'>{error}</Message>
    ) : (
        <>
            <h1>Order {order._id}</h1>
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p>
                                <strong>Name: </strong> {order.user.name}
                            </p>
                            <p>
                                <strong>Email: </strong>{' '}
                                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                            </p>
                            <p>
                                <strong>Address:</strong>
                                {order.shippingAddress.address}, {order.shippingAddress.city}{' '}
                                {order.shippingAddress.postalCode},{' '}
                                {order.shippingAddress.country}
                            </p>
                            {order.isDelivered ? (
                                <Message variant='success'>
                                    Delivered on {order.deliveredAt}
                                </Message>
                            ) : (
                                <Message variant='danger'>Not Delivered</Message>
                            )}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <p>
                                <strong>Method: </strong>
                                {order.paymentMethod}
                            </p>
                            {order.isPaid ? (
                                <Message variant='success'>Paid on {order.paidAt}</Message>
                            ) : (
                                <Message variant='danger'>Not Paid</Message>
                            )}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {order.orderItems.length === 0 ? (
                                <Message>Order is empty</Message>
                            ) : (
                                <ListGroup variant='flush'>
                                    {order.orderItems.map((item, index) => (
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={1}>
                                                    <Image
                                                        src={item.image}
                                                        alt={item.name}
                                                        fluid
                                                        rounded
                                                    />
                                                </Col>
                                                <Col>
                                                    <Link to={`/product/${item.product}`}>
                                                        {item.name}
                                                    </Link>
                                                </Col>
                                                <Col md={4}>
                                                    {item.qty} x ${item.price} = ${item.qty * item.price}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Items</Col>
                                    <Col>${order.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping</Col>
                                    <Col>${order.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax</Col>
                                    <Col>${order.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total</Col>
                                    <Col>${order.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <PayButton orderItem={order.orderItems} />
                            {/* PAY ORDER PLACEHOLDER */}
                            {/* {MARK AS DELIVERED PLACEHOLDER} */}
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default OrderScreen;