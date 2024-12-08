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
        })
    }),
})

export const { useGetUserCommentsQuery, useDeleteUserCommentMutation } = commentApiSlice;
export default commentApiSlice;