import React, {useState} from 'react'
import { MdEdit } from 'react-icons/md'
import { useDispatch } from 'react-redux'
import { updateUser } from '../redux/tempUserReducer'
import { toast } from 'react-toastify'

const EditSingleUser = ({user}) => {
    const [isOpen, setIsOpen ] = useState(false)
    const [username, setUsername] = useState(user.username || '');
    const [isAdmin, setIsAdmin] = useState(user.isAdmin || '');
    const [email, setEmail] = useState(user.email || '');
    const [password, setPassword] = useState(user.password || '');
    const dispatch = useDispatch();

    const handleEdit = async (e) => {
        e.preventDefault();
        if (!username || !isAdmin || !email || !password) {
            toast.error('Please fill out all fields');
            return;
        }
        try {
            const updatedUser = {
                id: user.id,
                username,
                isAdmin,
                email,
                password,
            };
            dispatch(updateUser(updatedUser));
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
                    className="select select-bordered w-full"
                    value={isAdmin}
                    onChange={(e) => setIsAdmin(e.target.value)}
                    >
                    <option value={true}>Admin</option>
                    <option value={false}>User</option>
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
