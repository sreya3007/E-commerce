import { Card } from 'react-bootstrap';
import '../assets/Styles/components.css';
import { Link } from 'react-router-dom';
import { Router } from 'react-router-dom';
import Rating from './Rating';
const Product = ({ product }) => {
    return (

        <Card className='my-3 p-3 rounded'>
            {/* <a href={`/product/${product._id}`}> we replaced href to link to after importing link so that it redirects to a link rather thank loading it like a page jo ki href me hota hai*/}
            <Link to={`/product/${product._id}`}>
                <Card.Img src={product.image} variant='top' />
            </Link>
            <div className='CardBody'>

                <Card.Body>
                    <Link to={`/product/${product._id}`}>
                        <Card.Title as='div' className='product-title'>
                            <strong>{product.name}</strong>
                        </Card.Title>
                    </Link>
                    <Card.Text as='div'>
                        <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                    </Card.Text>
                    <Card.Text as='h3'>Rs.{product.price}</Card.Text>
                </Card.Body>
            </div>
        </Card>

    );
};

export default Product;