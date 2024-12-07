import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import { useAddCompanyMutation } from "../redux/companyApiSlice";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";


const JobDetails = () => {
  const userInfo = useSelector((state) => state.authReducer.userInfo || {});
  const { id } = useParams();
  const [jobDetails, setJobDetails] = useState(null);
  const [error, setError] = useState(null);
  const [jobLogo, setJobLogo] = useState(null);
  const [addCompany, { isLoading }] = useAddCompanyMutation();

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

  useEffect(() => {
    if (jobDetails && jobDetails.company) {
      const fetchLogo = async () => {
        const logo = await getImage(jobDetails.company.display_name);
        setJobLogo(logo);
      };
      fetchLogo();
    }
  }, [jobDetails]);

  if (error) {
    return <div className="p-4">{error}</div>;
  }

  if (!jobDetails) {
    return <div className="p-4">Loading job details...</div>;
  }

  const getImage = async (name) => {
    try {
        const response = await axios.get(`https://api.brandfetch.io/v2/search/${name}`);
        if (response.data && response.data.length > 0) {
            return response.data[0].icon;
        }
    } catch (error) {
        console.error("Error fetching image from Brandfetch:", error.message);
    }
    return null;
  };

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
            user: userInfo._id,
        };

        const res = await addCompany(newCompany).unwrap();
        toast.success('Company added successfully!');
    } catch (error) {
        console.log(error);
        toast.error(error?.data?.msg || 'Failed to add company');
    }
};

  return (
    <div className="screen">
      <Navbar />
      <div className="container mx-auto p-8">
        <div className="p-6 blur-window rounded-lg flex flex-row">
          <div className="w-[70%]">
            <h1 className="text-2xl font-bold mb-4">{jobDetails.title}</h1>
            <p><strong>Description:</strong></p>
            <p>{jobDetails.description}</p>
            <p><strong>Salary:</strong> ${Math.floor(jobDetails.salary_min)} - ${Math.floor(jobDetails.salary_max)}</p>
            <p><strong>Redirect URL:</strong> <a href={jobDetails.redirect_url} target="_blank" rel="noopener noreferrer" className="text-blue-500">View on Adzuna</a></p>
          </div>
          <div className="w-[30%] flex flex-col items-center justify-center gap-2">
            <img
                alt={`logo`}
                src={jobLogo}
                className="h-24 w-24 flex-shrink-0 rounded-full bg-gray-300"
            />
            <p><strong>Company:</strong> {jobDetails.company.display_name}</p>
            <p><strong>Location:</strong> {jobDetails.location.display_name}</p>
            { userInfo && <button className="btn btn-primary mt-2" onClick={handleAdd}>Applied</button> }
          </div>

        </div>
      </div>
    </div>
  );
};

export default JobDetails;
