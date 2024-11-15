import React from 'react'
import { useGetUserPostsQuery } from '../../redux/postApiSlice'
import SinglePostItem from './SinglePostItem';
const UserPosts = ({ user, isCurrentUser }) => {
    const { data, isLoading, error } = useGetUserPostsQuery(user._id);
    const validPosts = data?.posts || [];
    console.log(validPosts);
  return (
    <div className="container mx-auto p-6 w-[83%]">
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 mt-1 items-center">
            {validPosts.length > 0 ? (
                validPosts.map(post => (
                    <SinglePostItem key={post._id} post={post} isCurrentUser={isCurrentUser}/>
                ))
            ) : (
                <div className="text-center text-gray-700 text-2xl">No posts found</div>
            )}
        </div>
    </div>
  )
}

export default UserPosts
