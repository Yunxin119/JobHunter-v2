import React from 'react'
import { FaXmark } from "react-icons/fa6";
import { useDeletePostMutation } from '../../redux/postApiSlice'
import { toast } from 'react-toastify';

const SinglePostItem = ({ post, isCurrentUser }) => {
    const [deletePost, {isLoading}] = useDeletePostMutation();
    const handleDelete = async() => {
        const confirm = window.confirm('Are you sure you want to delete this post? This action cannot be undone.');
        if (!confirm) return;
        try {
            await deletePost(post._id).unwrap();
            toast.success("Post deleted successfully");
        } catch (error) {
            console.error(error);
            toast.error('Failed to delete post');
        }
    }
  return (
    <>
    <div className='flex flex-col h-48 company-card rounded-lg p-3 bg-white'>
        <div className="glass-background h-48"></div>
        {isCurrentUser && (
            <button 
            className='btn btn-sm btn-ghost absolute top-2 right-2 justify-end text-gray-500'
            onClick={handleDelete}
            >
                <FaXmark />
            </button>
        )}
        <div className="flex w-full items-center justify-between space-x-6 p-4">
            <div className="flex-1 truncate">
                <div className="flex items-center space-x-3">
                    <h3 className="prime-text truncate text-sm font-medium">{post.title}</h3>
                </div>
            </div>
        </div>
        <div className="flex flex-1 flex-col mx-3">
            <p className="text-sm text-gray-500">{post.content}</p>
        </div>
    </div>
    </>

  )
}

export default SinglePostItem
