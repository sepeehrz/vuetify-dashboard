<template>
  <v-tabs class="navbar" center-active>
    <v-tab
      v-for="(item, index) in items"
      :key="index"
      :rounded="false"
      :to="item.to"
      selected-class="active">
      {{ item.title }}
    </v-tab>
  </v-tabs>
</template>
<script lang="ts" setup>
  import {IItems} from './types/index';
  interface Props {
    items: IItems[];
  }
  defineProps<Props>();
</script>
<style lang="scss" scoped>
  .navbar {
    border-bottom: 1px solid #e4e4e4;
    a {
      width: 200px;
      color: #000;
      font-size: 16px;
      font-weight: 500;
      text-decoration: none;
    }
  }
  .active {
    position: relative;
    &::before {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      border: 4px solid rgb(var(--v-theme-primary));
      border-radius: 100px 100px 0 0;
    }
  }
</style>
