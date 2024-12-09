import React from 'react'
import { useGetCompanyQuery } from '../../redux/companyApiSlice';

const Stats = ({user, isCurrentUser}) => {
  const { data: companies, isLoading, isError } = useGetCompanyQuery();
  const validCompanies = companies || [];
    const oa = validCompanies.filter((c) => c.status === 'OA').length;
    const interview = validCompanies.filter((c) => c.status === 'Interview1' || c.status === 'Interview2' || c.status==='Interview3').length;
    const rejected = validCompanies.filter((c) => c.status === 'Rejected').length;
    const offer = validCompanies.filter((c) => c.status === 'Offer').length;
  return (
    <>
      <div className='h-full w-1/2 rounded-md flex flex-col items-center justify-between'>
        <img src={user.profilePic} alt="" className='h-32 w-32 rounded-full mb-4'/>
        <div className='flex flex-col items-center justify-center w-full'>
        {isCurrentUser ? (
          <>
          <div className='text-md md:text-lg text-gray-200'>Hi, <span className='font-bold text-blue-600 dark:text-blue-400'>{user.username}</span>!</div>
          <div className='text-md md:text-md text-gray-200'>You have made <span className='text-blue-600 font-bold dark:text-blue-400'>{validCompanies.length}</span> applications</div>
          </>
          
        ) : (
          <div className='text-md md:text-lg text-gray-200'>{user.username} has applied to {validCompanies.length} companies</div>
        )}
        </div>

        <div>
          <div className='grid grid-cols-2 space-x-4'>
            <div className='text-md md:text-lg text-gray-200'>OA</div>
            <div className='text-md md:text-lg sec-text'>{oa} <span className='text-md md:text-lg text-gray-200'>/ {validCompanies.length}</span></div>
          </div>
          <div className='grid grid-cols-2 space-x-4'>
            <div className='text-md md:text-lg text-gray-200'>Interview</div>
            <div className='text-md md:text-lg sec-text'>{interview} <span className='text-md md:text-lg text-gray-200'>/ {validCompanies.length}</span></div>
          </div>
          <div className='grid grid-cols-2 space-x-4'>
            <div className='text-md md:text-lg text-gray-200'>Rejected</div>
            <div className='text-md md:text-lg sec-text'>{rejected} <span className='text-md md:text-lg text-gray-200'>/ {validCompanies.length}</span></div>
          </div>
          <div className='grid grid-cols-2 space-x-4'>
            <div className='text-md md:text-lg text-gray-200'>Offer</div>
            <div className='text-md md:text-lg sec-text'>{offer} <span className='text-md md:text-lg text-gray-200'>/ {validCompanies.length}</span></div>
          </div>
        </div>

      </div>
    </>



  )
}

export default Stats
