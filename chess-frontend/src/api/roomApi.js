import axiosClient from "./axiosClient"

export const roomApi = {
    createRoom: async () => {
        return await axiosClient.post('rooms/create')
    },
    joinRoom: async (params) => {
        return await axiosClient.post('rooms/join', params)
    }
}