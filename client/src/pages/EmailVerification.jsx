import React from 'react'

const EmailVerification = () => {
  return (
    <div className='screen p-8'>

    <main className="relative isolate min-h-full">
        <div className="mx-auto max-w-7xl px-6 py-32 text-center sm:py-40 lg:px-8">
            <p className="text-base/8 font-semibold text-white">Email Verified</p>
            <h1 className="mt-4 text-balance text-5xl font-semibold tracking-tight text-white sm:text-7xl">
            Thank you for verifying your email!
            </h1>
            <p className="mt-6 text-pretty text-lg font-medium text-white/70 sm:text-xl/8">
            You are now able to share posts and add comments.
            </p>
            <p className="mt-6 text-pretty text-lg font-medium text-white/70 sm:text-xl/8">
            Please close this tab and go back to our website to continue.
            </p>
        </div>
    </main>
    </div>
  )
}

export default EmailVerification
