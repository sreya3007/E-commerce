import { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';
import { useGetProductsQuery } from '../slices/productSlices';
// import axios from 'axios';

// const HomeScreen = () => {
//     const [products, setProducts] = useState([]);

//     useEffect(() => {
//         const fetchProducts = async () => {
//             const { data } = await axios.get('/api/products');
//             setProducts(data);
//         };

//         fetchProducts();
//     }, []);
// we'll fetch data using productSlice now,This was proto for just checking the backend fetching 

const HomeScreen = () => {
    const { data: products, isLoading, error } = useGetProductsQuery();


    return (
        <>
            {isLoading ? (
                <h2>Loading....</h2>
            ) : error ? (<div>{error?.data?.message || error.error}</div>) : (<><h1>Latest Products</h1>
                <Row>
                    {products.map((product) => (
                        <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                            <div style={{ height: '100%' }}> {/* Apply fixed height */}
                                <Product product={product} />
                            </div>
                        </Col>
                    ))}
                </Row>
            </>)}

        </>
    );
};
export default HomeScreen;