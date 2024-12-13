import React, { useEffect, useState } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { useVerifyUserEmailMutation } from '../redux/userApiSlice';
import { toast } from 'react-toastify';
import { logout } from '../redux/authReducer';
import { useLogoutMutation } from '../redux/userApiSlice';
import { useDispatch } from 'react-redux';

const EmailVerification = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [verifyUserEmail] = useVerifyUserEmailMutation();
    const [verificationStatus, setVerificationStatus] = useState('loading'); // 'loading', 'success', 'error'
    console.log("Verification token:", searchParams.get('token'));
    const [logoutUser, {isLoading}] = useLogoutMutation();
    const dispatch = useDispatch();

    useEffect(() => {
        const verifyEmail = async () => {
            const token = searchParams.get('token');

            if (!token) {
                setVerificationStatus('error');
                toast.error('Verification token is missing.');
                return;
            }

            try {
                await verifyUserEmail({ token }).unwrap();
                setVerificationStatus('success');
                toast.success('Email verified successfully.');
                await logoutUser();
                dispatch(logout())
            } catch (error) {
                console.error('Error during verification:', error);
                setVerificationStatus('error');
                toast.error(
                    error?.data?.msg || 'An error occurred while verifying the email.'
                );
            }
        };

        verifyEmail();
    }, [searchParams, verifyUserEmail]);

    return (
        <div className="screen p-8">
            <main className="relative isolate min-h-full">
                <div className="mx-auto max-w-7xl px-6 py-32 text-center sm:py-40 lg:px-8">
                    {verificationStatus === 'loading' && (
                        <h1 className="mt-4 text-balance text-5xl font-semibold tracking-tight text-white sm:text-7xl">
                            Verifying your email...
                        </h1>
                    )}

                    {verificationStatus === 'success' && (
                        <>
                            <p className="text-base/8 font-semibold text-white">Email Verified</p>
                            <h1 className="mt-4 text-balance text-5xl font-semibold tracking-tight text-white sm:text-7xl">
                                Thank you for verifying your email!
                            </h1>
                            <p className="mt-6 text-pretty text-lg font-medium text-white/70 sm:text-xl/8">
                                You are now able to share posts and add comments.
                            </p>
                            <Link to="/login" className="mt-6 text-pretty text-lg font-medium text-white/70 sm:text-xl/8">
                                Login to your account
                            </Link>
                        </>
                    )}

                    {verificationStatus === 'error' && (
                        <>
                            <p className="text-base/8 font-semibold text-red-500">Verification Failed</p>
                            <h1 className="mt-4 text-balance text-5xl font-semibold tracking-tight text-red-500 sm:text-7xl">
                                Oops! Something went wrong.
                            </h1>
                            <p className="mt-6 text-pretty text-lg font-medium text-red-300 sm:text-xl/8">
                                We couldn't verify your email. The link might have expired or is invalid.
                            </p>
                        </>
                    )}
                </div>
            </main>
        </div>
    );
};

export default EmailVerification;
