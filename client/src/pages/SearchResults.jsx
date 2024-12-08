import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import JobCard from "../components/jobsearch/JobCard";
import { BASE_URL } from "../config";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const [jobs, setJobs] = useState([]);
  const query = searchParams.get("query");
  const location = searchParams.get("location");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/jobs/search`, {
          params: { query, location },
        });
        setJobs(response.data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    if (query && location) {
      fetchJobs();
    }
  }, [query, location]);

  return (
    <div className="screen">
      <Navbar />
      <div className="container mx-auto p-6">
        <h1 className="text-xl font-bold mb-4">Search Results</h1>
        {jobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {jobs.map((job) => (
              <JobCard job={job} key={job.id}/>
            ))}
          </div>
        ) : (
          <p>No results found.</p>
        )}
    </div>
  </div>
  );
};

export default SearchResults;
