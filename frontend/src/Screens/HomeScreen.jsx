import { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useGetProductsQuery } from '../slices/productsApiSlice';
import Product from '../components/Product';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Paginate from '../components/Paginate';
const HomeScreen = () => {
    const { pageNumber } = useParams();

  console.log(pageNumber);

  const { data, isLoading, error } = useGetProductsQuery({
    pageNumber,
  });
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
            <Paginate pages={data.pages} page={data.page} />
        </>
    );
};
export default HomeScreen;


// const HomeScreen = () => {
//     const { pageNumber } = useParams();
  
//     console.log(pageNumber);
  
//     const { data, isLoading, error } = useGetProductsQuery({
//       pageNumber,
//     });
  
//     return (
//       <>
//         {isLoading ? (
//           <Loader />
//         ) : error ? (
//           <Message variant='danger'>
//             {error?.data?.message || error.error}
//           </Message>
//         ) : (
//           <>
//             <h1>Latest Products</h1>
//             <Row>
//               {data.products.map((product) => (
//                 <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
//                   <Product product={product} />
//                 </Col>
//               ))}
//             </Row>
//             <Paginate pages={data.pages} page={data.page} />
//           </>
//         )}
//       </>
//     );
//   };