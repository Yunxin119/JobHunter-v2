import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { useSelector } from 'react-redux'

const Home = () => {
  const { userInfo } = useSelector((state) => state.authReducer)
  return (
    <div className='w-screen h-screen flex flex-col overflow-hidden bg-gray-200 dark:bg-gray-800 dark:bg-opacity-15 bg-opacity-15'>
      <Navbar />
      <div className="relative isolate px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center mx-auto max-w-2xl py-40 sm:py-32 lg:py-48">
          <div className="text-center">
            <h1 className="text-balance text-5xl lg:text-7xl font-semibold tracking-tight text-gray-900 dark:text-gray-200 sm:text-5xl">
              Discover Jobs & Track Applications
            </h1>
            <p className="mt-8 text-pretty text-lg font-medium text-gray-800 dark:text-gray-300 text-opacity-80 sm:text-lg">
              JobHunter makes it effortless to stay on top of your job applications. Search for opportunities, track every application, interview, and offer, and connect with others to share your experiences. Discuss your thoughts on specific roles, offer guidance, and help others land their dream jobs—while staying organized on your own career journey.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              { userInfo ? (
                <Link
                  to="/search"
                  className="rounded-xl bg-indigo-600 px-3.5 py-2.5 text-md font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Search for jobs
                </Link>
              ) : (
                <Link
                  to="/register"
                  className="rounded-xl bg-indigo-600 px-3.5 py-2.5 text-md font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign up for free
                </Link>
              )}
            </div>
          </div>
        </div>
        </div>
    </div>
  )
}

export default Home
