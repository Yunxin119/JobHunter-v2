import React from 'react';
import { FaXmark } from "react-icons/fa6";
import { useDeleteUserCommentMutation } from '../../redux/commentApiSlice';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const SingleCommentItem = ({ comment, isCurrentUser, onCommentDeleted }) => {
    const [deleteComment, {isLoading}] = useDeleteUserCommentMutation();
    const handleDelete = async() => {
        const confirm = window.confirm('Are you sure you want to delete this comment? This action cannot be undone.');
        if (!confirm) return;
        try {
            await deleteComment(comment._id).unwrap();
            toast.success("Comment deleted successfully");
            if (onCommentDeleted) onCommentDeleted(); 
        } catch (error) {
            console.error(error);
            toast.error('Failed to delete comment');
        }
    }

    const post = comment.postId;
    console.log(post)

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
            <Link to={`/profile/${comment.userId?._id}`} className="flex items-center mb-2">
                <img
                    src={comment.userId?.profilePic || "/default-avatar.png"}
                    alt="User Avatar"
                    className="w-8 h-8 rounded-full mr-2"
                />
                <span className="font-medium text-gray-700">{comment.userId?.username || "Unknown User"}</span>
            </Link>
            <div className="flex w-full items-center justify-between pl-3">
                <div className="flex items-center">
                    <h3 className="prime-text truncate text-sm font-medium">Replied to post "{post.title}"</h3>
                </div>
            </div>
            <div className="flex flex-1 flex-col mx-3 mt-3">
                { comment.content.split('').length > 120 ? (
                    <p className="text-sm text-gray-700 dark:text-gray-300">{comment.content.slice(0, 100)}...</p>
                ) : (
                    <p className="text-sm text-gray-700 dark:text-gray-300">{comment.content}</p>
                )}
                <Link to={`/details/post/${post._id}`} className="text-blue-500 mt-1 truncate text-sm">
                    View Detail
                </Link>
            </div>
        </div>
    );
};

export default SingleCommentItem;
