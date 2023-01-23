<script setup>
import Wrapper from "../assets/wrappers/SearchContainer";
import FormRow from "./FormRow.vue";
import FormRowSelect from "./FormRowSelect.vue";
import { reactive, ref, watch, watchEffect } from "vue";
import { useJobStore } from "../store/job";
import debounce from "lodash/debounce";
const jobStore = useJobStore();

const form = reactive({
  search: "",
  status: "all",
  jobType: "all",
  sort: "latest",
});
const statusOptions = ref(["all", "interview", "declined", "pending"]);
const jobTypeOptions = ref(["full-time", "part-time", "remote", "internship"]);
const sortOptions = ref(["latest", "oldest", "a-z", "z-a"]);


watchEffect(() => {
  jobStore.getJobs(form.search,form.status, form.jobType,form.sort);
});
</script>

<template>
  <Wrapper>
    <form class="form">
      <h4>Search form</h4>
      <div class="form-center">
        <FormRow name="search" v-model="form.search" />
        <FormRowSelect
          name="status"
          v-model="form.status"
          :list="statusOptions"
        />
        <FormRowSelect
          name="type"
          v-model="form.jobType"
          :list="['all', ...jobTypeOptions]"
        />
        <FormRowSelect name="sort" v-model="form.sort" :list="sortOptions" />
      </div>
    </form>
  </Wrapper>
</template>
