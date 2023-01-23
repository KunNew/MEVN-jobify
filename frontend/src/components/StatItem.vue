<script setup>
import Wrapper from '../assets/wrappers/StatItem';
defineProps(['stat'])
</script>

<template>
   <Wrapper :color="stat.color" :bcg="stat.bcg">
    <header>
        <span class="count">{{ stat.count }}</span>
        <span class="icon"> <i :class="stat.icon"></i> </span>
    </header>
    <h5 class="title">{{ stat.title }}</h5>
   </Wrapper> 
</template>