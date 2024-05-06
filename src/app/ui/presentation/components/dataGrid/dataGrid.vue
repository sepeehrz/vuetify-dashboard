<template>
  <div>
    <Header
      :title="title"
      :withHeader="withHeader"
      :withActionBar="withActionBar"
      :create-url="createUrl"
      @reset-table="_refresh">
      <template #toollbar_right>
        <slot name="toollbar_right"></slot>
      </template>
      <template #header>
        <slot name="header"></slot>
      </template>
      <template #header_add>
        <slot name="header_add"></slot>
      </template>
    </Header>

    <Filters v-model:filter-data="filterData" :filters="filters" />
    <v-data-table
      class="data-table"
      v-model="selected"
      v-model:page="pagination.page"
      :items="items"
      :headers="tableHeader"
      :items-per-page="pagination.itemsPerPage"
      :loading="loading"
      density="comfortable"
      return-object
      :key="8">
      <template #headers="{columns}">
        <tr>
          <th v-if="selective" width="5%" class="text-right">
            <v-checkbox
              v-model="selectAll"
              hide-details
              @click="toggleSelectAll"></v-checkbox>
          </th>
          <template v-for="column in columns" :key="column.title">
            <th
              :width="column.width"
              :class="[
                column.align === 'start'
                  ? 'text-right'
                  : column.align === 'end'
                  ? 'text-left'
                  : 'text-center'
              ]">
              <template v-if="column.sortable">
                <span class="mr-2 cursor-pointer" @click="sortColumn(column)">
                  {{ column.title }}
                </span>
                <v-icon
                  v-if="sort.sortField && column.value === sort.sortField"
                  :icon="
                    sort.sortType === 'asc' ? 'mdi-arrow-down' : 'mdi-arrow-up'
                  "></v-icon>
              </template>
              <span v-else>
                {{ column.title }}
              </span>
            </th>
          </template>
        </tr>
      </template>
      <template #item="{item, index}">
        <tr>
          <td v-if="selective">
            <v-checkbox v-model="selected" :value="item" hide-details />
          </td>
          <tableBody
            :item="item"
            :number="index + 1"
            :withEdit="withEdit"
            :withDelete="withDelete"
            :editUrl="editUrl"
            :actions="actions"
            @delete="_delete">
            <template #data="{item}">
              <slot name="data" :item="item" />
            </template>
            <template #delete>
              <slot name="delete" />
            </template>
            <template #extend_action>
              <slot name="extend_action" />
            </template>
          </tableBody>
        </tr>
      </template>
      <template v-slot:loading>
        <v-skeleton-loader type="table-row@10"></v-skeleton-loader>
      </template>
      <template #bottom>
        <tablePagination
          v-if="withPagination"
          :page="pagination.page"
          :totalPages="pagination.totalPages"
          @change-page="changePage"
          @change-page-size="changePageSize" />
      </template>
      <template #no-data>
        <div class="text-center">اطلاعاتی یافت نشد</div>
      </template>
    </v-data-table>
  </div>
</template>

<script lang="ts">
  import {defineComponent} from 'vue';

  export default defineComponent({
    name: 'DataGrid'
  });
</script>

