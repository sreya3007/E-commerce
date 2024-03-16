import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../constants";

const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL });
export const apiSlice = createApi({
    baseQuery,
    tagTypes: ['Products', 'Order', 'User'],
    endpoints: (builder) => ({})
})
//inject endpoints to create endpoints for various operation we'll inject them into main slice(ApiSlice)'s builder to update a state.