<script setup>
import { computed, onMounted } from "vue";
import Wrapper from "../assets/wrappers/PageBtnContainer";
import { useJobStore } from "../store/job";

const jobStore = useJobStore();

const pages = computed(() => {
  return Array.from({ length: jobStore._jobs.numOfPages }, (_, index) => {
    return index + 1;
  });
});
// console.log(pages.value);
const prevPage = () => {
  let newPage = jobStore._page - 1;
  if (newPage < 1) {
    newPage = jobStore._jobs.numOfPages;
  }
  jobStore.changePage(newPage);
};
const nextPage = () => {
  let newPage = jobStore._page + 1;

  if (newPage > jobStore._jobs.numOfPages) {
    newPage = 1;
  }
  jobStore.changePage(newPage);
};
onMounted(() => {});
</script>
<template>
  <Wrapper>
    <button class="prev-btn" @click="prevPage()">prev</button>
    <div v-for="pageNumber in pages" :key="pageNumber" class="btn-container">
      <button
        type="button"
        @click="jobStore.changePage(pageNumber)"
        :class="`${
          pageNumber === jobStore._page ? 'pageBtn active' : 'pageBtn'
        }`"
      >
        {{ pageNumber }}
      </button>
    </div>
    <button class="next-btn" @click="nextPage()">next</button>
  </Wrapper>
</template>
