import { USERS_URL } from '../config';
import { apiSlice } from './apiSlice';
import { deleteUser } from './tempUserReducer';

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
        }),
        getProfile: builder.query({
            query: (id) => ({
                url: USERS_URL + '/' + id,
            }),
            providesTags: ['User'],
            keepUnusedDataFor: 5,
        }),
        updateProfile: builder.mutation({
            query: (body) => ({
                url: USERS_URL + '/'+ body.id,
                method: 'PUT',
                body
            }),
            invalidatesTags: ['User']
        }),
        getAllUsers: builder.query({
            query: () => ({
                url: USERS_URL,
            }),
            providesTags: ['User'],
            keepUnusedDataFor: 5,
        }),
        getUserProfile: builder.query({
            query: (id) => ({
                url: USERS_URL + '/'+id,
            }),
            providesTags: ['User'],
            keepUnusedDataFor: 5,
        }),
        deleteUser: builder.mutation({
            query: (id) => ({
                url: USERS_URL + '/'+id,
                method: 'DELETE'
            }),
            invalidatesTags: ['User']
        })
    })
});

export const { 
    useLoginMutation, 
    useRegisterMutation, 
    useLogoutMutation, 
    useGetProfileQuery, 
    useUpdateProfileMutation,
    useGetAllUsersQuery,
    useDeleteUserMutation
} = userApiSlice;
export default userApiSlice;