<script setup>
import Wrapper from "../assets/wrappers/LandingPage";
// import main from "../assets/images/main.svg";
import main from '../assets/images/main1.svg'
import Logo from "../components/Logo.vue";

import axios from 'axios'
import { onMounted } from "vue";

onMounted(() => {
  axios.get(`/api/`).then(res => {
    console.log(res.data);
  })
})
</script>

<template>
  <Wrapper>
    <nav>
      <Logo/>
    </nav>
    <div class="container page">
      <div class="info">
        <h1>Job <span>tracking</span> app</h1>
        <p>
            
          For the best result you should upload an square image. You can use a
          standard image editing tool if you need to crop your image. Once your
          image is prepared upload it using the tool above. Next, verify that
          the preview image is to your liking. Finally, use the download button
          to export your favicon in ICO format.
        </p>
        <router-link to="/register" class="btn btn-hero">Login/Register</router-link>
      </div>
      <img :src="main" alt="job hunt" class="img main-img" />
    </div>
  </Wrapper>
</template>
