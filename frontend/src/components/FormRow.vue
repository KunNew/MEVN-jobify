<script setup>
const props = defineProps(['name','labelText','type','modelValue'])
const emit = defineEmits(['inputChange'])

const onInputChange = (e) => {
   if(e.target.name === 'search') {
    let timeoutID;
    clearTimeout(timeoutID);
      timeoutID = setTimeout(() => {
        emit('update:modelValue', e.target.value)
      }, 1000);

   } else {
    emit('update:modelValue', e.target.value)
   }
   
}
</script>
<template>
   <div class="form-row">
    <label :for="name" class="form-label">
        {{ labelText || name }}
    </label>
    <input :type="type" 
    class="form-input"
    :value="modelValue" 
    :name="name"
    @input="onInputChange" />
   </div>
</template>