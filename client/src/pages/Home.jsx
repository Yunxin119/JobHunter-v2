import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { useSelector } from 'react-redux'
import HomeIntro from '../components/home/HomeIntro'
import LoggedInUserComponent from '../components/home/LoggedInUserComponent'
import LoggedInUserPost from '../components/home/LoggedInUserPost'
import GuestUserComponent from '../components/home/GuestUserComponent'

const Home = () => {
  const { userInfo } = useSelector((state) => state.authReducer)
  return (
    <div className='w-screen h-screen flex flex-col md:overflow-hidden sm:overflow-x-hidden bg-gray-200 dark:bg-gray-800 dark:bg-opacity-15 bg-opacity-15'>
      <Navbar />
      <div className="flex sm:flex-col md:flex-row items-center justify-center">
        <div className="p-4">
          <HomeIntro userInfo={userInfo} />
        </div>
        <div>
          {userInfo ? (
            <>
              <LoggedInUserComponent />
              <LoggedInUserPost />
            </>

          ) : (
            <>
              <GuestUserComponent />
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Home
