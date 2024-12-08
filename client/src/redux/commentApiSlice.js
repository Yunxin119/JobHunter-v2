import { apiSlice } from "./apiSlice";
import { Comment_URL } from "../config";

const commentApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUserComments: builder.query({
            query: (id) => ({
                url: Comment_URL + '/user/'+id,
            }),
            providesTags: ['Comment'],
            keepUnusedDataFor: 5,
        }),
        deleteUserComment: builder.mutation({
            query: (id) => ({
                url: Comment_URL + '/'+id,
                method: 'DELETE',
            }),
            invalidatesTags: ['Comment'],
        }),
        addComment: builder.mutation({
            query: ({ pid, content, user }) => ({
                url: Comment_URL + '/post/'+pid,
                method: 'POST',
                body: { user, content },
            }),
            invalidatesTags: ['Comment'],
        }),
        getCommentsByPost: builder.query({
            query: (pid) => ({
                url: Comment_URL + '/post/'+pid,
            }),
            providesTags: ['Comment'],
            keepUnusedDataFor: 5,
        }),
        deleteCommentsByPost: builder.mutation({
            query: (pid) => ({
                url: Comment_URL + '/post/'+pid,
                method: 'DELETE',
            }),
            invalidatesTags: ['Comment'],
        })
    }),
})

export const { 
    useGetUserCommentsQuery, 
    useDeleteUserCommentMutation, 
    useAddCommentMutation, 
    useGetCommentsByPostQuery,
    useDeleteCommentsByPostMutation
 } = commentApiSlice;
export default commentApiSlice;