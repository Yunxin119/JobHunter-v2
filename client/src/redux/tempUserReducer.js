import { createSlice } from '@reduxjs/toolkit'
import { users } from '../sampleData/users'
const initialState = {
    users: users,
}

const tempUserSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        addUser: (state, action) => {
            state.users.push(action.payload)
        },
        deleteUser: (state, action) => {
            state.users = state.users.filter(user => user.id !== action.payload)
        },
        updateUser: (state, action) => {
            const index = state.users.findIndex(user => user.id === action.payload.id)
            state.users[index] = action.payload
        }
    }
})

export const { addUser, deleteUser, updateUser } = tempUserSlice.actions
export default tempUserSlice.reducer