import { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';
import axios from 'axios';
import { useParams } from 'react-router-dom';
const HomeScreen = () => {
    const { keyword } = useParams();
    const [products, setProducts] = useState([]);
    useEffect(() => {
        const fetchProducts = async () => {
            const { data } = await axios.get('/api/products');
            setProducts(data);
        };
        fetchProducts();
    }, []);
    return (
        <>
            <h1>Latest Products</h1>
            <Row>
                {products.map((product) => (
                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                        <div style={{ height: '100%' }}> {/* Apply fixed height */}
                            <Product product={product} />
                        </div>
                    </Col>
                ))}
            </Row>

        </>
    );
};
export default HomeScreen;