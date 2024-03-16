import { PRODUCTS_URL } from '../constants';
import { apiSlice } from './apiSlice';

export const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: ({ pageNumber }) => ({
                url: PRODUCTS_URL,
                params: { pageNumber },
            }),
            providesTags: ['Products'],
            keepUnusedDataFor: 5,

        }),
        getProductDetails: builder.query({
            query: (productId) => ({
                url: `${PRODUCTS_URL}/${productId}`,
            }),
            keepUnusedDataFor: 5,
        }),
        createProduct: builder.mutation({
            query: () => ({
                url: `${PRODUCTS_URL}`,
                method: 'POST',
            }),
            invalidatesTags: ['Product'],
        }),
        updateProduct: builder.mutation({
            query: (data) => ({
                url: `${PRODUCTS_URL}/${data.productId}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Products'],
        }),
        uploadProductImage: builder.mutation({
            query: (data) => ({
                url: `/api/upload`,
                method: 'POST',
                body: data,
            }),
        }),
        deleteProduct: builder.mutation({
            query: (productId) => ({
                url: `${PRODUCTS_URL}/${productId}`,
                method: 'DELETE',
            }),
            providesTags: ['Product'],
        }),

    }),
});

export const {
    useGetProductsQuery,
    useGetProductDetailsQuery,
    useCreateProductMutation,
    useUpdateProductMutation,
    useUploadProductImageMutation,
    useDeleteProductMutation,
} = productsApiSlice;
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
