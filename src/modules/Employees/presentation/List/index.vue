<template>
  <DataGrid
    :headers="headers"
    :service="request"
    :title="{text: 'اطلاعات کارکنان ها', icon: 'mdi-microphone'}"
    :filters="filters"
    :editUrl="editUrl">
    <template #data="{item}">
      <td>
        {{ item.name }}
      </td>
      <td>
        {{ item.surName }}
      </td>
      <td>
        {{ item.nationalCode }}
      </td>
      <td>
        {{ item.hiringDate }}
      </td>
      <td>
        {{ item.leavingDate }}
      </td>
      <td>
        <!-- <statusComponent :status="item.isActive" /> -->
      </td>
    </template>
  </DataGrid>
</template>
<script lang="ts" setup>
  import {ref} from 'vue';
  import {EmployeesManagementService} from '../../helpers/service/index';
  import {useHeaders} from '../../helpers/dataTable/headers';
  import {get} from '@dashboard/application';
  import {useRouter} from 'vue-router';

  const request = get(EmployeesManagementService);
  const {headers} = useHeaders();

  const filters = ref([
    {
      name: 'searchField',
      model: 'search',
      label: 'نام کاربر'
    }
  ]);
  const $router = useRouter();
  function editUrl(rowData: {id: string}) {
    $router.push(`/employees/${rowData.id}/info`);
  }
</script>
