<script setup>
import Wrapper from "../assets/wrappers/SharedLayout";
import Navbar from "../components/Navbar.vue";
import BigSideBar from "../components/BigSideBar.vue";
import SmallSizebar from "../components/SmallSizebar.vue";
import { ref } from "vue";

const visibleMenu = ref(false)
const visibleSidebar = ref(true)
const toggleMenu = () => {
  visibleMenu.value =! visibleMenu.value
  visibleSidebar.value =! visibleSidebar.value

}
</script>

<template>
  <Wrapper>
    
      <main class='dashboard'>
        
        <SmallSizebar :visibleMenu="visibleMenu" @toggleMenu="toggleMenu" />
        <BigSideBar :visibleSidebar="visibleSidebar" @toggleMenu="toggleMenu" />
        
        <div>
          <Navbar  @toggleMenu="toggleMenu" />
          <div class='dashboard-page'>
           <router-view/>
          </div>
        </div>
      </main>
    </Wrapper>
</template>
