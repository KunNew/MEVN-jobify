import { defineStore } from "pinia";
import { nextTick } from "vue";

export const useMainStore = defineStore("main", {
  state: () => ({
    isLoading: false,
    showAlert: false,
    alertText: "",
    alertType: "",
    _user: null,
    isEditing: false
  }),
  actions: {
    displayAlert() {
      // this.isLoading = true;
      this.alertType = "danger";
      this.alertText = "Please provide all values";
      this.showAlert = true;
      nextTick(() => {
        this.clearAlert();
      });
    },
    clearAlert() {
      setTimeout(() => {
        this.isLoading = false;
        this.alertType = ``;
        this.alertText = ``;
        this.showAlert = false;
      }, 2000);
    },
  },
  persist: {
    storage: localStorage,
    paths: ['_user'],
  },
});
