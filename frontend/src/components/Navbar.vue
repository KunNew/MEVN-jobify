<script setup>
import { ref } from "vue";
import Wrapper from "../assets/wrappers/Navbar";
import { useAuthStore } from "../store/auth";
import Logo from "./Logo.vue";

const authStore = useAuthStore()

const visibleLogout = ref(false);


defineEmits(['toggleMenu'])
</script>
<template>
  <Wrapper>
    <div class="nav-center">
      <button type="button" class="toggle-btn" @click="$emit('toggleMenu')">
        <i class="fas fa-bars"></i>
      </button>
      <div>
        <Logo  />
        <h3 class="logo-text">Dashboard</h3>
      </div>
      <div class="btn-container">
        <button
          type="button"
          class="btn"
          @click="visibleLogout = !visibleLogout"
        >
          <i class="fas fa-user"></i>
          Admin
        </button>
        <div class="dropdown" :class="{ 'show-dropdown': visibleLogout }">
          <button class="dropdown-btn" @click="authStore.logout()">logout</button>
        </div>
      </div>
    </div>
  </Wrapper>
</template>
