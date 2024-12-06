import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const JobSearch = () => {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    // 验证输入是否合法
    if (query.trim() && location.trim()) {
      // 跳转到结果页面
      navigate(`/search/results?query=${query.trim()}&location=${location.trim()}`);
    } else {
      alert("Please enter both job title and location!");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Job Search</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Job title"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border p-2 mr-2"
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="border p-2 mr-2"
        />
        <button onClick={handleSearch} className="bg-blue-500 text-white p-2">
          Search
        </button>
      </div>
    </div>
  );
};

export default JobSearch;
