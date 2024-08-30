<template>
  <v-app-bar class="topBar" height="79">
    <v-app-bar-nav-icon
      variant="text"
      @click.stop="openDrawer"></v-app-bar-nav-icon>
    <v-spacer></v-spacer>

    <v-btn
      icon="mdi-logout"
      variant="text"
      class="logout"
      @click="logout"></v-btn>
  </v-app-bar>
</template>
<script lang="ts" setup>
  import {ref, inject} from 'vue';
  import {useRouter} from 'vue-router';
  const emits = defineEmits<{
    (e: 'changeDrawerState', items: boolean): void;
  }>();

  const drawer = ref(true);
  const $dialog: any = inject('dialog');
  const $router = useRouter();
  function openDrawer() {
    drawer.value = !drawer.value;
    emits('changeDrawerState', drawer.value);
  }
  async function logout() {
    const confirm = await $dialog.confirm({
      title: 'آیا از خروج از پنل مطمئن میباشید ؟',
      ok_txt: 'بله',
      cancel_txt: 'خیر'
    });
    if (confirm) {
      $router.push('/login');
    }
  }
</script>
<style lang="scss" scoped>
  .logout {
    font-size: 18px;
    transform: rotate(-180deg);
  }
  .topBar {
    border-bottom: 1px solid #e4e4e4;
  }
</style>
