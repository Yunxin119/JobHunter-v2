import React, {useState} from 'react'
import Navbar from '../../components/Navbar'
import { MdEdit } from "react-icons/md";
import { IoMdTrash } from "react-icons/io";
import EditSingleUser from '../../components/EditSingleUser';
import { useDispatch, useSelector } from 'react-redux';
// import { deleteUser } from '../../redux/tempUserReducer';
import { useGetAllUsersQuery, useDeleteUserMutation } from '../../redux/userApiSlice';
import { toast } from 'react-toastify';
const EditUsers = () => {
    const { data: usersList, isLoading, refetch } = useGetAllUsersQuery();
    const users = usersList?.users || [];
    console.log(usersList);
    const [deleteUser, {isLoading: isDeleting}] = useDeleteUserMutation();
    const handleDeleteUser = async(userId) => {
        const confirm = window.confirm('Are you sure you want to delete this user? This action cannot be undone.');
        if (!confirm) return;
        try {
            await deleteUser(userId);
            toast.success('User deleted successfully');
            refetch();
        } catch (error) {
            console.log(error);
            toast.error('Failed to delete user');
        }
    }
    
  return (
    <div className='screen'>
        <Navbar/>
        <div className='rounded-xl relative w-2/3 top-[5%] left-1/2 -translate-x-1/2 p-5 blur-window'>
            <ul role="list" className="divide-y divide-gray-100">
                {users.map((user) => (
                    <li key={user._id} className="flex justify-between gap-x-6 py-5">
                        <div className="flex min-w-0 gap-x-4">
                            <img alt="" src={user.profilePic} className="size-12 flex-none rounded-full bg-gray-50" />
                            <div className="min-w-0 flex-auto">
                                <p className="text-sm/6 font-semibold label-text">{user.username}</p>
                                <p className="mt-1 truncate text-xs/5 sec-label-text">{user.email}</p>
                            </div>
                        </div>
                        <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                            <p className="text-sm/6 label-text">{user.role}</p>
                            <div className='flex flex-row mt-1 items-center gap-x-1 text-md/8'>
                                <EditSingleUser user={user} />
                                <button
                                type="button"
                                className="bg-transparent hover:bg-gray-300 hover:bg-opacity-15 p-1 rounded-full mt-1"
                                onClick={() => handleDeleteUser(user._id)}
                                >
                                    <IoMdTrash className='sec-label-text hover:label-text'/>
                                </button>                                
                            </div>
                        </div>
                    </li>
                ))}
            </ul>     
        </div>
    </div>
  )
}

export default EditUsers
