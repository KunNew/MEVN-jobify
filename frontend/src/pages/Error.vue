<script setup>
import Wrapper from '../assets/wrappers/ErrorPage';
import img from '../assets/images/not-found.svg'

</script>

<template>
    <Wrapper class="full-page">
<div>
    <img :src="img" alt="Not found">
    <h3>Ohh! page not found</h3>
      <p>We can't seem to find the page you're looking for</p>
      <router-link to="/landing">Go Back</router-link>
</div>
    </Wrapper>
</template>