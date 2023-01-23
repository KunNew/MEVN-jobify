<script setup>
import { onMounted } from "vue-demi";
import Wrapper from "../assets/wrappers/JobsContainer";
import PageBtnContainer from "./PageBtnContainer.vue";
import Job from "./Job.vue";
import { useJobStore } from "../store/job";
import { useMainStore } from "../store/main";
import Loading from "./Loading.vue";
const jobStore = useJobStore();
const store = useMainStore();
onMounted(() => {
  jobStore.getJobs();
});
</script>

<template>
  <Wrapper>
    <Loading center="center" v-if="store.isLoading" />
    <template v-else-if="jobStore._jobs.totalJobs === 0">
      <h5>No job display</h5>
    </template>
    <template v-else>
      <h5>
        {{ jobStore._jobs?.totalJobs }} Job{{ jobStore._jobs.jobs?.length > 1 ? "s" : "" }} found
      </h5>
      <div class="jobs">
        <div
        v-for="(it, index) in jobStore._jobs.jobs"
        :key="index"
      >
        <Job :job="it" />
      </div>
      </div>
    </template>
    <PageBtnContainer/>
  </Wrapper>
</template>

