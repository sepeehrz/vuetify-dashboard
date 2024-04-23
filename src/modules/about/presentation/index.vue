<template>
  <div style="width: 700px; margin: 50px auto">
    <v-form @submit.prevent>
      <v-text-field
        v-model="formField.email"
        label="email"
        :error-messages="errorMessage.email"></v-text-field>

      <v-text-field
        v-model="formField.password"
        label="password"
        :error-messages="errorMessage.password"></v-text-field>

      <v-btn class="mt-2" type="submit" @click="submit">Submit</v-btn>
    </v-form>
  </div>
</template>
<script lang="ts" setup>
  import {ref} from 'vue';
  import {object, string} from 'yup';

  const formField = ref<any>({});
  const loginFormSchema = object({
    email: string().required().email(),
    password: string().required()
  });
  const errorMessage = ref<any>({});

  async function submit() {
    loginFormSchema
      .validate(formField.value, {abortEarly: false})
      .then(res => {
        errorMessage.value = {};
        console.log(res);
      })
      .catch(err => {
        errorMessage.value = {};
        err.inner.forEach((error: {path: string | number; message: any}) => {
          errorMessage.value[error.path] = error.message;
        });
      });
  }
</script>
