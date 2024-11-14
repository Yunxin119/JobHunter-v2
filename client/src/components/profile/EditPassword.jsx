import React, { useState } from 'react'
import { MdEdit } from 'react-icons/md'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
const EditPassword = ({onSave, onCancel }) => {
    // MARK: State
    const [isOpen, setIsOpen ] = useState(false)
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // MARK: Dispatch
    const dispatch = useDispatch();
    const handleEdit = (e) => {
        e.preventDefault();
        if (!password || !confirmPassword) {
            toast.error('Please fill out all fields');
            return;
        }
        if (password !== confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }
        onSave(password, confirmPassword);
        setIsOpen(false);
    }
  return (
    <div>
      {/* Edit Button */}
      <button
        className="btn"
        onClick={() => setIsOpen(true)}
      >
        <MdEdit />
      </button>
      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
          <div className="edit">
            <h2 className="text-2xl font-bold mb-4 dark:text-gray-200">Change Password</h2>
            <form onSubmit={handleEdit} className='flex flex-col p-2'>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">New Password</span>
                </label>
                <input
                  type="password"
                  className="input w-full"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="form-control mt-1">
                <label className="label">
                  <span className="label-text">Confirm Password</span>
                </label>
                <input
                  type="password"
                  className="input w-full"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
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

export default EditPassword
