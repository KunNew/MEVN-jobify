<script setup>
import { computed, onMounted } from "vue";
import moment from "moment";
import Wrapper from "../assets/wrappers/Job";
import JobInfo from "./JobInfo.vue";
import { useJobStore } from "../store/job";
import { useRoute, useRouter } from "vue-router";
import { useMainStore } from "../store/main";

const route = useRoute();
const router = useRouter();

const jobStore = useJobStore();
const store = useMainStore();

let props = defineProps(["job"]);
const date = computed(() => {
  let date = moment(props.job.createdAt);
  return date.format("MMM Do,YYYY");
});
const onRemove = (_id) => {
  jobStore.deleteJob(_id);
};

const onEdit = (id) => {
  router.push(`/add-job`);
  jobStore.getJob(id);
 
};
</script>

<template>
  <Wrapper>
    <header>
      <div class="main-icon">
        {{ job.company.charAt(0) }}
      </div>
      <div class="info">
        <h5>{{ job.position }}</h5>
        <p>{{ job.company }}</p>
      </div>
    </header>
    <div class="content">
      <div class="content-center">
        <JobInfo icon="fas fa-location-arrow" :text="job.jobLocation" />
        <JobInfo icon="fas fa-clock" :text="date" />
        <JobInfo icon="fas fa-briefcase" :text="job.jobType" />
        <div :class="`status ${job.status}`">{{ job.status }}</div>
      </div>
      <footer>
        <div className="actions">
          <button
            type="button"
            className="btn edit-btn"
            @click="onEdit(job._id)"
          >
            Edit
          </button>
          <button
            type="button"
            className="btn delete-btn"
            @click="onRemove(job._id)"
          >
            Delete
          </button>
        </div>
      </footer>
    </div>
  </Wrapper>
</template>
