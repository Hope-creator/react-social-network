import * as axios from 'axios';

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        'API-KEY': '65bb7cc5-8d1c-4595-8583-4a11bfe95341'
    }
})

export const usersAPI = {
    getUsers: (currentPage = 1, pageSize = 10, term='', isFriend = false) => instance
        .get(`users?page=${currentPage}&count=${pageSize}&term=${term}&friend=${isFriend}`),
    getFriends: () => instance.get(`users?friend=true&count=100`),
    follow: (id) => instance.post(`follow/${id}`),
    unfollow: (id) => instance.delete(`follow/${id}`)
}

export const authAPI = {
    getAuth: () => instance.get(`auth/me`),
    authLogin: (email, password, captcha = null) => instance.post(`auth/login`, {
        email,
        password,
        captcha
    }),
    authLogout: () => instance.delete(`auth/login`)
}

export const profileAPI = {
    getProfile: (id) => instance.get(`profile/${id}`),
    getStatus: (id) => instance.get(`profile/status/${id}`),
    updateStatus: (status) => instance.put(`profile/status`, { status }),
    updatePhoto: (file) => instance.put(`profile/photo`,file),
    updateProfile: (profile) => instance.put(`profile`,profile)
}

export const securityAPI = {
    getCaptchaUrl: () => { return instance.get(`security/get-captcha-url`)}
}
