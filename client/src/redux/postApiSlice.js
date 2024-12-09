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
                url: Post_URL + '/user/' + id,
            }),
            providesTags: (result, error, id) =>
                result
                    ? [...result.posts.map(({ _id }) => ({ type: 'Post', id: _id })), { type: 'Post', id }]
                    : [{ type: 'Post', id }],
            keepUnusedDataFor: 5,
        }),
        deletePost: builder.mutation({
            query: (id) => ({
                url: Post_URL + '/' + id,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, id) => [{ type: 'Post', id }],
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
        getPostsByJob: builder.query({
            query: (jobId) => ({
                url: Post_URL + '/job/'+jobId,
            }),
            providesTags: ['Post'],
            keepUnusedDataFor: 5,
        }),
        getPostById: builder.query({
            query: (id) => ({
                url: Post_URL + '/'+id,
            }),
            providesTags: ['Post'],
            keepUnusedDataFor: 5,
        }),
        likePost: builder.mutation({
            query: (body) => ({
                url: Post_URL + '/likePost/'+body.postId,
                method: 'POST',
                body
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
    useGetUserPostsQuery,
    useGetPostsByJobQuery,
    useGetPostByIdQuery,
    useLikePostMutation
} = postApiSlice;

export default postApiSlice;