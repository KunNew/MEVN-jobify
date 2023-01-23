<script setup>
import Wrapper from "../assets/wrappers/JobInfo";
defineProps(["icon", "text"]);
</script>

<template>
  <Wrapper>
    <span className="icon"><i :class="icon"></i></span>
    <span className="text">{{ text }}</span>
  </Wrapper>
</template>
