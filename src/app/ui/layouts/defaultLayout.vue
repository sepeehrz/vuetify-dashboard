<template>
  <v-locale-provider rtl>
    <v-app>
      <topBar @change-drawer-state="e => (drawer = e)" />
      <sideBar :drawer-state="drawer" />
      <v-main class="mt-4" tag="div" scrollable>
        <RouterView />
      </v-main>
    </v-app>
  </v-locale-provider>
</template>
<script lang="ts" setup>
  import topBar from '../components/topBar.vue';
  import sideBar from '../components/navigation/sideBar.vue';
  import {ref} from 'vue';

  const drawer = ref(true);
</script>
<style lang="scss" scoped></style>
