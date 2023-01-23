<script setup>
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { useMainStore } from "../../store/main";
import FormRow from "../../components/FormRow.vue";
import {
  computed,
  nextTick,
  onBeforeMount,
  onMounted,
  reactive,
  ref,
  watch,
} from "vue";
import Alert from "../../components/Alert.vue";
import FormRowSelect from "../../components/FormRowSelect.vue";
import { useJobStore } from "../../store/job";
import { useRoute } from "vue-router";
import { object } from "webidl-conversions";

const route = useRoute();

const store = useMainStore();
const jobStore = useJobStore();

const form = reactive({
  position: "",
  company: "",
  jobLocation: "",
  jobType: "full-time",
  status: "pending",
});

// select-option

const jobTypeOptions = ["full-time", "part-time", "remote", "internship"];
const jobStatusOptions = ["interview", "declined", "pending"];

const onSubmit = () => {
  if (!form.position || !form.company || !form.jobLocation) {
    store.displayAlert();
    return;
  }
  if (store.isEditing) {
    jobStore.updateJob(form)
  } else {
    jobStore.createJob(form);
  }
};

const onClear = () => {
  form._id = ""
  form.position = "";
  form.company = "";
  form.jobLocation = "";
};
onMounted(() => {
  if (store.isEditing) {
    Object.assign(form, jobStore._job);
  }
});
</script>

<template>
  <Wrapper class="full-page">
    <form class="form" @submit.prevent="onSubmit()">
      <h3>Add Job</h3>
      <Alert v-show="store.showAlert" />
      <div class="form-center">
        <FormRow type="text" name="Position" v-model="form.position" />
        <FormRow type="text" name="Company" v-model="form.company" />
        <FormRow type="text" name="Job Location" v-model="form.jobLocation" />
        <!-- job-status  -->
        <FormRowSelect
          name="Job Status"
          :list="jobStatusOptions"
          v-model="form.status"
        />
        <!-- job-type  -->
        <FormRowSelect
          name="Job Type"
          :list="jobTypeOptions"
          v-model="form.jobType"
        />
        <div class="btn-container">
          <button
            type="submit"
            class="btn btn-block"
            :disabled="store.isLoading"
          >
            Submit
          </button>
          <button class="btn btn-block clear-btn" @click="onClear()">
            Clear
          </button>
        </div>
      </div>
    </form>
  </Wrapper>
</template>
