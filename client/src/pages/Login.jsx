import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setCredential } from '../redux/authReducer'
import { useNavigate } from 'react-router-dom'
import { useLoginMutation } from '../redux/userApiSlice'
import { toast } from 'react-toastify'

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [login, { isLoading, error }] = useLoginMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await login({ email, password }).unwrap();
            console.log(res);
            dispatch(setCredential(res));
            navigate('/');
        } catch (error) {
            console.error("Login error:", error);
            toast.error(error?.data?.msg || 'Failed to login');
        }
    };

  return (
    <div className="flex h-screen p-4 items-center justify-center">
        <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
            <div className='bg-gray-450 w-full p-6 rounded-md shadow-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
                {/* Title */}
                <h1 className='text-3xl font-bold text-center text-gray-200'>
                    Login
                    <span className='text-blue-600'>
                        JobHunter</span>    
                </h1>
                {/* Form */}
                <form className='flex flex-col p-2 mt-2' onSubmit={submitHandler}>
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
                    {/* Form: Register direction */}
                    <div className='py-2 items-center justify-center'>
                        <Link to='/register' className='text-white'>
                            New here? <span className='text-blue-600'>Let's get you started.</span>
                        </Link>
                    </div>
                    {/* Form: Submit */}
                    <button
                      type="submit"
                      className="rounded-full bg-blue-600 mt-2 px-4 py-2.5 text-md font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Login
                    </button>
                </form>
            </div>
        </div>
      
    </div>
  )
}

export default Login
