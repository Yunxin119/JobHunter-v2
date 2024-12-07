import React, {useState, useEffect} from 'react'
import { useGetCompanyQuery } from '../../redux/companyApiSlice'

const LoggedInUserComponent = () => {
    const { data: companies, isLoading, isError } = useGetCompanyQuery();
    const [displayCompany, setDisplayCompany] = useState([]);
    const [startIdx, setStartIdx] = useState(0);
  
    useEffect(() => {
      if (companies && companies.length > 0) {
        setDisplayCompany(companies.slice(0, 4));
      }
    }, [companies]);
  
    useEffect(() => {
      if (companies && companies.length > 4) {
        const interval = setInterval(() => {
          setStartIdx((prev) => (prev + 1) % companies.length);
        }, 1500);
  
        return () => clearInterval(interval);
      }
    }, [companies]);
  
    useEffect(() => {
      if (companies && companies.length > 4) {
        const extendedCompanies = companies.concat(companies.slice(0, 3));
        setDisplayCompany(extendedCompanies.slice(startIdx, startIdx + 4));
      }
    }, [startIdx, companies]);
  
    if (isLoading) {
      return <div className="text-white">Loading...</div>;
    }
  
    if (isError) {
      return <div className="text-red-500">Error fetching company data.</div>;
    }
  
    if (!companies || companies.length === 0) {
      return <div className="text-gray-400">No company data available.</div>;
    }

  return (
    <div className='p-4'>
        <aside className="bg-white/30 backdrop-blur-md dark:bg-black/30 md:w-80 sm:w-96 lg:overflow-y-auto border-l border-white/5 rounded-lg">
            <header className="flex items-center justify-between border-b border-white/5 px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
              <h2 className="text-base/7 font-semibold label-text">Activity feed</h2>
            </header>
            <ul role="list" className="divide-y divide-white/5">
              {displayCompany.map((company) => (
                <li key={company._id} className="px-4 py-4 sm:px-6 lg:px-8">
                  <div className="flex items-center gap-x-3">
                    <img alt="" src={company.imgUrl} className="size-6 flex-none rounded-full bg-gray-800" />
                    <h3 className="flex-auto truncate text-sm/6 font-semibold label-text">{company.name}</h3>
                  </div>
                  <p className="mt-3 truncate text-sm text-gray-500 dark:text-gray-450">
                    Pushed to <span className="sec-text">{company.role}</span> (
                    <span className="font-mono sec-text">{company.status}</span> on{' '}
                    <span className="sec-text">{company.updatedAt}</span>)
                  </p>
                </li>
              ))}
            </ul>
        </aside>
    </div>
  )
}

export default LoggedInUserComponent
