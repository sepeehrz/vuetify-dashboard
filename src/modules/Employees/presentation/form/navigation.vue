<template>
  <navBar :items="items" />
</template>
<script lang="ts" setup>
  import navBar from '@app/ui/presentation/components/navBar/NavBar.vue';
  import {useRoute} from 'vue-router';

  const $route = useRoute();

  const items = [
    {
      title: 'اطلاعات',

      to: `/employees/${$route.params.id}/info`
    },
    {
      title: 'اقساط و بدهی ها',
      to: `/employees/${$route.params.id}/installments`
    },
    {
      title: 'دارایی ها',
      to: `/employees/${$route.params.id}/assets`
    }
  ];
  // if (userStore.getRolle === 'SuperAdmin') {
  //   items.push(
  //     {
  //       title: 'اقساط و بدهی ها',
  //       to: `/employees/${$route.params.id}/installments`
  //     },
  //     {
  //       title: 'دارایی ها',
  //       to: `/employees/${$route.params.id}/assets`
  //     }
  //   );
  // }
</script>
<style lang="scss" scoped></style>
