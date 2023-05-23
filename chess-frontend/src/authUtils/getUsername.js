import { store } from "../store/index";

const authUtils = {
    getUsername: () => {
        return store.getState().user.username
    }
}

export default authUtils