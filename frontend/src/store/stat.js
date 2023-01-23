import axios from "axios";
import { defineStore } from "pinia";
import { nextTick } from "vue";
import router from "../routes";
import api from "../utils/utilites";
import { useMainStore } from "./main";
export const useStatStore = defineStore("stat", {
  state: () => ({
    _stat: {},
    _error: null,
  }),
  actions: {
    async getStat() {
      const store = useMainStore();
      try {
        store.isLoading = true;
        const { data } = await api.get(`/jobs/stats`);
        setTimeout(() => {
            store.isLoading = false;
          }, 2000);
        // store.isLoading = false;
        this._stat = data.stats;

   
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
  },
  // persist: {
  //   storage: localStorage,
  //   paths: ['_job'],
  // },
});
