import React from 'react'
import Navbar from '../components/Navbar'
import CompanyGrid from '../components/CompanyGrid'

const Dashboard = () => {
  return (
    <div className='w-screen h-screen overflow-y-scroll overflow-x-hidden'>
        <Navbar />
        <CompanyGrid />
    </div>
  )
}

export default Dashboard
