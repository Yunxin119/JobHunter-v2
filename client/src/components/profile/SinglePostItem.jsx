import React from 'react';
import {useNavigate} from 'react-router-dom'
import { FaXmark } from "react-icons/fa6";
import { toast } from 'react-toastify';

const SinglePostItem = ({ post, isCurrentUser }) => {
    const navigate = useNavigate()
    const handleDelete = async () => {
        const confirm = window.confirm('Are you sure you want to delete this post? This action cannot be undone.');
        if (!confirm) return;
        try {
            // delete
            toast.success("Post deleted successfully");
        } catch (error) {
            console.error(error);
            toast.error('Failed to delete post');
        }
    };

    return (
        <div 
        className=" cursor-pointer flex flex-col h-48 company-card rounded-lg p-3 bg-white relative"
        onClick={()=>{
            navigate(`/details/post/${post._id}`)
        }}
        >
            {isCurrentUser && (
                <button 
                    className="btn btn-sm btn-ghost absolute top-2 right-2 text-gray-500"
                    onClick={handleDelete}
                >
                    <FaXmark />
                </button>
            )}
            <div className="flex items-center mb-2">
                <img
                    src={post.userId?.profilePic || "/default-avatar.png"} // default icon
                    alt="User Avatar"
                    className="w-8 h-8 rounded-full mr-2"
                />
                <span className="font-medium text-gray-700">{post.userId?.username || "Unknown User"}</span>
            </div>
            <div className="flex flex-col">
                <h3 className="text-sm font-medium text-gray-900 truncate">{post.title}</h3>
                <p className="text-sm text-gray-600">{post.content}</p>
            </div>
        </div>
    );
};

export default SinglePostItem;
