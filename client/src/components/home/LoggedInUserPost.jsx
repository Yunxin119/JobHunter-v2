import React, { useEffect, useState } from "react";
import { useGetPostsQuery } from "../../redux/postApiSlice";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const LoggedInUserPost = () => {
  // Get the current user's ID from Redux
  const { userInfo } = useSelector((state) => state.authReducer);
  const userId = userInfo?._id;

  const { data, isLoading, error } = useGetPostsQuery(userId); // Fetch posts by user ID
  const validPosts = data?.posts || [];
  console.log(validPosts);
  const [displayPost, setDisplayPost] = useState([]);
  const [startIdx, setStartIdx] = useState(0);

  // Initialize displayed posts
  useEffect(() => {
    if (validPosts.length > 0) {
      setDisplayPost(validPosts.slice(0, 1));
    }
  }, [validPosts]);

  // Handle auto-rotation of posts
  useEffect(() => {
    if (validPosts.length > 1) {
      const interval = setInterval(() => {
        setStartIdx((prev) => (prev + 1) % validPosts.length);
      }, 1500);

      return () => clearInterval(interval); // Cleanup interval on unmount
    }
  }, [validPosts]);

  // Update displayed posts based on start index
  useEffect(() => {
    if (validPosts.length > 0) {
      const extendedPosts = validPosts.concat(validPosts.slice(0, 1));
      setDisplayPost(extendedPosts.slice(startIdx, startIdx + 1));
    }
  }, [startIdx, validPosts]);

  // Handle loading and error states
  if (isLoading) {
    return <div className="text-white">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error fetching posts data.</div>;
  }

  return (
    <>
      {validPosts.length > 0 ? (
        <div className="p-4">
          <aside className="bg-white/30 backdrop-blur-md dark:bg-black/30 sm:w-96 md:w-[400px] lg:overflow-y-auto border-l border-white/5 rounded-lg">
            <header className="flex items-center justify-between border-b border-white/5 px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
              <h2 className="text-base/7 font-semibold label-text">Posts</h2>
            </header>
            <ul role="list" className="divide-y divide-white/5">
              {displayPost.map((post) => (
                <li key={post._id} className="px-4 py-4 sm:px-6 lg:px-8">
                  <Link to={`/profile/${post.userId._id}`} className="flex items-center gap-x-3">
                    <img
                      alt=""
                      src={post.userId?.profilePic || "/default-avatar.png"}
                      className="size-6 flex-none rounded-full bg-gray-800"
                    />
                    <h3 className="flex-auto truncate text-sm/6 font-semibold label-text">
                      {post.userId.username}
                    </h3>
                  </Link>
                  <Link to={`/details/post/${post._id}`} >
                    <p className="mt-3 truncate text-sm text-gray-500 dark:text-gray-450 py-2">
                        <span className="sec-text ">{post.title}</span>
                    </p>
                  </Link>

                </li>
              ))}
            </ul>
          </aside>
        </div>
      ) : (
        <div className="text-gray-400">No posts available.</div>
      )}
    </>
  );
};

export default LoggedInUserPost;
