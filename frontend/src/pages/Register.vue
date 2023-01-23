<script setup>
import { onBeforeUpdate, onMounted, onUpdated, reactive, watch } from "vue";
import Wrapper from "../assets/wrappers/RegisterPage";
import FormRow from "../components/FormRow.vue";
import Alert from "../components/Alert.vue";
import { useMainStore } from "../store/main";
import { useAuthStore } from "../store/auth";
import {useRouter} from 'vue-router'

const router = useRouter()

const store = useMainStore();
const authStore = useAuthStore();


let form = reactive({
  name: "",
  email: "",
  password: "",
  isMember: true,
  userLoaction: '',
  jobLocation: ''
});
const toggleMember = () => {
  form.isMember = !form.isMember;
};
const onSubmit = () => {
  if (!form.email || !form.password || (!form.name && !form.isMember)) {
    store.displayAlert();
    return;
  }
  if(form.isMember) {
    console.log(`Already Member`);
    authStore.loginUser(form);

  } else {
    authStore.registerUser(form)
    
 
  } 
};

</script>

<template>
  <Wrapper class="full-page">
    <form class="form" @submit.prevent="onSubmit()">
      <h3>{{ !form.isMember ? `Register` : `Login` }}</h3>
      <Alert v-show="store.showAlert" />
      <FormRow type="text" name="name" v-model="form.name" v-if="!form.isMember"/>
      <FormRow type="email" name="email" v-model="form.email" />
      <FormRow type="password" name="password" v-model="form.password" />
      <button type="submit" class="btn btn-block" :disabled="store.isLoading">Submit</button>
      <p>
        {{ form.isMember ? `Not a member yet` : `Already a member ?` }}
        <button type="button" class="member-btn" @click="toggleMember()">
          {{ form.isMember ? `Register` : `Login` }}
        </button>
      </p>
    </form>
  </Wrapper>
</template>
