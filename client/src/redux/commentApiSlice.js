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
        })
    })
});

export const { useGetUserCommentsQuery } = commentApiSlice;
export default commentApiSlice;