import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const JobSearch = () => {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (query.trim() && location.trim()) {
      navigate(`/search/results?query=${query.trim()}&location=${location.trim()}`);
    } else {
      alert("Please enter both job title and location!");
    }
  };

  return (
    <div className="screen">
      <Navbar />
      <div className="p-4 flex relative items-center justify-center flex-col top-1/3">
        <h1 className="text-2xl font-bold mb-4 prime-text">Job Search</h1>
        <div className="mb-4 flex flex-row">
          <input
            type="text"
            placeholder="Job title"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="border p-2 mr-2 input"
          />
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="border p-2 mr-2 input"
          />
          <button onClick={handleSearch} className="bg-blue-500 text-white p-2">
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobSearch;
