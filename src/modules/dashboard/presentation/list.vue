<template>
  <DataGrid
    :headers="headers"
    :service="request"
    :title="{text: 'اطلاعات قرارداد ها', icon: 'mdi-microphone'}"
    :filters="filters">
    <template #data="{item}">
      <td>
        {{ item.id }}
      </td>
      <td>
        {{ item.name }}
      </td>
    </template>
  </DataGrid>
</template>
<script lang="ts" setup>
  import {ref} from 'vue';
  import {EmployeesManagementService} from '../controller/service/index';

  import {get} from '@dashboard/application';

  const request = get(EmployeesManagementService);
  const headers = ref([
    {
      title: 'شناسه',
      align: 'start',
      width: '20%',
      sortable: false,
      key: 'id'
    },
    {
      title: 'نام',
      align: 'start',
      width: '60%',
      sortable: true,
      key: 'name'
    }
  ]);
  // const actions = ref([
  //   {
  //     title: 'لیست هنرجویان',
  //     icon: 'mdi-microphone',
  //     cb: cb
  //   }
  // ]);
  // function cb(item: any) {
  //   console.log(item);
  // }
  const filters = ref([
    // {
    //   icon: "la-search",
    //   name: "id",
    //   model: "id",
    //   label: "شناسه",
    // },
    {
      icon: 'mdi-home',
      model: 'search',
      label: 'نام کاربر'
      // col: 5,
    },
    {
      // col: 7,
      model: 'payment_status',
      label: 'وضعیت بدهی',
      type: 'select',
      items: [
        {text: 'همه', value: null},
        {text: 'dsdas', value: 1},
        {text: 'dsdas22222', value: 2},
        {text: 'dsdas33332', value: 3}
      ]
    }
  ]);
</script>
