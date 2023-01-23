<script setup>
import { ThemeProvider } from 'vue3-styled-components'
</script>
<template>
  <theme-provider :theme="{
      primary: 'palevioletred'
  }">
    <router-view/>
  </theme-provider>
</template>