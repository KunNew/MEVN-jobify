<script setup>
import links from "../utils/links.js";
defineEmits(['toggleMenu'])
</script>
<template>
  <div class="nav-links" v-for="(link, idx) in links" :key="idx">
    <router-link :to="link.path" class="nav-link" @click="$emit('toggleMenu')">
      <span>
        <i :class="['fas',link.icon]" style="margin-right: 10px;"></i>
      </span>
      {{ link.text }}
    </router-link>
  </div>
</template>
