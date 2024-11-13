import { MdEdit } from 'react-icons/md';
import { useState } from 'react';
import { FaCheck } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { updateUser } from '../../redux/tempUserReducer';
export default function PersonalInfo({ isCurrentUser, user }) {
    const dispatch = useDispatch();
    const [username, setUsername] = useState(user.username);
    const [email, setEmail] = useState(user.email);
    const [password, setPassword] = useState(user.password);
    const [editName, setEditName] = useState(false);
    const handleEditUsername = () => {
        if (!username) {
            return;
        }
        dispatch(updateUser({ ...user, username: username }));
        setEditName(false);
    }
    const [editEmail, setEditEmail] = useState(false);
    const handleEditEmail = () => {
        if (!email) {
            return;
        }
        dispatch(updateUser({ ...user, email: email }));
        setEditEmail(false);
    }
    const [editPassword, setEditPassword] = useState(false);
    const handleEditPassword = () => {
        if (!password) {
            return;
        }
        dispatch(updateUser({ ...user, password: password }));
        setEditPassword(false);
    }
  return (
  <div className="w-[60%] shadow sm:rounded-lg">
        <div className="px-4 py-6 sm:px-6">
        <h3 className="text-base/7 font-semibold text-gray-900">User Information</h3>
        <p className="mt-1 max-w-2xl text-sm/6 text-gray-500">Personal details and application stats.</p>
        </div>
        <div className="border-t border-gray-100">
            <dl className="divide-y divide-gray-100">
                <div className="px-4 py-6 sm:grid sm:grid-cols-4 sm:gap-2 sm:px-6">
                    <dt className="text-sm font-medium text-gray-900">Username</dt>
                    { !editName ? (
                        <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{user.username}</dd>
                    ) : 
                    ( 
                        <input className="form-control mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0" defaultValue={username} placeholder="Module Name"
                        onChange={(e) => setUsername(e.target.value)}/>
                    )}
                    {isCurrentUser && (
                        !editName ? (
                            <dd className="text-right sm:col-span-1">
                                <button
                                    type="button"
                                    className="rounded-md font-sm text-indigo-600 hover:text-indigo-500"
                                    onClick={() => setEditName(true)}
                                >
                                    <MdEdit />
                                </button>
                            </dd>
                        ) : (
                            <dd className="text-right sm:col-span-1">
                                <button
                                    type="button"
                                    className="rounded-md font-sm text-indigo-600 hover:text-indigo-500"
                                    onClick={handleEditUsername}
                                >
                                    <FaCheck />
                                </button>
                            </dd>
                        )
                    )}
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-4 sm:gap-2 sm:px-6">
                    <dt className="text-sm font-medium text-gray-900">Email address</dt>
                    { !editEmail ? (
                        <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{user.email}</dd>
                    ) : 
                    ( 
                        <input className="form-control mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0" defaultValue={email} placeholder="Module Name"
                        onChange={(e) => setEmail(e.target.value)}/>
                    )}
                    
                    {isCurrentUser && (
                        !editEmail ? (
                            <dd className="text-right sm:col-span-1">
                                <button
                                    type="button"
                                    className="rounded-md font-sm text-indigo-600 hover:text-indigo-500"
                                    onClick={() => setEditEmail(true)}
                                >
                                    <MdEdit />
                                </button>
                            </dd>
                        ) : (
                            <dd className="text-right sm:col-span-1">
                                <button
                                    type="button"
                                    className="rounded-md font-sm text-indigo-600 hover:text-indigo-500"
                                    onClick={handleEditEmail}
                                >
                                    <FaCheck />
                                </button>
                            </dd>
                        )
                    )}
                </div>
                { isCurrentUser && (
                    <div className="px-4 py-6 sm:grid sm:grid-cols-4 sm:gap-2 sm:px-6">
                        <dt className="text-sm font-medium text-gray-900">Password</dt>
                        { !editPassword ? (
                            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">**********</dd>
                        ) : 
                        ( 
                            <input className="form-control mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0" defaultValue={password} placeholder="Module Name"
                            onChange={(e) => setPassword(e.target.value)}/>
                        )}
                        { !editPassword ? (
                            <dd className="text-right sm:col-span-1">
                                <button 
                                type="button" 
                                className="rounded-md font-sm text-indigo-600 hover:text-indigo-500"
                                onClick={() => setEditPassword(true)}
                                >
                                    <MdEdit />
                                </button>
                            </dd>
                        ) : (
                            <dd className="text-right sm:col-span-1">
                                <button type="button" 
                                    onClick={handleEditPassword}
                                    className="rounded-md font-sm text-indigo-600 hover:text-indigo-500"
                                >
                                    <FaCheck />
                                </button>
                            </dd>
                        )}
                    </div>
                )}
                <div className="px-4 py-6 sm:grid sm:grid-cols-4 sm:gap-2 sm:px-6">
                    <dt className="text-sm font-medium text-gray-900">About</dt>
                    <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                        {user.about || 'No information provided'}
                    </dd>
                    {isCurrentUser && (
                        <dd className="text-right sm:col-span-1">
                            <button type="button" className="rounded-md font-sm text-indigo-600 hover:text-indigo-500">
                                <MdEdit />
                            </button>
                        </dd>
                    )}
                </div>
            </dl>
        </div>
    </div>
  )
}
