import { PRODUCTS_URL } from '../constants';
import { apiSlice } from './apiSlices';

export const productSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => ({
                url: PRODUCTS_URL,
            }),
            keepUnusedDataFor: 5,// will keep the data in cache for 5 seconds after the endpoint is hit
        }),
        getProductDetails: builder.query({
            query: (productId) => ({
                url: `${PRODUCTS_URL}/${productId}`,
            }),
            keepUnusedDataFor: 5,
        }),
    }),
});

export const { useGetProductsQuery, useGetProductDetailsQuery } = productSlice;
//use-Something-query to fetch data and use-something-mutation to change builder ki peoperty hai









// // Custom hook to fetch products
// export const useGetProductsQuery = () => {
//     const [products, setProducts] = useState([]);
//     const [isLoading, setIsLoading] = useState(false);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchData = async () => {
//             setIsLoading(true);
//             try {
//                 const response = await fetch(PRODUCTS_URL);
//                 if (!response.ok) {
//                     throw new Error('Failed to fetch products');
//                 }
//                 const data = await response.json();
//                 setProducts(data);
//             } catch (error) {
//                 setError(error.message);
//             } finally {
//                 setIsLoading(false);
//             }
//         };

//         fetchData();

//         // Cleanup function
//         return () => {
//             // Cancel any ongoing requests or clean up if needed
//         };
//     }, []);

//     return { products, isLoading, error };
// };

//    // Custom hook to fetch product details by ID
// export const useGetProductDetailsQuery = (productId) => {
//   const [productDetails, setProductDetails] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchProductDetails = async () => {
//       setIsLoading(true);
//       try {
//         const response = await fetch(`${PRODUCTS_URL}/${productId}`);
//         if (!response.ok) {
//       throw new Error('Failed to fetch product details');
//     }
//     const data = await response.json();
//     setProductDetails(data);
//   } catch (error) {
//     setError(error.message);
//   } finally {
// setIsLoading(false);
//       }
//     };

//     fetchProductDetails();

//     // Cleanup function
//     return () => {
//       // Cancel any ongoing requests or clean up if needed
//     };
//   }, [productId]);

//   return { productDetails, isLoading, error };
// };
