<script setup>
import { onBeforeUpdate, onMounted, onUpdated, reactive, watch } from "vue";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import FormRow from "../../components/FormRow.vue";
import Alert from "../../components/Alert.vue";
import { useMainStore } from "../../store/main";
import { useAuthStore } from "../../store/auth";
import { useRouter } from "vue-router";

const router = useRouter();

const store = useMainStore();
const authStore = useAuthStore();

let form = reactive({
  name: "",
  email: "",
  password: "",
  lastName: "",
  location: "",
});

const onSubmit = () => {
  if (!form.name || !form.email || !form.lastName || !form.location) {
    store.displayAlert();
    return;
  }
  authStore.updateUserProfile(form)

};
onMounted(() => {
    form.name = store._user?.name
    form.email = store._user?.email
    form.lastName = store._user?.lastName
//  console.log(store._user);
    form.location = store._user?.location
    

})
</script>

<template>
  <Wrapper class="full-page">
    <form class="form" @submit.prevent="onSubmit()">
      <h3>Profile</h3>
      <Alert v-show="store.showAlert" />
<div  class="form-center">

    <FormRow type="text" name="Name" v-model="form.name" />
      <FormRow type="text" name="Last name" v-model="form.lastName" />
      <FormRow type="email" name="Email" v-model="form.email" />
      <FormRow type="text" name="Location" v-model="form.location" />
      <button type="submit" class="btn btn-block" :disabled="store.isLoading">
        {{ store.isLoading ? `Please wait ...` : `save changes` }}
      </button>
</div>

 

    </form>
  </Wrapper>
</template>
