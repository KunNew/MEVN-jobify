<script setup>
import Wrapper from '../assets/wrappers/ChartsContainer';
import AreaChart from './AreaChart.vue';
import BarChart from './BarChart.vue';

</script>
<template>
    <Wrapper>
<h4>Montly Application</h4>
<button type="button">Bar Chart</button>
<BarChart/>
<AreaChart/>
    </Wrapper>
</template>