
<script setup>
import { ref } from 'vue';
import Wrapper from '../assets/wrappers/SmallSidebar';
import Logo from './Logo.vue';
import Navlink from './Navlink.vue';

defineProps(['visibleMenu'])
defineEmits(['toggleMenu'])
</script>
<template>
    <Wrapper>
        <div class="sidebar-container" :class="{'show-sidebar': visibleMenu}">
            <div class="content">
                <button type="button" class="close-btn"  @click="$emit('toggleMenu')">
                    <i class="fas fa-times"></i>
                </button>
                <header>
                    <Logo/>
                </header>
                <div class="nav-links">
                   <Navlink @toggleMenu="$emit('toggleMenu')"/>
                </div>
            </div>
        </div>
    </Wrapper>
</template>
