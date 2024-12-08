import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import JobCard from "../components/jobsearch/JobCard";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const [jobs, setJobs] = useState([]);
  const query = searchParams.get("query");
  const location = searchParams.get("location");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/jobs/search", {
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
              // <li key={job.id} className="flex flex-col h-48 company-card rounded-lg p-3">
              //   <div className="glass-background h-48"></div>
              //   <h3 className="font-bold">{job.title}</h3>
              //   <p>Company: {job.company.display_name}</p>
              //   <p>Location: {job.location.display_name}</p>
              //   <Link to={`/details/${job.id}`} className="text-blue-500">
              //     View Details
              //   </Link>
              // </li>
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
