


import axios from "axios";
import { useAuthStore } from "../store/auth";
import { useMainStore } from '../store/main';


const api = axios.create({
  baseURL: `/api`,
  headers: {
    "content-type": "application/json",
    "accept": "application/json",
  },
});

api.interceptors.request.use(
    (config) => {
        config.headers[`Authorization`] = `Bearer ${useMainStore()._user.token}`
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // console.log(error.response.status);
        if(error.response.status === 401) {
            useAuthStore().logout()
        }
        return Promise.reject(error);
    }
)

export default api