import React from 'react'

const Stats = ({user, isCurrentUser}) => {
    const companies = user.applications; 
    const validCompanies = Array.isArray(companies) ? companies : [];
    const status = validCompanies.map((company) => company.status);
    const oa = status.filter((s) => s === 'OA').length;
    const interview = status.filter((s) => s === 'Interview1').length + status.filter((s) => s === 'Interview2').length + status.filter((s) => s === 'Interview3').length;
    const rejected = status.filter((s) => s === 'Rejected').length;
    const offer = status.filter((s) => s === 'Offer').length;
  return (
    <>
      <div className='h-full w-1/2 rounded-md flex flex-col items-center justify-between'>
        <div className='text-2xl md:text-3xl text-gray-200 font-bold mb-3'>Img</div>
        <div className='flex flex-col items-center justify-center w-full'>
        {isCurrentUser ? (
          <>
          <div className='text-md md:text-lg text-gray-200'>Hi, <span className='font-bold text-blue-600 dark:text-blue-400'>{user.username}</span>!</div>
          <div className='text-md md:text-md text-gray-200'>You have made <span className='text-blue-600 font-bold dark:text-blue-400'>{companies.length}</span> applications</div>
          </>
          
        ) : (
          <div className='text-md md:text-lg text-gray-200'>{user.username} has applied to {companies.length} companies</div>
        )}
        </div>

        <div>
          <div className='grid grid-cols-2 space-x-4'>
            <div className='text-md md:text-lg text-gray-200'>OA</div>
            <div className='text-md md:text-lg text-gray-700'>{oa} <span className='text-md md:text-lg text-gray-200'>/ {companies.length}</span></div>
          </div>
          <div className='grid grid-cols-2 space-x-4'>
            <div className='text-md md:text-lg text-gray-200'>Interview</div>
            <div className='text-md md:text-lg text-gray-700'>{interview} <span className='text-md md:text-lg text-gray-200'>/ {companies.length}</span></div>
          </div>
          <div className='grid grid-cols-2 space-x-4'>
            <div className='text-md md:text-lg text-gray-200'>Rejected</div>
            <div className='text-md md:text-lg text-gray-700'>{rejected} <span className='text-md md:text-lg text-gray-200'>/ {companies.length}</span></div>
          </div>
          <div className='grid grid-cols-2 space-x-4'>
            <div className='text-md md:text-lg text-gray-200'>Offer</div>
            <div className='text-md md:text-lg text-gray-700'>{offer} <span className='text-md md:text-lg text-gray-200'>/ {companies.length}</span></div>
          </div>
        </div>

      </div>
    </>



  )
}

export default Stats
