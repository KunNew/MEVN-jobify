<script setup>
import { useMainStore } from "../store/main";

const store = useMainStore();
</script>
<template>
  <div :class="`alert alert-${store.alertType}`">{{ store.alertText }}</div>
</template>
