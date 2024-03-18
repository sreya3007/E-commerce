import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../constants';

import { logout } from './authSlice'; // Import the logout action

const baseQuery = fetchBaseQuery({
    baseUrl: BASE_URL,
});

async function baseQueryWithAuth(args, api, extra) {
    const result = await baseQuery(args, api, extra);
    // Dispatch the logout action on 401.
    if (result.error && result.error.status === 401) {
        api.dispatch(logout());
    }
    return result;
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithAuth, // builder has methods like query so we can create a query to return some object from an URL(endpoint we wanna hit) so here we neither need fetch nor axios 
    tagTypes: ['Product', 'Order', 'User'],//tag define the type of data we'll be fetching from API
    endpoints: (builder) => ({}),
});