<script lang="ts" setup>
  import type {IFilters, IHeaders} from './types';
  import Header from './components/header.vue';
  import Filters from './components/filters.vue';
  import tableBody from './components/tbody.vue';
  import tablePagination from './components/pagination.vue';
  import {ref, computed, onMounted, watch, inject} from 'vue';

  interface Props {
    headers: IHeaders[];
    service: any;
    deleteService?: (value: string) => void;
    filters: IFilters[];
    withPagination?: boolean;
    withHeader?: boolean;
    withActionBar?: boolean;
    withEdit?: boolean;
    withDelete?: boolean;
    title: {text?: string; icon?: string};
    createUrl?: string;
    editUrl?: (items: object) => void;
    selective?: boolean;
    actions?: any;
    withAction?: boolean;
  }

  const props = withDefaults(defineProps<Props>(), {
    headers: () => [],
    withPagination: true,
    withActionBar: true,
    withAction: true,
    withHeader: true,
    withEdit: true,
    withDelete: true,
    selective: false,
    actions: () => []
  });

  const pagination = ref({
    page: 1,
    itemsPerPage: 10,
    totalPages: 0
  });
  const sort = ref({
    sortType: 'asc',
    sortField: ''
  });
  const $toast: any = inject('toast');

  const items = ref([]);
  const loading = ref(false);
  const selectAll = ref(false);
  const params = ref<any>({});
  const filterData = ref({});
  const selected = ref([]);
  const select = defineModel('select');

  const tableHeader = computed(() => {
    const headers: any = props.headers;

    const action_exist = props.headers?.some(
      (item: any) => item.name == 'action'
    );

    const hashtag_exist = props.headers?.some(
      (item: any) => item.name == 'hashtag'
    );

    if (!hashtag_exist) {
      headers?.unshift({
        title: '#',
        name: 'hashtag',
        align: 'center',
        width: '5%',
        sortable: false
      });
    }
    if (!action_exist && props.withAction) {
      headers?.push({
        title: 'عملیات',
        name: 'action',
        align: 'start',
        width: '15%',
        sortable: false
      });
    }
    return headers;
  });

  watch(
    () => selected.value,
    (value: any) => {
      select.value = value;
    }
  );

  watch(
    () => filterData.value,
    (value: object) => {
      if (Object.entries(value).length !== 0) {
        filterData.value = value;
        buildQuary();
      }
    },
    {deep: true}
  );

  onMounted(() => {
    buildQuary();
  });

  function sortColumn(column: any) {
    sort.value.sortField = column.key;
    sort.value.sortType === 'asc'
      ? (sort.value.sortType = 'desc')
      : (sort.value.sortType = 'asc');
    buildQuary();
  }

  function changePage(page: number) {
    pagination.value.page = page;
    buildQuary();
  }
  function changePageSize(size: number) {
    pagination.value.itemsPerPage = size;
    buildQuary();
  }
  function buildQuary() {
    paramsBuilder();
    quary();
  }
  function quary() {
    loading.value = true;
    props.service.$query(params.value).then((res: any) => {
      items.value = res.data.data;
      pagination.value.page = res.data.currentPage;
      pagination.value.itemsPerPage = res.data.pageSize;
      pagination.value.totalPages = res.data.totalPages;
      loading.value = false;
    });
  }
  function paramsBuilder() {
    if (props.withPagination) {
      params.value.page = pagination.value.page;
      params.value.pageSize = pagination.value.itemsPerPage;
    }

    if (sort.value.sortField) {
      params.value.sortType = sort.value.sortType;
      params.value.sortField = sort.value.sortField;
    }

    if (Object.entries(filterData.value).length !== 0) {
      for (const [key, value] of Object.entries(filterData.value)) {
        params.value[key] = value;
      }
    }
  }

  function toggleSelectAll() {
    if (selected.value.length) {
      selected.value = [];
    } else {
      selected.value = items.value.slice();
    }
  }
  function _refresh() {
    params.value = {};
    pagination.value.page = 1;
    pagination.value.itemsPerPage = 10;
    filterData.value = {};
    sort.value = {
      sortType: 'asc',
      sortField: ''
    };
    buildQuary();
  }
  async function _delete(id: string): Promise<void> {
    let service = props.deleteService
      ? props.deleteService(id)
      : props.service.$delete(id);
    service.then(
      ({data, status}: {data: {message: string}; status: number}) => {
        if (status === 200) {
          buildQuary();
          $toast.showToast({
            message: 'آیتم با موفقیت حذف شد',
            type: 'success'
          });
        } else {
          $toast.showToast({
            message:
              data.message ||
              'خطایی رخ داده است لطفا مجدد تلاش کنید و یا با پشتیبانی تماس بگیرید.',
            type: 'error'
          });
        }
      }
    );
  }
</script>
<style lang="scss" scoped>
  .data-table {
    padding: 0 25px 25px;
    :deep(.v-table__wrapper) {
      border-radius: 10px;
      overflow-y: hidden;
      overflow-x: auto;

      .v-btn--icon.v-btn--density-default {
        width: 30px;
        height: 30px;
      }
      .v-selection-control--density-default {
        --v-selection-control-size: unset;
      }
      th {
        background: #dee2e6;
        color: #212529;
      }
      td,
      th {
        border: 1px solid #0000000d;
        text-align: right;
        font-size: 16px;
        height: 40px;
        padding-right: 5px;
      }

      tr:nth-child(even) {
        background-color: #0000000d;
      }
    }
  }
</style>
