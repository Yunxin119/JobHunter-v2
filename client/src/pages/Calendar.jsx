import React from 'react'
import Navbar from '../components/Navbar'

const Calendar = () => {
  return (
    <div className='screen dark:bg-gray-800 dark:bg-opacity-15 bg-opacity-15'> 
        <Navbar />
        <div className='absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-300 bg-opacity-20 backdrop-filter backdrop-blur-lg p-5 rounded-xl'>
            Placeholder For Calendar Feature
        </div>
      
    </div>
  )
}

export default Calendar
