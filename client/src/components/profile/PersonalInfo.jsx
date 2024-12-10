import { MdEdit } from 'react-icons/md';
import { FaCheck } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../redux/tempUserReducer';
import { useGetProfileQuery, useUpdateProfileMutation, useSendVerificationEmailMutation } from '../../redux/userApiSlice';
import { toast } from 'react-toastify';
import { setCredential } from '../../redux/authReducer';

export default function PersonalInfo({ isCurrentUser, user }) {
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.authReducer.userInfo);
    const { data: profileUser, refetch } = useGetProfileQuery(user._id);
    const [updateProfile, { isLoading }] = useUpdateProfileMutation();
    const [sendVerificationEmail] = useSendVerificationEmailMutation();
    const [username, setUsername] = useState(user.username);
    const [email, setEmail] = useState(user.email);
    const [password, setPassword] = useState('');
    const [gender, setGender] = useState(user.gender);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState(user.role || "user");
    const [editProfile, setEditProfile] = useState(false);
    const [isEmailSent, setIsEmailSent] = useState(false);
    const [showVerification, setShowVerification] = useState(isCurrentUser && currentUser?.role === "user" && role === "superuser" && profileUser?.isVerfified === false);
    const [showEmailVerified, setShowEmailVerified] = useState(isCurrentUser && profileUser?.isVerified);
    
    useEffect(() => {
        setShowVerification(isCurrentUser && !currentUser?.isVerified && role === "superuser" & currentUser?.role === "user");
    }, [role, currentUser, isCurrentUser]);

    useEffect(() => {
        refetch();
        setShowEmailVerified(isCurrentUser && profileUser?.isVerified);
    }, []);

    const handleEditProfile = async () => {
        if (!editProfile) {
            setEditProfile(true);
        } else {
            if (password !== confirmPassword) {
                toast.error('Passwords do not match');
                return;
            }
            try {
                if (role === "superuser" && !user.isVerified) {
                    toast.error('You need to verify your email before becoming a Superuser');
                    return;
                }

                const res = await updateProfile({ id: user._id, username, email, role, password, confirmPassword, gender }).unwrap();
                toast.success('Profile updated');
                setEditProfile(false);

                if (isCurrentUser) {
                    dispatch(setCredential(res));
                } else {
                    dispatch(updateUser(res));
                }
            } catch (error) {
                toast.error('Failed to update profile');
                console.error('Error updating profile:', error);
            }
        }
    };

    const handleVerifyEmail = async () => {
        try {
            await sendVerificationEmail({ userId: currentUser?._id, token: currentUser?.token }).unwrap();
            toast.success('Verification email sent');
            setIsEmailSent(true);
        } catch (error) {
            toast.error('Failed to send verification email');
            console.error('Error sending verification email:', error);
        }
    };

    return (
        <div className="w-[60%] shadow sm:rounded-lg">
            <div className="px-4 py-6 sm:px-6">
                <div className="flex flex-row items-center justify-between">
                    <h3 className="text-base font-semibold prime-text">User Information</h3>
                    {(currentUser?.role === "admin" || isCurrentUser) && (
                        <button
                            type="button"
                            className={`rounded-md text-sm ${
                                !editProfile ? "text-blue-500 hover:text-blue-400" : "text-gray-500 hover:text-gray-400"
                            }`}
                            onClick={handleEditProfile}
                        >
                            {editProfile ? <FaCheck /> : <MdEdit />}
                        </button>
                    )}
                </div>
                <p className="mt-1 max-w-2xl text-sm/6 text-gray-500">Personal details and application stats.</p>
            </div>
            <div className="border-t border-gray-100">
                <dl className="divide-y divide-gray-100">
                    <div className="px-4 py-6 sm:grid sm:grid-cols-4 sm:gap-2 sm:px-6">
                        <dt className="text-sm font-medium prime-text">Username</dt>
                        <dd className="mt-1 text-sm sec-text sm:col-span-2">
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
                    { isCurrentUser && (
                        <div className="px-4 py-6 sm:grid sm:grid-cols-4 sm:gap-2 sm:px-6">
                            <dt className="text-sm font-medium prime-text">Email address</dt>
                            <dd className="mt-1 text-sm sec-text sm:col-span-2">
                                {user.email}
                                {/* {editProfile ? (
                                    <input
                                        className="form-control profile-input"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                ) : (
                                    user.email
                                )} */}
                            </dd>
                        </div>
                    )}

                    <div className="px-4 py-6 sm:grid sm:grid-cols-4 sm:gap-2 sm:px-6">
                        <dt className="text-sm font-medium prime-text">Role</dt>
                        <dd className="mt-1 text-sm sec-text sm:col-span-2">
                            {editProfile ? (
                                <div className={showEmailVerified || showVerification ? "flex flex-row gap-3 items-center": ""}>
                                    <select
                                        className="form-control profile-input"
                                        value={role}
                                        onChange={(e) => setRole(e.target.value)}
                                    >
                                        <option value="user">User</option>
                                        <option value="superuser">Superuser</option>
                                    </select>

                                    {/* Email Verified Status */}
                                    {showEmailVerified && (
                                        <span className="text-gray-500 flex flex-row items-center gap-1">
                                            <p>Email Verified</p>
                                            <FaCheck className="text-green-400 text-lg" />
                                        </span>
                                    )}

                                    {/* Verify Email Button */}
                                    {showVerification?  (
                                        <button
                                            className={`ml-2 h-9 ${isEmailSent ? "btn-disable" : "btn-primary"}`}
                                            onClick={handleVerifyEmail}
                                            disabled={isEmailSent}
                                        >
                                            Verify Email
                                        </button>
                                    ) : (
                                        null
                                    )}
                                </div>
                            ) : (
                                <span>{user.role}</span>
                            )}
                        </dd>
                    </div>

                    <div className="px-4 py-6 sm:grid sm:grid-cols-4 sm:gap-2 sm:px-6">
                        <dt className="text-sm font-medium prime-text">Gender</dt>
                        <dd className="mt-1 text-sm sec-text sm:col-span-2">
                            {editProfile ? (
                                <select
                                    className="form-control profile-input"
                                    value={gender}
                                    onChange={(e) => {
                                        setGender(e.target.value);
                                        console.log(e.target.value);
                                    }}
                                >
                                    <option value="female">female</option>
                                    <option value="male">male</option>
                                    <option value="other">Do not wish to answer</option>
                                </select>
                            ) : (
                                user.gender
                            )}
                        </dd>
                    </div>
                    {isCurrentUser && (
                        <div className="px-4 py-6 sm:grid sm:grid-cols-4 sm:gap-2 sm:px-6">
                            <dt className="text-sm font-medium prime-text">Password</dt>
                            <dd className="mt-1 text-sm sec-text sm:col-span-2 flex">
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
                        <dt className="text-sm font-medium prime-text">About</dt>
                        <dd className="mt-1 text-sm sec-text sm:col-span-2">
                            {user.about || 'No information provided'}
                        </dd>
                    </div>
                </dl>
            </div>
        </div>
    );
}
