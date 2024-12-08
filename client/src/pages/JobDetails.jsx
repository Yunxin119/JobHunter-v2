import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import SinglePostItem from "../components/profile/SinglePostItem"; // 注意调整导入路径

const JobDetails = () => {
  const { id } = useParams();
  const [jobDetails, setJobDetails] = useState(null);
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [error, setError] = useState(null);
  const [title,setTitle] = useState('');

  const currentUser = useSelector((state) => state.authReducer.userInfo);
  console.log(currentUser);
  const fetchJobDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:5001/api/jobs/details/${id}`);
      setJobDetails(response.data);
    } catch (error) {
      console.error("Error fetching job details:", error.message);
      setError("Failed to fetch job details.");
    }
  };

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`http://localhost:5001/api/posts/job/${id}`);
      setPosts(response.data);
    console.log(response.data)
    } catch (error) {
      console.error("Error fetching posts:", error.message);
    }
  };

  useEffect(() => {
    fetchJobDetails();
    fetchPosts();
  }, [id]);

  const handleAddPost = async () => {
    if (!newPost.trim()) {
      alert("Please write something before posting!");
      return;
    }

    if (!currentUser) {
      alert("You must be logged in to post!");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5001/api/posts",
        {
          userId:currentUser._id,
          title,
          jobId: id,
          content: newPost,
        },
        {
          withCredentials: true,
        }
      );

      // setPosts([response.data.post, ...posts]);
      fetchPosts();
      setNewPost("");
    } catch (error) {
      console.error(
        "Error creating post:",
        error.response?.data?.msg || error.message
      );
    }
  };

  if (error) {
    return <div className="p-4">{error}</div>;
  }

  if (!jobDetails) {
    return <div className="p-4">Loading job details...</div>;
  }

  return (
    <div className="p-4">
      {/* Job Details */}
      <h1 className="text-2xl font-bold mb-4">{jobDetails.title}</h1>
      <p><strong>Company:</strong> {jobDetails.company.display_name}</p>
      <p><strong>Location:</strong> {jobDetails.location.display_name}</p>
      <p><strong>Description:</strong></p>
      <p>{jobDetails.description}</p>
      <p><strong>Salary:</strong> ${jobDetails.salary_min} - ${jobDetails.salary_max}</p>
      <p><strong>Redirect URL:</strong> <a href={jobDetails.redirect_url} target="_blank" rel="noopener noreferrer" className="text-blue-500">View on Adzuna</a></p>

      {/* Posts List */}
      <h2 className="text-xl font-bold mt-8">Related Posts</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map((post) =>{
          return  (
            <SinglePostItem
              key={post._id}
              post={post}
              isCurrentUser={currentUser && currentUser._id === post.userId._id} // Check if it is a post by the current user.
            />
          )
        })}
      </div>

      {/* Post submission form. */}
      {currentUser && currentUser.role !== "user" && (
      <div className="mt-4">
        <h3 className="text-lg font-bold">Add a Post</h3>
        <input className="border mb-2 mt-2" placeholder="Write title" onChange={(e)=>{
          setTitle(e.target.value)
        }}/>
        <textarea
          placeholder="Write a post..."
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          className="border p-2 mr-2 w-full"
        ></textarea>
        <button onClick={handleAddPost} className="bg-blue-500 text-white p-2 mt-2">
          Post
        </button>
      </div>
      )}
    </div>
  );
};

export default JobDetails;
