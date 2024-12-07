import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import SinglePostItem from "../components/profile/SinglePostItem";
import Navbar from "../components/Navbar";
import { useAddCompanyMutation } from "../redux/companyApiSlice";
import { toast } from "react-toastify";
import { useAddPostMutation } from "../redux/postApiSlice"; 
import { useGetPostsByJobQuery } from "../redux/postApiSlice";
import { useGetCompanyQuery } from "../redux/companyApiSlice";
import { set } from "mongoose";

const JobDetails = () => {
  const { id } = useParams();
  const [jobDetails, setJobDetails] = useState(null);
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPost, setNewPost] = useState("");
  const [error, setError] = useState(null);

  const currentUser = useSelector((state) => state.authReducer.userInfo);

  const [jobLogo, setJobLogo] = useState(null);
  const [addCompany, { isLoading }] = useAddCompanyMutation();
  const [addPost, { isLoading: isAddingPost }] = useAddPostMutation();
  const [isApplied, setIsApplied] = useState(false);
  const { data: posts = [], refetch } = useGetPostsByJobQuery(id);
  const { data: companies = [] } = useGetCompanyQuery();

  // Fetch job details
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

    fetchJobDetails();
  }, [id]);

  // Fetch company logo
  useEffect(() => {
    if (jobDetails && jobDetails.company) {
      const fetchLogo = async () => {
        const logo = await getImage(jobDetails.company.display_name);
        setJobLogo(logo);
      };
      fetchLogo();
    }
  }, [jobDetails]);

  const getImage = async (name) => {
    try {
        const response = await axios.get(`https://api.brandfetch.io/v2/search/${name}`);
        if (response.data && response.data.length > 0) {
            return response.data[0].icon;
        }
    } catch (error) {
        console.error("Error fetching image from Brandfetch:", error.message);
        toast.error("Failed to fetch company logo");
    }
    return null;
  };

  // Add a post
  const handleAddPost = async () => {
    if (!newPostTitle.trim()) {
      toast.error("Please enter a title for your post!");
      return;
    }
    if (!newPost.trim()) {
      toast.error("Please enter a content for your post!");
      return;
    }

    if (!currentUser) {
      toast.error("Please login first to write a post");
      return;
    }

    try {
      const response = await addPost({
        title: newPostTitle,
        content: newPost,
        userId: currentUser._id,
        jobId: id,
      }).unwrap();
  
      toast.success("Post added successfully!");
      refetch(); 
      setNewPost("");
      setNewPostTitle("");
    } catch (error) {
      toast.error(error.response?.data?.msg || "Failed to create post");
    }
  };

  // Add company to user's applications
  const handleAdd = async (e) => {
    e.preventDefault();
    try {
        const newCompany = {
            name: jobDetails.company.display_name,
            role: jobDetails.title,
            status: "Submitted",
            city: jobDetails.location.display_name,
            link: jobDetails.redirect_url,
            applyDate: new Date().toLocaleDateString('en-US'),
            updatedAt: new Date().toLocaleDateString('en-US'),
            user: currentUser._id,
        };

        const res = await addCompany(newCompany).unwrap();
        setIsApplied(true);
        toast.success('Company added successfully!');
    } catch (error) {
        console.log(error);
        toast.error(error?.data?.msg || 'Failed to add company');
    }
  };

  useEffect(() => {
    const checkIfApplied = () => {
      if (currentUser && companies.length > 0 && jobDetails) {
        const applied = companies.find(
          (company) =>
            company.name === jobDetails.company.display_name &&
            company.role === jobDetails.title
        );
        if (applied) {
          setIsApplied(true);
        }
      }
    };

    checkIfApplied();
  }, [currentUser, companies, jobDetails]);

  const handlePostDeleted = () => {
    refetch();
  }

  if (error) {
    return <div className="p-4">{error}</div>;
  }

  if (!jobDetails) {
    return <div className="p-4">Loading job details...</div>;
  }

  return (
    <div className="screen">
      <Navbar />
      <div className="container mx-auto p-8">
        {/* Job Details */}
        <div className="p-6 blur-window rounded-lg flex flex-row gap-2">
          <div className="w-[70%] border-r pr-4 border-gray-300">
            <h1 className="text-2xl font-bold mb-4">{jobDetails.title}</h1>
            <p><strong>Description:</strong></p>
            <p>{jobDetails.description}</p>
            <p><strong>Salary:</strong> ${Math.floor(jobDetails.salary_min)} - ${Math.floor(jobDetails.salary_max)}</p>
            <p><strong>Redirect URL:</strong> <a href={jobDetails.redirect_url} target="_blank" rel="noopener noreferrer" className="text-blue-500">View on Adzuna</a></p>
          </div>
          
          <div className="w-[30%] pl-4 flex flex-col items-center justify-center gap-2">
            <img
                 alt={`logo`}
                 src={jobLogo}
                 className="h-24 w-24 flex-shrink-0 rounded-full bg-gray-300"
            />
            <p><strong>Company:</strong> {jobDetails.company.display_name}</p>
            <p><strong>Location:</strong> {jobDetails.location.display_name}</p>
            { currentUser && <button className={`btn btn-primary mt-2 ${isApplied ? 'btn-disable' : 'btn-primary'}`} onClick={handleAdd} disabled={isApplied}>Applied</button> }
          </div>
        </div>
        

        {/* Related Posts */}
        <h2 className="text-xl font-bold mt-8">Related Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.map((post) => (
            <SinglePostItem
              key={post._id}
              post={post}
              isCurrentUser={currentUser && currentUser._id === post.userId._id} 
              onPostDeleted={handlePostDeleted}
            />
          ))}
        </div>

        {/* Add a Post */}
        <div className="mt-4">
          <h3 className="text-lg font-bold">Add a Post</h3>
          <div className="flex flex-col gap-2 items-center justify-center">
            <input
              type="text"
              placeholder="Title"
              value={newPostTitle}
              onChange={(e) => setNewPostTitle(e.target.value)}
              className="textfield"
            />
            <textarea
              placeholder="Write a post..."
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              rows={5}
              className="textfield resize-none"
            ></textarea>
            <div className="flex flex-row gap-2">
              <button onClick={(e) => setNewPost("")} className="btn-secondary mt-2">Clear</button>
              <button onClick={handleAddPost} className="btn-primary mt-2"> Post </button>
            </div>
          </div>

        </div>
      </div>
    </div>

  );
};

export default JobDetails;
