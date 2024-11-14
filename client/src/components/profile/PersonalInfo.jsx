import { MdEdit } from 'react-icons/md';
import { FaCheck } from 'react-icons/fa';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateUser } from '../../redux/tempUserReducer';
import { useUpdateProfileMutation } from '../../redux/userApiSlice';
import { toast } from 'react-toastify';
import { setCredential } from '../../redux/authReducer';

export default function PersonalInfo({ isCurrentUser, user }) {
    const dispatch = useDispatch();
    const [updateProfile, { isLoading }] = useUpdateProfileMutation();
    const [username, setUsername] = useState(user.username);
    const [email, setEmail] = useState(user.email);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [editProfile, setEditProfile] = useState(false);

    const handleEditProfile = async () => {
        if (!editProfile) {
            setEditProfile(true);
        } else {
            if (password !== confirmPassword) {
                toast.error('Passwords do not match');
                return;
            }
            try {
                const res = await updateProfile({ id: user._id, username, email, password, confirmPassword }).unwrap();
                toast.success('Profile updated');
                setEditProfile(false);
                dispatch(setCredential(res));
            } catch (error) {
                toast.error('Failed to update profile');
                console.error('Error updating profile:', error);
            }
        }
    };

    return (
        <div className="w-[60%] shadow sm:rounded-lg">
            <div className="px-4 py-6 sm:px-6">
                <div className="flex flex-row items-center justify-between">
                    <h3 className="text-base font-semibold text-gray-900">User Information</h3>
                    <button
                        type="button"
                        className={`rounded-md text-sm ${!editProfile ? 'text-blue-500 hover:text-blue-400' : 'text-gray-500 hover:text-gray-400'}`}
                        onClick={handleEditProfile}
                    >
                        {editProfile ? <FaCheck /> : <MdEdit />}
                    </button>
                </div>
                <p className="mt-1 max-w-2xl text-sm/6 text-gray-500">Personal details and application stats.</p>
            </div>
            <div className="border-t border-gray-100">
                <dl className="divide-y divide-gray-100">
                    <div className="px-4 py-6 sm:grid sm:grid-cols-4 sm:gap-2 sm:px-6">
                        <dt className="text-sm font-medium text-gray-900">Username</dt>
                        <dd className="mt-1 text-sm text-gray-700 sm:col-span-2">
                            {editProfile ? (
                                <input
                                    className="form-control profile-input"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            ) : (
                                user.username
                            )}
                        </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-4 sm:gap-2 sm:px-6">
                        <dt className="text-sm font-medium text-gray-900">Email address</dt>
                        <dd className="mt-1 text-sm text-gray-700 sm:col-span-2">
                            {editProfile ? (
                                <input
                                    className="form-control profile-input"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            ) : (
                                user.email
                            )}
                        </dd>
                    </div>
                    {isCurrentUser && (
                        <div className="px-4 py-6 sm:grid sm:grid-cols-4 sm:gap-2 sm:px-6">
                            <dt className="text-sm font-medium text-gray-900">Password</dt>
                            <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 flex">
                                {editProfile ? (
                                    <div className='flex flex-col gap-2'>
                                        <input
                                            className="form-control profile-input border-[1px] border-white"
                                            type="password"
                                            placeholder="New Password"
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                        <input
                                            className="form-control profile-input border-[1px] border-white"
                                            type="password"
                                            placeholder="Confirm Password"
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                        />
                                    </div>
                                ) : (
                                    '**********'
                                )}
                            </dd>
                        </div>
                    )}
                    <div className="px-4 py-6 sm:grid sm:grid-cols-4 sm:gap-2 sm:px-6">
                        <dt className="text-sm font-medium text-gray-900">About</dt>
                        <dd className="mt-1 text-sm text-gray-700 sm:col-span-2">
                            {user.about || 'No information provided'}
                        </dd>
                    </div>
                </dl>
            </div>
        </div>
    );
}
