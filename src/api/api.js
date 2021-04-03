import * as axios from 'axios';
export let cancel;

//const BASE_API_URL = '/api';
const BASE_APU_URL_CLIENT = 'http://localhost:5000/api';
const CancelToken = axios.CancelToken;
export const CancelTokens = {};

const newInstance = axios.create({
    baseURL: BASE_APU_URL_CLIENT,
    withCredentials: true,
    xsrfCookieName: "mytoken",
    xsrfHeaderName: "csrf-token"
})

export const newAuthAPI = {
    authReg: (name, email, password, password2, acceptance) => newInstance.post(`auth/register`,
        {
            name,
            email,
            password,
            password2,
            acceptance
        }),
    authLogin: (email, password) => newInstance.post(`auth/login`, {
        email,
        password
    }),
    getNewVerificationEmail: () => newInstance.get(`auth/verification/get-activation-email`),
    updateUserStatus: () => newInstance.get(`auth/verification/update-user-status`),
    logout: () => newInstance.get(`auth/logout`),
    initUser: () => newInstance.get(`auth/me`),
    resetPasswordGetCode: (email) => newInstance.post(`auth/password-reset/get-code`, {
        email
    }),
    resetPasswordVerifyCode: (email, password, password2, code) => newInstance.post(`auth/password-reset/verify`, {
        email,
        password,
        password2,
        code
    })
}

export const newUsersAPI = {
    getUsers: (currentPage = 1, pageSize = 10, term = '', userId = '') => newInstance
        .get(`users?page=${currentPage}&count=${pageSize}&term=${term}&friend=${userId}`,
        {cancelToken: new CancelToken((c) => {
            CancelTokens.usersCancel = c;
          })}).catch(reason => console.log(reason)),
    getFriends: (userId, random) => newInstance.get(`users?friend=${userId}&random=${random}`),
    follow: (id) => newInstance.post(`follow/${id}`),
    unfollow: (id) => newInstance.delete(`follow/${id}`),
}

export const newNewsAPI = {
    getNews: (currentPage = 1, pageSize = 10) => newInstance.get(`news?page=${currentPage}&count=${pageSize}`,
    {cancelToken: new CancelToken((c) => {
        CancelTokens.newsCancel = c;
      })}).catch(reason => console.log(reason)),
    addNewPost: (data) => {
        return newInstance.post(`news/wall`, data, {
            headers: { "Content-Type": null }
        })
    }
}


export const newDialogsAPI = {
    getConversations: (currentPage = 1, pageSize = 10) => {
        return newInstance.get(`messages/conversations?page=${currentPage}&count=${pageSize}`,
        {cancelToken: new CancelToken((c) => {
            CancelTokens.dialogsCancel = c;
          })}).catch(reason => console.log(reason))
    },
    getMessages: (currentPage = 1, pageSize = 10, peerId = '') => {
        return newInstance.get(`messages/messages?page=${currentPage}&count=${pageSize}&peerId=${peerId}`)
    }
}

export const newProfileAPI = {
    getProfile: (id) => newInstance.get(`profile/${id}`),
    getPosts: (id, currentPage = 1, pageSize = 10) => newInstance.get(`news/wall/${id}?page=${currentPage}&count=${pageSize}`,
    {cancelToken: new CancelToken((c) => {
        CancelTokens.postsCancel = c;
      })}).catch(reason => console.log(reason)),
    getPhotos: (id, currentPage = 1, pageSize = 10) => newInstance.get(`profile/photos/${id}?page=${currentPage}&count=${pageSize}`,{cancelToken: new CancelToken((c) => {
        CancelTokens.photosCancel = c;
      })}).catch(reason => console.log(reason)),
    updatePhoto: (file) => newInstance.put(`profile/photo`, file),
    updateStatus: (newStatus) => newInstance.put(`profile/status`, { newStatus }),
    updateProfile: (profile) => newInstance.put(`profile`, profile),
    addNewPhotos: (data) => newInstance.post(`profile/photos`, data, {
        headers: { "Content-Type": null }
    })
}