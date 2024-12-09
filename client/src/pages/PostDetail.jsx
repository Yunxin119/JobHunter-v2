import React, { useEffect, useState } from "react";
import { BsHandThumbsUp, BsHandThumbsUpFill, BsChatDots, BsTrash } from "react-icons/bs";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";
import { useGetPostByIdQuery, useLikePostMutation, useDeletePostMutation, useUnlikePostMutation } from "../redux/postApiSlice";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useAddCommentMutation, useGetCommentsByPostQuery, useDeleteCommentsByPostMutation, useDeleteUserCommentMutation } from "../redux/commentApiSlice";

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.authReducer);

  // Post and Comments Queries
  const { data, refetch: refetchPost } = useGetPostByIdQuery(id);
  const post = data?.post;
  const postUser = post?.userId
  const postLikes = post?.likes || [];
  const { data: commentsData, refetch: refetchComments } = useGetCommentsByPostQuery(id);
  const comments = commentsData?.comments || [];

  // Mutations
  const [likePost, { isLoading: isLiking }] = useLikePostMutation();
  const [unlikePost] = useUnlikePostMutation();
  const [addComment, { isLoading: isAddingComment }] = useAddCommentMutation();
  const [deleteComment] = useDeleteUserCommentMutation();
  const [deletePost] = useDeletePostMutation();

  const [isLiked, setIsLiked] = useState(postLikes.includes(userInfo?._id));

  useEffect(() => {
    setIsLiked(postLikes.includes(userInfo?._id));
  }, [postLikes, userInfo?._id]);

  // Local States
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [comment, setComment] = useState("");

  // Handle Like Post
  const handleLikePost = async () => {
    try {
      if (isLiked) {
        await unlikePost({ postId: id, user: userInfo }).unwrap();
        setIsLiked(false);
      } else {
        await likePost({ postId: id, user: userInfo }).unwrap();
        setIsLiked(true);
      }
      refetchPost();
    } catch (error) {
      toast.error(error?.data?.message || "Failed to like post");
    }
  }

  // Handle Add Comment
  const handleAddComment = async () => {
    if (!comment.trim()) {
      toast.warning("Comment cannot be empty");
      return;
    }
    try {
      await addComment({ pid: id, user: userInfo, content: comment }).unwrap();
      toast.success("Comment added successfully");
      setComment("");
      setShowCommentModal(false);
      refetchComments();
    } catch (error) {
      toast.error(error?.data?.message || "Failed to add comment");
    }
  };

    // Handle Delete Comment
    const handleDeleteComment = async (commentId) => {
      const confirm = window.confirm("Are you sure you want to delete this comment?");
      if (!confirm) return;
      try {
        await deleteComment(commentId).unwrap();
        toast.success("Comment deleted successfully");
        refetchComments();
      } catch (error) {
        toast.error("Failed to delete comment");
      }
    };

  // Handle Delete Post
  const handleDeletePost = async () => {
    const confirm = window.confirm("Are you sure you want to delete this post?");
    if (!confirm) return;
    try {
      await deletePost(id).unwrap();
      toast.success("Post deleted successfully");
      navigate("/");
    } catch (error) {
      toast.error("Failed to delete post");
    }
  };

  if (!post || !comments) return <h1>Loading...</h1>;

  return (
    <div className="screen">
      <Navbar />
      <div className="p-4">
        <div className="relative p-4 left-1/2 transform -translate-x-1/2 flex flex-col items-start mt-4 backdrop-blue-md w-[80%] rounded-xl mb-3 backdrop-blur-md bg-white/40 dark:bg-black/45">
          {post && (
            <>
              <div className="mb-2 flex items-center">
                <Link to={`/profile/${post.userId?._id}`}>
                  <div className="flex flex-row items-center">
                    <img
                      className="w-[40px] h-[40px] rounded-full mr-2"
                      src={post.userId?.profilePic}
                      alt={post.userId?.username}
                    />
                    <span className="label-text text-lg font-bold">{post.userId?.username}</span>
                  </div>
                </Link>
                {(userInfo?.role === "admin" || userInfo?._id === post.userId?._id) && (
                  <BsTrash
                    className="text-red-500 cursor-pointer hover:text-red-700 ml-2"
                    onClick={handleDeletePost}
                  />
                )}
              </div>
              <h1 className="ml-12 text-lg font-bold prime-text">{post.title}</h1>
              <p className="ml-12 sec-text">{post.content}</p>
              {(userInfo?.role !== "user") && (
                <div className="pl-12 mt-4 flex items-center">
                  {isLiked ? (
                  <BsHandThumbsUpFill
                    className={`cursor-pointer ${isLiking ? "opacity-50" : ""}`}
                    onClick={handleLikePost}
                  />
                  ) : (
                  <BsHandThumbsUp
                    className={`cursor-pointer ${isLiking ? "opacity-50" : ""}`}
                    onClick={handleLikePost}
                  />
                  )}

                  <span className="ml-2">{post.likes?.length || 0}</span>
                  <BsChatDots
                    className="cursor-pointer ml-4"
                    onClick={() => setShowCommentModal(true)}
                  />
                </div>
              )}
            </>
          )}
        {comments.map((comment) => (
          <div key={comment._id} className="ml-10">
            
            <div className="mb-2 mt-4 flex items-center">
              <Link to={`/profile/${comment.userId?._id}`}>
              <div className="flex items-center">
                <img
                  className="w-[30px] h-[30px] rounded-full mr-2"
                  src={comment.userId?.profilePic}
                  alt={comment.userId?.username}
                />
                <span className="prime-text">{comment.userId?.username}</span>
             </div>
             </Link>
              {(userInfo?.role === "admin" || userInfo?._id === comment.userId._id) && (
                <BsTrash
                  className="text-red-500 cursor-pointer hover:text-red-700 ml-3"
                  onClick={() => handleDeleteComment(comment._id)}
                />
              )}
            </div>
            <p className="sec-text">{comment.content}</p>
          </div>
        ))}
        {showCommentModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
            <div className="edit">
            <h2 className="text-2xl font-bold mb-4 dark:text-gray-200">Comment</h2>
              <textarea
                className="textfield"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows="6"
              ></textarea>
              <div className="flex justify-end mt-4">
                <button
                  className="btn-secondary mr-2"
                  onClick={() => setShowCommentModal(false)}
                >
                  Cancel
                </button>
                <button
                  className={`btn-primary ${isAddingComment ? "opacity-50" : ""}`}
                  onClick={handleAddComment}
                  disabled={isAddingComment}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}
        </div>
      </div>
    </div>
  );
};

export default PostDetail;