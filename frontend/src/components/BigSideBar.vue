<script setup>
import Wrapper from '../assets/wrappers/BigSidebar';
import Logo from './Logo.vue';
import Navlink from './Navlink.vue';

defineProps(['visibleSidebar'])

</script>
<template>
    <Wrapper>

        <div
        class="sidebar-container" :class="{'show-sidebar': visibleSidebar}"
      >
        <div class='content'>
          <header>
            <Logo />
          </header>
          <Navlink />
        </div>
      </div>
    </Wrapper>
</template>