import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { useGetPostsQuery } from "../../redux/postApiSlice";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SinglePostItem from "../../components/profile/SinglePostItem";

const EditPosts = () => {
    const { data, isLoading, error, refetch } = useGetPostsQuery();
    const validPosts = data?.posts || [];
    const { userInfo } = useSelector((state) => state.authReducer);
    const isAdmin = userInfo?.role === "admin";
    const handlePostDeleted = () => {
        refetch();
    };

  return (
    <div className="screen">
    <Navbar />
    <div className="container mx-auto p-6">
    <h1 className="text-2xl font-semibold label-text mb-3">All Posts</h1>
    {validPosts?.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 mt-1 items-center">
          {validPosts.map((post) => (
            <SinglePostItem
            key={post._id}
            post={post}
            isCurrentUser={isAdmin}
            onPostDeleted={handlePostDeleted}
            />  
        ))}
        </div>

    ) : (
      <div>No posts found</div>
    )}
    </div>

  </div>
  )
}

export default EditPosts
