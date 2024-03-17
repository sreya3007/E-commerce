import { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';
import axios from 'axios';
// import { useGetProductsQuery } from '../slices/productSlice';

// const HomeScreen = () => {
//     const { data: products, isLoading, error } = useGetProductsQuery();
//     return (
//         <>
//             {isLoading ? (
//                 <div>Loading...</div>
//             ) : error && error.message ? (
//                 <div>{error.message}</div> // Accessing error message only if error and error.message are defined
//             ) : (
//                 <>
//                     <h1>Latest Products</h1>
//                     <Row>
//                         {products.map((product) => (
//                             <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
//                                 <Product product={product} />
//                             </Col>
//                         ))}
//                     </Row>
//                 </>
//             )}
//         </>
//     );
// };
// export default HomeScreen;



const HomeScreen = () => {
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
                        <Product product={product} />
                    </Col>
                ))}
            </Row>
        </>
    );
};
export default HomeScreen;