<template>
  <DataGrid
    :headers="headers"
    :service="request"
    :title="{text: 'دسته بندی ها', icon: 'mdi-forum'}"
    :with-recycle-bin="false"
    :filters="filters">
    <template #data="{item}">
      <td>
        {{ item.title }}
      </td>
      <td>
        {{ item.description }}
      </td>
      <td>
        <Badge
          :text="item.isActiveText"
          :color="item.isActive ? '#28a745' : '#ff1744'" />
      </td>
    </template>
  </DataGrid>
</template>
<script lang="ts" setup>
  import {ref} from 'vue';
  import {CategoriesService} from '../../logics/service';
  import {useHeaders} from './headers';
  import {getInstance} from '@app/utils';

  const request = getInstance(CategoriesService);
  const {headers} = useHeaders();

  const filters = ref([
    {
      name: 'searchField',
      model: 'search',
      label: 'جستجو کنید'
    }
  ]);
</script>
