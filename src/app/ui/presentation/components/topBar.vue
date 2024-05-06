<template>
  <v-app-bar :elevation="1">
    <v-app-bar-nav-icon
      variant="text"
      @click.stop="openDrawer"></v-app-bar-nav-icon>

    <v-toolbar-title>test</v-toolbar-title>

    <v-spacer></v-spacer>

    <v-btn icon="mdi-magnify" variant="text"></v-btn>

    <v-btn icon="mdi-filter" variant="text"></v-btn>

    <v-btn icon="mdi-dots-vertical" variant="text"></v-btn>
  </v-app-bar>
</template>
<script lang="ts" setup>
  import {ref} from 'vue';

  const emits = defineEmits<{
    (e: 'changeDrawerState', items: boolean): void;
  }>();

  const drawer = ref(true);

  function openDrawer() {
    drawer.value = !drawer.value;
    emits('changeDrawerState', drawer.value);
  }
</script>
<style lang="scss" scoped></style>
