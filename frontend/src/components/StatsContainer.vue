<script setup>
import Wrapper from "../assets/wrappers/StatsContainer";
import { useMainStore } from "../store/main";
import { useStatStore } from "../store/stat";
import { computed, ref } from 'vue'

import StatItem from "./StatItem.vue";

const store = useMainStore();

const statStore = useStatStore()

const stats = computed(() => statStore._stat)

const defaultStats = ref([
    {
      title: 'pending applications',
      count: stats.value?.pending || 0,
      icon: 'fas fa-calendar-week',
      color: '#e9b949',
      bcg: '#fcefc7',
    },
    {
      title: 'interviews scheduled',
      count: stats.value?.interview || 0,
      icon: 'fas fa-calendar-check',
      color: '#647acb',
      bcg: '#e0e8f9',
    },
    {
      title: 'jobs declined',
      count: stats.value?.declined || 0,
      icon: 'fas fa-calendar-minus',
      color: '#d66a6a',
      bcg: '#ffeeee',
    },
  ])
</script>

<template>
    <Wrapper>
   <div v-for="(stat,index) in defaultStats" :key="index">
    <StatItem :stat="stat"/>
   </div>
    </Wrapper>
 </template>
 