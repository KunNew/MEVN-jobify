<script setup>
defineProps(["labelText", "name", "modelValue", "list"]);
</script>
<template>
  <div class="form-row">
    <label :for="name">{{ labelText || name }}</label>
    <select
      :name="name"
      class='form-select'
      @input="$emit('update:modelValue', $event.target.value)"
    >
      <option
        :value="it"
        v-for="(it, idx) in list"
        :key="idx"
        :selected="it === modelValue"
      >
        {{ it }}
      </option>
    </select>
  </div>
</template>
