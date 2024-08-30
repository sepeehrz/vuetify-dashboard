<template>
  <NavItems :items="items" />
  <div class="content">
    <RouterView :data="data" />
  </div>
</template>
<script lang="ts" setup>
  import NavItems from './items.vue';
  import {IItems} from './types/index';

  interface Props {
    items: IItems[];
    data?: object;
  }
  defineProps<Props>();
</script>
<style lang="scss" scoped></style>
