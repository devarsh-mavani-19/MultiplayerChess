import { createSlice } from "@reduxjs/toolkit"

const initState = {
    username: '',
    isLoggedIn: false
}

export const userSlice = createSlice({
    name: "user",
    initialState: initState,
    reducers: {
        loginUser: (state, payload) => {
            state.username = payload.payload.username
            state.isLoggedIn = true
        },
        logoutUser: (state, payload) => {
            state.username = ''
            state.isLoggedIn = false
        }
    }
})

export const { loginUser, logoutUser } = userSlice.actions

export default userSlice.reducer