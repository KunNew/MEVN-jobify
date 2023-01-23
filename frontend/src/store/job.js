import axios from "axios";
import { defineStore } from "pinia";
import { nextTick } from "vue";
import router from "../routes";
import api from "../utils/utilites";
import { useMainStore } from "./main";
export const useJobStore = defineStore("job", {
  state: () => ({
    _isLoading: false,
    _error: null,
    _jobs: [],
    _job: null,
    _page:1
  }),
  actions: {
    async createJob(job) {
      console.log(job);
      const store = useMainStore();
      try {
        store.isLoading = true;
        const { data } = await api.post(`/jobs`, job);
        console.log(data);
        store.isLoading = false;
        store.showAlert = true;
        store.alertType = "success";
        store.alertText = `Job Created`;

        // nextTick(() => {
        //     setTimeout(() => {
        //         router.push('/')
        //     },2000)
        // })

        nextTick(() => {
          store.clearAlert();
        });
      } catch (err) {
        console.log(err);
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

    async getJobs(search,searchStatus="all",searchType="all",sort="latest") {
      const store = useMainStore();
      console.log(this._page);
      let url = `/jobs?page=${this._page}&status=${searchStatus}&jobType=${searchType}&sort=${sort}`;
      if (search) {
        url = url + `&search=${search}`;
      }
      try {
    
        store.isLoading = true;
        const { data } = await api.get(url);

        this._jobs = data;

        setTimeout(() => {
          store.isLoading = false;
        }, 1000);
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

    changePage (newPage) {
      this._page = newPage
    },
    getJob(id) {
      const store = useMainStore();
      store.isEditing = true;
      this._job = this._jobs.jobs?.find((it) => it._id === id);
    },
    async deleteJob(_id) {
      const store = useMainStore();
      try {
        store.isLoading = true;
        const { data } = await api.delete(`/jobs/${_id}`);

        this.getJobs();

        setTimeout(() => {
          store.isLoading = false;
        }, 1000);
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

    async updateJob(job) {
      const store = useMainStore();
      try {
        store.isLoading = true;
        const { data } = await api.patch(`/jobs/${job._id}`, job);
        store.isLoading = false;
        store.showAlert = true;
        store.alertType = "success";
        store.alertText = `Job updaed`;

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
  },
  // persist: {
  //   storage: localStorage,
  //   paths: ['_job'],
  // },
});
