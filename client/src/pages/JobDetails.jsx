import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const JobDetails = () => {
  const { id } = useParams();
  const [jobDetails, setJobDetails] = useState(null);
  const [error, setError] = useState(null);

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

  if (error) {
    return <div className="p-4">{error}</div>;
  }

  if (!jobDetails) {
    return <div className="p-4">Loading job details...</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{jobDetails.title}</h1>
      <p><strong>Company:</strong> {jobDetails.company.display_name}</p>
      <p><strong>Location:</strong> {jobDetails.location.display_name}</p>
      <p><strong>Description:</strong></p>
      <p>{jobDetails.description}</p>
      <p><strong>Salary:</strong> ${jobDetails.salary_min} - ${jobDetails.salary_max}</p>
      <p><strong>Redirect URL:</strong> <a href={jobDetails.redirect_url} target="_blank" rel="noopener noreferrer" className="text-blue-500">View on Adzuna</a></p>
    </div>
  );
};

export default JobDetails;
