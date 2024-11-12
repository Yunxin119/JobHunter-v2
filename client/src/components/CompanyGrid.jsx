import React, { useState, useEffect } from 'react'
import SingleCompany from './SingleCompany'
import { toast } from 'react-toastify'
import Filter from './Filter'
import FunctionButtons from './FunctionButtons'
import { useGetCompanyQuery } from '../redux/companyApiSlice'
import { useSelector, useDispatch } from 'react-redux'

const CompanyGrid = () => {
    const [isReverse, setIsReverse] = useState(false)
    const [statusFilter, setStatusFilter] = useState('All')
    const [searchInput, setSearchInput] = useState('')
    const {companies} = useSelector(state => state.companyReducer);
    const validCompanies = Array.isArray(companies) ? companies : [];
    const dispatch = useDispatch();

    const filteredCompanies = validCompanies.slice()
    .sort((a, b) => {
      if (a.status === 'Rejected' && b.status !== 'Rejected') return 1;
      if (a.status !== 'Rejected' && b.status === 'Rejected') return -1;
      return new Date(b.updatedAt) - new Date(a.updatedAt);
    })
    .filter((company) => {
      if (statusFilter === 'All') return company.status !== 'Rejected';
      return company.status === statusFilter;
    })
    .filter((company) => {
      return company.name.toLowerCase().includes(searchInput.toLowerCase());
    });

    const reversedCompanies = [...filteredCompanies].reverse();
  return (
    <div className="container mx-auto p-6">
      {/* For functions */}
      <div className="flex flex-row justify-between items-center">
      </div>

      {/* Display */}
      {isReverse ? (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 mt-1 items-center">
          {reversedCompanies.length > 0 ? (
            reversedCompanies.map((company) => (
              <SingleCompany key={company.id} company={company} />
            ))
          ) : (
            <div className='absolute top-1/2 left-1/2 inline-block w-1/2 -translate-x-1/2 text-center dark:text-gray-100 text-gray-700 text-2xl'>
              No companies found
            </div>
          )}
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 mt-1 items-center">
          {filteredCompanies.length > 0 ? (
            filteredCompanies.map((company) => (
              <SingleCompany key={company.id} company={company} />
            ))
          ) : (
            <div className='absolute top-1/2 left-1/2 inline-block w-1/2 -translate-x-1/2 text-center dark:text-gray-100 text-gray-700 text-2xl'>
              No companies found
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CompanyGrid;
