import { newAuthAPI } from "../../api/api";
import { setUser } from "./auth-reducer";
import { setUnreadConvertastion } from "./reducer";

export const setUserRegThunk = (name, email, password, password2, acceptance) => async (dispatch) => {
    const response = await newAuthAPI.authReg(name, email, password, password2, acceptance);
    if (response.data.success) {
        dispatch(setUser(response.data.userId, response.data.userRole, response.data.userStatus, false));
    }
    return response.data
}

export const updateUserStatusThunk = () => async (dispatch) => {
    const response = await newAuthAPI.updateUserStatus();
    if (!response.data.success) {
        localStorage.clear();
        const logout = await newAuthAPI.logout();
        if(logout.data.success) {
            return response.data
        }
    }
    else {
        dispatch(setUser(response.data.userId, response.data.userRole, response.data.userStatus, true));
        return response.data
    }
}

export const unreadConversationsSubcribeThunk = data => dispatch => {
    dispatch(setUnreadConvertastion(data))
}