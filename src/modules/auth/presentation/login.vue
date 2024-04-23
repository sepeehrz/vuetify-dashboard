<template>
  <section class="login">
    <h3>ورود به پنل ادمین</h3>
    <v-form @submit.prevent autocomplete="off">
      <v-text-field
        v-model="user.username"
        name="username"
        label="نام کاربری"
        :variant="'outlined'"
        placeholder="نام کاربری خود را وارد نمایید"
        :error-messages="errorMessage.username"
        clearable
        @blur="validateItem('username')"></v-text-field>
      <v-text-field
        v-model="user.password"
        name="password"
        label="رمز عبور"
        :variant="'outlined'"
        type="password"
        placeholder="رمز عبور خود را وارد نمایید"
        :error-messages="errorMessage.password"
        clearable
        @blur="validateItem('password')"></v-text-field>
      <v-checkbox
        v-model="user.remember"
        color="primary"
        name="remember"
        label="مرا بخاطر بسپار"></v-checkbox>
      <v-btn
        class="login-btn"
        size="large"
        block
        :disabled="disabled"
        :loading="loading"
        @click="login">
        ورود
      </v-btn>
    </v-form>
  </section>
</template>
<script lang="ts" setup>
  import {ref} from 'vue';
  import {useRouter} from 'vue-router';
  import loginFormSchema from '../controller/validation/Schema';

  interface IUser {
    username?: string;
    password?: string;
    remember?: boolean;
  }

  const $router = useRouter();

  const user = ref<IUser>({});
  const errorMessage = ref<any>({});
  const loading = ref(false);
  const disabled = ref(false);

  function validateItem(field: string): any {
    loginFormSchema
      .validateAt(field, user.value)
      .then(() => {
        errorMessage.value[field] = '';
      })
      .catch(err => {
        errorMessage.value[field] = err.message;
      });
  }
  function login() {
    loading.value = true;
    loginFormSchema
      .validate(user.value, {abortEarly: false})
      .then(res => {
        errorMessage.value = {};
        loading.value = false;
        console.log(res);
        $router.push('/');
      })
      .catch(err => {
        errorMessage.value = {};
        err.inner.forEach((error: {path: string | number; message: any}) => {
          errorMessage.value[error.path] = error.message;
        });
        loading.value = false;
      });
  }
</script>
<style lang="scss" scoped>
  .login {
    .v-form {
      > div {
        margin-bottom: 15px;
      }
    }
    h3 {
      margin: 10px 0 30px;
      text-align: center;
    }
    .login-btn {
      color: #fff !important;
    }
  }
</style>
