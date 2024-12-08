import React, {useState} from 'react'
import { MdEdit } from 'react-icons/md'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { useUpdateProfileMutation } from '../redux/userApiSlice'

const EditSingleUser = ({user}) => {
    const [isOpen, setIsOpen ] = useState(false)
    const [username, setUsername] = useState(user.username || '');
    const [role, setRole] = useState(user.role);
    const [gender, setGender] = useState(user.gender);
    const [email, setEmail] = useState(user.email || '');
    const [updateUser, {isLoading}] = useUpdateProfileMutation();

    const handleEdit = async (e) => {
        e.preventDefault();
        if (!username || !role || !email || !gender) {
            toast.error('Please fill out all fields');
            return;
        }
        try {
            const updatedUser = {
                id: user._id,
                username,
                role,
                gender,
                email,
            };
            await updateUser(updatedUser).unwrap();
            toast.success('User updated successfully!');
            setIsOpen(false);
        } catch (error) {
            console.error(error);
        }
    }

  return (
    <div>
      {/* Edit Button */}
      <button
        type="button"
        className="bg-transparent hover:bg-gray-300 hover:bg-opacity-15 p-1 rounded-full mt-1"
        onClick={() => setIsOpen(true)}
        >
            <MdEdit className='sec-label-text hover:label-text'/>
      </button>
      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
          <div className="edit">
            <h2 className="text-2xl font-bold mb-4 dark:text-gray-200">Edit User</h2>
            <form onSubmit={handleEdit} className='flex flex-col p-2'>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Username</span>
                </label>
                <input
                  type="text"
                  className="input w-full"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div className="form-control mt-1">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="text"
                  className="input w-full"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className='flex flex-row justify-between gap-2'>
                <div className="form-control mt-1 w-full">
                    <label className="label">
                    <span className="label-text">Role</span>
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
                </div>
              </div>
              <div className='flex flex-row justify-between gap-2'>
                <div className="form-control mt-1 w-full">
                    <label className="label">
                    <span className="label-text">Gender</span>
                    </label>
                    <select
                        className="input"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                    >
                        <option value="female">Female</option>
                        <option value="male">Male</option>
                        <option value="other">Other</option>
                    </select>
                </div>
              </div>

              <div className="flex justify-center mt-6">
                <button
                  type="button"
                  className="btn btn-secondary mr-2"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`btn btn-primary`}
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default EditSingleUser
