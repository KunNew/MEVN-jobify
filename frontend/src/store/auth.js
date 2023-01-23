import axios from "axios";
import { defineStore } from "pinia";
import { nextTick } from "vue";
import router from "../routes";
import api from "../utils/utilites";
import { useMainStore } from "./main";
export const useAuthStore = defineStore("auth", {
  state: () => ({
    // _user: null,
    _isLoading: false,
    _error: null,
    
    // Login Successful! Redirecting...
  }),
  actions: {
    async loginUser(currentUser) {
      const store = useMainStore();
      try {
        store.isLoading = true;
        const { data } = await axios.post(`/api/auth/login`, currentUser);
        // console.log(data);
        store._user = data;
        store.isLoading = false;
        store.showAlert = true;
        store.alertType = "success";
        store.alertText = `Login Successful! Redirecting...`;

        nextTick(() => {
          setTimeout(() => {
            router.push("/");
          }, 2000);
        });

        nextTick(() => {
          store.clearAlert();
        });
      } catch (err) {
        store.clearAlert();
        this._error =
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message;
        if (this._error === "Not authorized, token failed") {
        }
        store.alertType = "danger";
        store.alertText = this._error;
        store.showAlert = true;
      }
    },

    async registerUser(currentUser) {
      const store = useMainStore();
      try {
        store.isLoading = true;
        const { data } = await axios.post(`/api/auth/register`, currentUser);
        // console.log(data);
        store._user = data;
        store.isLoading = false;
        store.showAlert = true;
        store.alertType = "success";
        store.alertText = `User Created Redirecting...`;

        nextTick(() => {
          setTimeout(() => {
            router.push("/");
          }, 2000);

          store.clearAlert();
        });
      } catch (err) {
        store.clearAlert();
        this._error =
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message;
        if (this._error === "Not authorized, token failed") {
        }
        store.alertType = "danger";
        store.alertText = this._error;
        store.showAlert = true;
      }
    },

    async updateUserProfile(currentUser) {
      const store = useMainStore();
      try {
        store.isLoading = true;
        const config = {
          headers: {
            "Content-type": "Application/json",
            Authorization: `Bearer ${store._user.token}`,
          },
        };

        const { data } = await api.put(`auth/updateUserProfile`, currentUser);
        store._user = data;
        store.isLoading = false;
        store.showAlert = true;
        store.alertType = "success";
        store.alertText = `User Updated`;
        nextTick(() => {
          store.clearAlert();
        });
      } catch (err) {
        store.clearAlert();
        this._error =
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message;

        store.alertType = "danger";
        store.alertText = this._error;
        store.showAlert = true;
      }
    },

    logout() {
      useMainStore()._user = null;
      nextTick(() => {
        router.push("/register");
      });
    },
  },
  // persist: {
  //   storage: localStorage,
  //   paths: ['_user'],
  // },
});
