import axiosClient from "./axiosClient"

export const userApi = {
    registerUsername: (params) => {
        axiosClient.post('users', params)
    }
}