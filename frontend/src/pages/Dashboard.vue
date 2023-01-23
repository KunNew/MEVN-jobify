<script setup>
import { onMounted, ref } from 'vue';
import ChartsContainer from '../components/ChartsContainer.vue';
import Loading from '../components/Loading.vue';
import StatsContainer from '../components/StatsContainer.vue';
import { useMainStore } from '../store/main';
import { useStatStore } from '../store/stat';

const statStore = useStatStore()
const store = useMainStore()



statStore.getStat()
</script>
<template>
<Loading v-if="store.isLoading" center="center"/>
<StatsContainer v-else/>


</template>