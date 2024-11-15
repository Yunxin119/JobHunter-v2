import { apiSlice } from "./apiSlice";
import { Post_URL } from "../config";

const postApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getPosts: builder.query({
            query: () => ({
                url: Post_URL,
            }),
            providesTags: ['Post'],
            keepUnusedDataFor: 5,
        }),
        getUserPosts: builder.query({
            query: (id) => ({
                url: Post_URL + '/user/'+id,
            }),
            providesTags: ['Post'],
            keepUnusedDataFor: 5,
        }),
        addPost:builder.mutation({
            query: (body) => ({
                url: Post_URL,
                method: 'POST',
                body
            }),
            invalidatesTags: ['Post']
        }),
        updatePost: builder.mutation({
            query: (body) => ({
                url: Post_URL + '/'+body.id,
                method: 'PUT',
                body
            }),
            invalidatesTags: ['Post']
        }),
        deletePost: builder.mutation({
            query: (id) => ({
                url: Post_URL + '/'+id,
                method: 'DELETE'
            }),
            invalidatesTags: ['Post']
        }),
    })
})

export const { 
    useGetPostsQuery, 
    useAddPostMutation, 
    useUpdatePostMutation, 
    useDeletePostMutation, 
    useGetUserPostsQuery
} = postApiSlice;

export default postApiSlice;