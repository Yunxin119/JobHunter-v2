import React from 'react';
import { FaXmark } from "react-icons/fa6";
import { useDeletePostMutation } from '../../redux/postApiSlice'
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const SinglePostItem = ({ post, isCurrentUser, onPostDeleted }) => {
    const [deletePost, {isLoading}] = useDeletePostMutation();
    const handleDelete = async() => {
        const confirm = window.confirm('Are you sure you want to delete this post? This action cannot be undone.');
        if (!confirm) return;
        try {
            await deletePost(post._id).unwrap();
            toast.success("Post deleted successfully");
            if (onPostDeleted) onPostDeleted(); 
        } catch (error) {
            console.error(error);
            toast.error('Failed to delete post');
        }
    }

    return (
        <div className="flex flex-col h-48 company-card rounded-lg p-3 backdrop-blur-md relative">
            {isCurrentUser && (
                <button 
                    className="btn btn-sm btn-ghost absolute top-2 right-2 text-gray-500"
                    onClick={handleDelete}
                >
                    <FaXmark />
                </button>
            )}
            <Link to={`/profile/${post.userId?._id}`} className="flex items-center mb-2">
                <img
                    src={post.userId?.profilePic || "/default-avatar.png"}
                    alt="User Avatar"
                    className="w-8 h-8 rounded-full mr-2"
                />
                <span className="font-medium text-gray-700">{post.userId?.username || "Unknown User"}</span>
            </Link>
            <div className="flex w-full items-center justify-between pl-3">
                <div className="flex items-center">
                    <h3 className="prime-text truncate text-sm font-medium">{post.title}</h3>
                </div>
            </div>
            <div className="flex flex-1 flex-col mx-3 mt-3">
                { post.content.split('').length > 100 ? (
                    <p className="text-sm text-gray-700 dark:text-gray-300">{post.content.slice(0, 100)}...</p>
                ) : (
                    <p className="text-sm text-gray-700 dark:text-gray-300">{post.content}</p>
                )}
                <Link to={`/details/post/${post._id}`} className="text-blue-500 mt-1 truncate text-sm">
                    View Detail
                </Link>
            </div>
        </div>
    );
};

export default SinglePostItem;
