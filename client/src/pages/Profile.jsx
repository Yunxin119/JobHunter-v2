import React from 'react'
import Navbar from '../components/Navbar'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import PersonalInfo from '../components/profile/PersonalInfo'
import Page404 from './Page404'
import Stats from '../components/profile/Stats'

const Profile = () => {
  const { userInfo } = useSelector((state) => state.authReducer)
  console.log(userInfo);
  const { users } = useSelector((state) => state.tempUserReducer)
  const { id }= useParams();
  const profileUser = users.find(user => user._id.toString() === id);
  if (!profileUser){
    return <Page404 />
  };
  const isCurrentUser = userInfo?._id.toString() === id;
  return (
    <div className='screen'>
      <Navbar />
      <div className='relative w-[80%] left-1/2 -translate-x-1/2 md:mt-8 sm:mt-5 label-text font-bold md:text-3xl sm:text-2xl'>Profile</div>
      <div className='relative left-1/2 transform -translate-x-1/2 flex flex-row justify-between items-center mt-4 blur-window w-[80%] rounded-xl mb-3'>
        <Stats user={profileUser} isCurrentUser={isCurrentUser}/>
        <PersonalInfo isCurrentUser={isCurrentUser} user={profileUser}/>
        
      </div>

    </div>
  )
}

export default Profile
