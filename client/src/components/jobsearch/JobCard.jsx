import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { API_NINJA_API_KEY } from '../../config'

const JobCard = ({job}) => {
    console.log(job);
    const [jobLogo, setJobLogo] = useState(null);

    // Helper function to fetch company logo
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
    

    useEffect(() => {
        const fetchLogo = async () => {
            const logo = await getImage(job.company.display_name);
            setJobLogo(logo);
        };
        fetchLogo();
    }, [job.company.display_name]);

  return (
    <li className="flex flex-col h-40 company-card rounded-lg p-3">
        <div className="glass-background h-40"></div>
        <div className="flex w-full items-center justify-between space-x-6 p-4">
            <img
                alt={`${job.company.display_name} logo`}
                src={jobLogo}
                className="h-20 w-20 flex-shrink-0 rounded-full bg-gray-300"
            />
            <div className="flex-1 truncate">
                <div className="flex items-center space-x-3">
                    <h3 className="prime-text truncate text-sm font-medium">{job.company.display_name}</h3>
                </div>
                <p className="prime-text mt-1 truncate text-sm">{job.title}</p>
                <p className="prime-text mt-1 truncate text-sm">{job.location.display_name}</p>
                <Link to={`/details/${job.id}`} className="text-blue-500 mt-1 truncate text-sm">
                    View Details
                </Link>
            </div>
        </div>
    </li>
  )
}

export default JobCard
