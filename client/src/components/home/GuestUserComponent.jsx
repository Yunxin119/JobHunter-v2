import React, { useEffect, useState } from "react";
import { useGetAllUsersQuery } from "../../redux/userApiSlice";
import { Link } from "react-router-dom";

const GuestUserComponent = () => {
    const { data, isLoading, error } = useGetAllUsersQuery();
    const validUsers = data?.users || [];
    console.log(validUsers);
    const [displayUsers, setDisplayUsers] = useState([]);
    const [startIdx, setStartIdx] = useState(0);

    // Initialize displayed posts
    useEffect(() => {
        if (validUsers.length > 0) {
        setDisplayUsers(validUsers.slice(0, 4));
        }
    }, [validUsers]);

    // Handle auto-rotation of posts
    useEffect(() => {
        if (validUsers.length > 1) {
        const interval = setInterval(() => {
            setStartIdx((prev) => (prev + 1) % validUsers.length);
        }, 1500);

        return () => clearInterval(interval); // Cleanup interval on unmount
        }
    }, [validUsers]);

    // Update displayed posts based on start index
    useEffect(() => {
        if (validUsers.length > 0) {
        const extendedUsers = validUsers.concat(validUsers.slice(0, 3));
        setDisplayUsers(extendedUsers.slice(startIdx, startIdx + 4));
        }
    }, [startIdx, validUsers]);

    // Handle loading and error states
    if (isLoading) {
        return <div className="text-white">Loading...</div>;
    }

    if (error) {
        return <div className="text-red-500">Error fetching posts data.</div>;
    }

  return (
    <>
      {validUsers.length > 0 ? (
        <div className="p-4">
          <aside className="bg-white/30 backdrop-blur-md dark:bg-black/30 sm:w-96 md:w-[400px] lg:overflow-y-auto border-l border-white/5 rounded-lg">
            <header className="flex items-center justify-between border-b border-white/5 px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
              <h2 className="text-base/7 font-semibold label-text">Our Royal Users</h2>
            </header>
            <ul role="list" className="divide-y divide-white/5">
              {displayUsers.map((user) => (
                <li key={user._id} className="px-4 py-4 sm:px-6 lg:px-8">
                  <Link to={`/profile/${user._id}`} className="flex items-center gap-x-3">
                    <img
                      alt=""
                      src={user.profilePic || "/default-avatar.png"}
                      className="size-6 flex-none rounded-full bg-gray-800"
                    />
                    <h3 className="flex-auto truncate text-sm/6 font-semibold label-text">
                      {user.username}
                    </h3>
                  </Link>
                  {/* <Link to={`/details/user/${user._id}`} >
                    <p className="mt-3 truncate text-sm text-gray-500 dark:text-gray-450 py-2">
                        <span className="sec-text ">{user.title}</span>
                    </p>
                  </Link> */}

                </li>
              ))}
            </ul>
          </aside>
        </div>
      ) : (
        <div className="text-gray-400">No posts available.</div>
      )}
    </>
  );
};

export default GuestUserComponent;
