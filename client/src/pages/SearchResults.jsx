import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import axios from "axios";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const [jobs, setJobs] = useState([]);
  const query = searchParams.get("query");
  const location = searchParams.get("location");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/jobs/search", {
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
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Search Results</h1>
      {jobs.length > 0 ? (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {jobs.map((job) => (
            <li key={job.id} className="border p-4">
              <h3 className="font-bold">{job.title}</h3>
              <p>Company: {job.company.display_name}</p>
              <p>Location: {job.location.display_name}</p>
              <Link to={`/details/${job.id}`} className="text-blue-500">
                View Details
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
};

export default SearchResults;
