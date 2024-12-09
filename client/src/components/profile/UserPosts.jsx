import React from 'react'
import { useGetUserPostsQuery } from '../../redux/postApiSlice'
import { useSelector } from 'react-redux'
import SinglePostItem from './SinglePostItem';
import { Link } from 'react-router-dom';
const UserPosts = ({ user, isCurrentUser }) => {
    const { data, isLoading, error, refetch } = useGetUserPostsQuery(user._id);
    const handlePostDeleted = () => {
        refetch();
    }
    const validPosts = data?.posts || [];
    console.log(validPosts);
    const { userInfo } = useSelector((state) => state.authReducer)
    if (!userInfo) {
        return (
            <div className="container mx-auto p-6 w-[83%]">
                <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 mt-1 items-center">
                    <div className="text-center text-gray-700 text-xl bg-white/50 backdrop-blur-sm rounded-md">
                    Please login to view this user's posts
                    <Link to="/login" className="ml-3 text-lg text-indigo-500 hover:text-indigo-400 hover:underline">Login</Link>
                    </div>
                </div>
            </div>
        )
    }
  return (
    <div className="container mx-auto p-6 w-[83%]">
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 mt-1 items-center">
            {validPosts.length > 0 ? (
                validPosts.map(post => (
                    <SinglePostItem key={post._id} post={post} isCurrentUser={isCurrentUser} onPostDeleted={handlePostDeleted}/>
                ))
            ) : (
                 isCurrentUser && userInfo.role === 'user' ? (
                    <div className='flex flex-col items-start bg-gray-200/45 backdrop-blur-md p-4 rounded-lg w-full'>
                        <div className="text-center text-gray-700 text-2xl">Verify your email to write posts</div>
                        <div className='text-gray-500 text-md'>Click edit profile &rarr; Select role to be Superuser &rarr; Verify</div>
                    </div>
                ) : (
                    <div className="text-center text-gray-700 text-2xl">No posts found</div>
                )
            )}
        </div>
    </div>
  )
}

export default UserPosts
