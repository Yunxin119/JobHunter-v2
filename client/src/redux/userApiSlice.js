import { USERS_URL } from '../config';
import { apiSlice } from './apiSlice';

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (body) => ({
                url: USERS_URL + '/login',
                method: 'POST',
                body
            }),
            invalidatesTags: ['User']
        }),
        register: builder.mutation({
            query: (body) => ({
                url: USERS_URL + '/register',
                method: 'POST',
                body
            }),
            invalidatesTags: ['User']
        }),
        logout: builder.mutation({
            query: () => ({
                url: USERS_URL + '/logout',
                method: 'POST'
            }),
            invalidatesTags: ['User'],
            onQueryStarted: () => logout()
        }),
        getProfile: builder.query({
            query: (id) => ({
                url: USERS_URL + '/profile/' + id,
            }),
            providesTags: ['User'],
            keepUnusedDataFor: 5,
        }),
        updateProfile: builder.mutation({
            query: (body) => ({
                url: USERS_URL + '/profile/'+ body.id,
                method: 'PUT',
                body
            }),
            invalidatesTags: ['User']
        }),
        getAllUsers: builder.query({
            query: () => ({
                url: USERS_URL + '/all',
            }),
            providesTags: ['User'],
            keepUnusedDataFor: 5,
        }),
    })
});

export const { 
    useLoginMutation, 
    useRegisterMutation, 
    useLogoutMutation, 
    useGetProfileQuery, 
    useUpdateProfileMutation,
    useGetAllUsersQuery
} = userApiSlice;
export default userApiSlice;