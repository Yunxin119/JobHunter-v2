import { useGetUserCommentsQuery } from "../../redux/commentApiSlice";
import React from 'react'
import SingleCommentItem from "./SingleCommentItem";
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const UserComments = ({ user, isCurrentUser }) => {
    const { data, isLoading, error, refetch } = useGetUserCommentsQuery(user._id);
    const handleCommentDeleted = () => {
        refetch();
    }
    const validComments = data?.comments || [];
    console.log("comments: ", validComments);
    const { userInfo } = useSelector((state) => state.authReducer)
    if (!userInfo) {
        return (
            <div className="container mx-auto p-6 w-[83%]">
                <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 mt-1 items-center">
                    <div className="text-center text-gray-700 text-xl bg-white/50 backdrop-blur-sm rounded-md">
                    Please login to view this user's comments
                    <Link to="/login" className="ml-3 text-lg text-indigo-500 hover:text-indigo-400 hover:underline">Login</Link>
                    </div>
                </div>
            </div>
        )
    }
  return (
    <div className="container mx-auto p-6 w-[83%]">
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 mt-1 items-center">
            {validComments.length > 0 ? (
                validComments.map(comment => (
                    <SingleCommentItem key={comment._id} comment={comment} isCurrentUser={isCurrentUser} onCommentDeleted={handleCommentDeleted}/>
                ))
            ) : (
                <div className="text-center text-gray-700 text-2xl">No comments found</div>
            )}
        </div>
    </div>
  )
}

export default UserComments
