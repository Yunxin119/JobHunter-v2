import React, {useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setCredential } from '../redux/authReducer'
import { useRegisterMutation } from '../redux/userApiSlice'

const Register = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [username, setUsername] = useState('')
    const [gender, setGender] = useState('')
    const [role, setRole] = useState('')
    const [register, { isLoading, error }] = useRegisterMutation()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const submitHandler = async (e) => {
        e.preventDefault();
        const res = await register({ email, password, username, confirmPassword, gender, role }).unwrap();
        console.log(res);
        dispatch(setCredential(res));
        navigate('/')
    }
  return (
    <div className="flex h-screen p-4 items-center justify-center">
        <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
            <div className='bg-gray-450 w-full p-6 rounded-md shadow-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
                {/* Title */}
                <h1 className='text-3xl font-bold text-center text-gray-600'>
                    Register
                    <span className='text-blue-600'>OfferHunter</span>    
                </h1>
                {/* Form */}
                <form className='flex flex-col p-2 mt-3' onSubmit={submitHandler}>
                    {/* Form: Username */}
                    <label className='label py-2'>
                        <span>Username</span>
                    </label>
                    <input type="text"
                        placeholder="Who goes there?"
                        class="input"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    {/* Form: Email */}
                    <label className='label py-2'>
                        <span>Email</span>
                    </label>
                    <input type="email" 
                        placeholder="Who goes there?" 
                        class="input"
                        value={email}
                        onChange = {(e) => setEmail(e.target.value)}
                    />
                    {/* Form: Password */}
                    <label className='label py-2'>
                        <span>Password</span>
                    </label>
                    <input 
                        type="password" 
                        placeholder="Shh... it’s a secret" 
                        class="input" 
                        value={password}
                        onChange={(e)=> setPassword(e.target.value)}
                    />
                    {/* Form: Password */}
                    <label className='label py-2'>
                        <span>Confirm Password</span>
                    </label>
                    <input 
                        type="password" 
                        placeholder="Shh... it’s a secret" 
                        class="input" 
                        value={confirmPassword}
                        onChange={(e)=> setConfirmPassword(e.target.value)}
                    />
                    {/* Form: Gender */}
                    <label className='label py-2'>
                        <span>Gender</span>
                    </label>
                    <select
                        className="input"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        required
                    >
                        <option value="" disabled>Select Gender</option>
                        <option value="female">Female</option>
                        <option value="male">Male</option>
                        <option value="other">Do not wish to answer</option>
                    </select>
                    {/* Form Role */}
                    <label className='label py-2'>
                        <span>Role</span>
                    </label>
                    <select
                        className="input"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                    >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                        <option value="superuser">Superuser</option>
                    </select>
                    {/* Form: Register direction */}
                    <div className='p-2 items-center justify-center'>
                        <Link to='/login' className='text-blue-400 hover:text-blue-700'>
                          Already have an account? 
                        </Link>
                    </div>
                    {/* Form: Submit */}
                    <button
                      type="submit"
                      className="rounded-full bg-blue-600 mt-2 px-4 py-2.5 text-md font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Register
                    </button>
                </form>
            </div>
        </div>
      
    </div>
  )
}

export default Register
