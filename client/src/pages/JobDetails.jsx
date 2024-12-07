import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux"; // 引入 useSelector

const JobDetails = () => {
  const { id } = useParams(); // 当前职位的 ID
  const [jobDetails, setJobDetails] = useState(null); // 职位详情
  const [posts, setPosts] = useState([]); // 帖子列表
  const [newPost, setNewPost] = useState(""); // 新帖子内容
  const [error, setError] = useState(null);

  // 从 Redux 获取当前用户信息
  const currentUser = useSelector((state) => state.authReducer.userInfo);

  // 获取职位详情和帖子列表
  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/jobs/details/${id}`);
        setJobDetails(response.data);
      } catch (error) {
        console.error("Error fetching job details:", error.message);
        setError("Failed to fetch job details.");
      }
    };

    const fetchPosts = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/posts/job/${id}`);
        console.log(response.data)
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error.message);
      }
    };

    fetchJobDetails();
    fetchPosts();
  }, [id]);

  // 发布帖子
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
            "http://localhost:5000/api/posts",
            {
                title: "test", // 示例标题
                jobId: id,    // 当前职位 ID
                content: newPost, // 帖子内容
                userId: currentUser._id
            },
            {
                withCredentials: true, // 启用 cookie
            }
        );

        setPosts([response.data.post, ...posts]); // 更新帖子列表
        setNewPost(""); // 清空输入框
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
      {/* 职位详情 */}
      <h1 className="text-2xl font-bold mb-4">{jobDetails.title}</h1>
      <p><strong>Company:</strong> {jobDetails.company.display_name}</p>
      <p><strong>Location:</strong> {jobDetails.location.display_name}</p>
      <p><strong>Description:</strong></p>
      <p>{jobDetails.description}</p>
      <p><strong>Salary:</strong> ${jobDetails.salary_min} - ${jobDetails.salary_max}</p>
      <p><strong>Redirect URL:</strong> <a href={jobDetails.redirect_url} target="_blank" rel="noopener noreferrer" className="text-blue-500">View on Adzuna</a></p>

      {/* 帖子列表 */}
      <h2 className="text-xl font-bold mt-8">Related Posts</h2>
      <ul className="mt-4">
        {posts.map((post) => (
          <li key={post._id} className="border p-2 my-2">
            <p><strong>{post.username}</strong> ({new Date(post.createdAt).toLocaleString()}):</p>
            <p>{post.content}</p>
          </li>
        ))}
      </ul>

      {/* 发布帖子表单 */}
      <div className="mt-4">
        <h3 className="text-lg font-bold">Add a Post</h3>
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
    </div>
  );
};

export default JobDetails;
