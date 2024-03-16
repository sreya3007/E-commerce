import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Form, Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap';
import Rating from '../components/Rating';
import axios from 'axios';
import { addToCart } from '../slices/cartSlice';
import { useGetProductDetailsQuery } from '../slices/productSlices';

const ProductScreen = () => {
    const { id: productId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { data: product, isLoading, error } = useGetProductDetailsQuery(
        productId
    )


    // useEffect(() => {
    //     const fetchProduct = async () => {
    //         const { data } = await axios.get(`/api/products/${productId}`);
    //         setProduct(data);
    //     };

    //     fetchProduct(); 
    // }, [productId]);
    const [qty, setQty] = useState(1);
    const addToCartHandller = () => {
        dispatch(addToCart({ ...product, qty }))
        navigate('/cart')
    }


    return (
        <>
            <Link to='/' className='btn btn-light my-3'>
                Go Back
            </Link>
            {isLoading ? (<h2>Loading..</h2>) : error ? (<div>{error?.data.message || error.error}</div>) : (<Row>
                <Col md={5}>
                    <Image src={product.image} alt={product.name} fluid />
                </Col>
                <Col md={4}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h3>{product.name}</h3>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Rating
                                value={product.rating}
                                text={`${product.numReviews} reviews`}
                            />
                        </ListGroup.Item>
                        <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
                        <ListGroup.Item>Description: {product.description}</ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={3}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Price:</Col>
                                    <Col>
                                        <strong>Rs.{product.price}</strong>
                                    </Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Status:</Col>
                                    <Col>
                                        {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                                    </Col>
                                </Row>
                            </ListGroup.Item>

                            {/* Qty Select */}
                            {product.countInStock > 0 && (
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Qty</Col>
                                        <Col>
                                            <Form.Control
                                                as='select'
                                                value={qty}
                                                onChange={(e) => setQty(Number(e.target.value))}
                                            >
                                                {[...Array(product.countInStock).keys()].map(
                                                    (x) => (
                                                        <option key={x + 1} value={x + 1}>
                                                            {x + 1}
                                                        </option>
                                                    )
                                                )}
                                            </Form.Control>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            )}

                            <ListGroup.Item>
                                <div className="d-flex justify-content-center">
                                    <Button
                                        className='btn-block m-1'
                                        type='button'
                                        disabled={product.countInStock === 0}
                                        onClick={addToCartHandller}
                                    >Add to Cart</Button>
                                </div>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>)}

        </>
    );
};
export default ProductScreen;