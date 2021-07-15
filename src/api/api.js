import * as axios from "axios";
export let cancel;

const BASE_API_URL = "/api";
const CancelToken = axios.CancelToken;
export const CancelTokens = {};

const instance = axios.create({
  baseURL: BASE_API_URL,
  withCredentials: true,
  xsrfCookieName: "mytoken",
  xsrfHeaderName: "csrf-token",
});

export const authApi = {
  authReg: (name, email, password, password2, acceptance) =>
    instance.post(`auth/register`, {
      name,
      email,
      password,
      password2,
      acceptance,
    }),
  authLogin: (email, password) =>
    instance.post(`auth/login`, {
      email,
      password,
    }),
  getNewVerificationEmail: () =>
    instance.get(`auth/verification/get-activation-email`),
  updateUserStatus: () => instance.get(`auth/verification/update-user-status`),
  logout: () => instance.get(`auth/logout`),
  initUser: () => instance.get(`auth/me`),
  resetPasswordGetCode: (email) =>
    instance.post(`auth/password-reset/get-code`, {
      email,
    }),
  resetPasswordVerifyCode: (email, password, password2, code) =>
    instance.post(`auth/password-reset/verify`, {
      email,
      password,
      password2,
      code,
    }),
};

export const usersApi = {
  getUsers: (currentPage = 1, pageSize = 10, term = "", userId = "") =>
    instance
      .get(
        `users?page=${currentPage}&count=${pageSize}&term=${term}&friend=${userId}`,
        {
          cancelToken: new CancelToken((c) => {
            CancelTokens.usersCancel = c;
          }),
        }
      )
      .catch((reason) => console.log(reason)),
  getFriends: (userId, random) =>
    instance.get(`users?friend=${userId}&random=${random}`),
  follow: (id) => instance.post(`follow/${id}`),
  unfollow: (id) => instance.delete(`follow/${id}`),
};

export const newsApi = {
  getNews: (currentPage = 1, pageSize = 10) =>
    instance
      .get(`news?page=${currentPage}&count=${pageSize}`, {
        cancelToken: new CancelToken((c) => {
          CancelTokens.newsCancel = c;
        }),
      })
      .catch((reason) => console.log(reason)),
  addNewPost: (data) => {
    return instance.post(`news/wall`, data, {
      headers: { "Content-Type": null },
    });
  },
};

export const dialogsApi = {
  getConversations: (currentPage = 1, pageSize = 10) => {
    return instance
      .get(`messages/conversations?page=${currentPage}&count=${pageSize}`, {
        cancelToken: new CancelToken((c) => {
          CancelTokens.dialogsCancel = c;
        }),
      })
      .catch((reason) => console.log(reason));
  },
  getMessages: (currentPage = 1, pageSize = 10, peerId = "") => {
    return instance.get(
      `messages/messages?page=${currentPage}&count=${pageSize}&peerId=${peerId}`
    );
  },
};

export const profileApi = {
  getProfile: (id) => instance.get(`profile/${id}`),
  getPosts: (id, currentPage = 1, pageSize = 10) =>
    instance
      .get(`news/wall/${id}?page=${currentPage}&count=${pageSize}`, {
        cancelToken: new CancelToken((c) => {
          CancelTokens.postsCancel = c;
        }),
      })
      .catch((reason) => console.log(reason)),
  getPhotos: (id, currentPage = 1, pageSize = 10) =>
    instance
      .get(`profile/photos/${id}?page=${currentPage}&count=${pageSize}`, {
        cancelToken: new CancelToken((c) => {
          CancelTokens.photosCancel = c;
        }),
      })
      .catch((reason) => console.log(reason)),
  updatePhoto: (file) => instance.put(`profile/photo`, file),
  updateStatus: (newStatus) => instance.put(`profile/status`, { newStatus }),
  updateProfile: (profile) => instance.put(`profile`, profile),
  addNewPhotos: (data) =>
    instance.post(`profile/photos`, data, {
      headers: { "Content-Type": null },
    }),
};
