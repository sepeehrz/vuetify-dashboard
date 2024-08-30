<template>
  <div id="data-table-grid">
    <Header
      :title="title"
      :withHeader="withHeader"
      :withActionBar="withActionBar"
      :create-url="createUrl"
      @reset-table="_refresh"
      @download-excel="downloadExcel"
      :isRecycleBin="isRecycleBin"
      :withExcelDownload="withExcelDownload"
      :withAdd="withAdd"
      :withRecycleBin="withRecycleBin"
      @recycleBinList="recycleBinList">
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

    <Filters
      @filter-data="getFiltersData"
      :filters="filters"
      :refresh-grid="refreshGrid" />

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
                <span class="cursor-pointer" @click="sortColumn(column)">
                  {{ column.title }}
                </span>
                <v-icon
                  color="#fff"
                  v-if="sort.sortField && column.value === sort.sortField"
                  :icon="
                    sort.sortType === 'asc'
                      ? 'mdi-arrow-down'
                      : sort.sortType === 'desc'
                        ? 'mdi-arrow-up'
                        : ''
                  "></v-icon>
              </template>
              <span v-else>
                {{ column.title }}
              </span>
            </th>
          </template>
        </tr>
      </template>
      <template #item="{item}">
        <tr>
          <td v-if="selective">
            <v-checkbox v-model="selected" :value="item" hide-details />
          </td>
          <tableBody
            :item="item"
            :withEdit="withEdit"
            :withDelete="withDelete"
            :withAction="withAction"
            :editUrl="editUrl"
            :actions="actions"
            @delete="_delete"
            @restore="_restore"
            :isRecycleBin="isRecycleBin">
            <template #data="{item}">
              <slot name="data" :item="item" />
            </template>
            <template #actions="{item}">
              <slot name="actions" :item="item" />
            </template>
            <template #delete>
              <slot name="delete" />
            </template>
            <template #extend_action="{item}">
              <slot name="extend_action" :item="item" />
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
  import {useDownloadExcel} from '@app/utils';
  import Header from './components/header.vue';
  import Filters from './components/filters.vue';
  import tableBody from './components/tbody.vue';
  import tablePagination from './components/pagination.vue';
  import {ref, computed, onMounted, watch, inject} from 'vue';
  interface Props {
    headers: IHeaders[];
    service: any;
    dataGrid?: any;
    queryService?: any;
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
    excelUrl?: string;
    withExcelDownload?: boolean;
    withAdd?: boolean;
    withRecycleBin?: boolean;
    defaultFilter?: any;
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
    withExcelDownload: true,
    withRecycleBin: true,
    withAdd: true,
    dataGrid: {},
    actions: () => []
  });

  const pagination = ref({
    page: 1,
    itemsPerPage: 10,
    totalPages: 0
  });
  const sort = ref({
    sortType: '',
    sortField: ''
  });
  const $toast: any = inject('toast');

  const items = ref([]);
  const loading = ref(false);
  const selectAll = ref(false);
  const refreshGrid = ref(false);
  const params = ref<any>({});
  const filterData = ref({});
  const selected = ref([]);
  const isRecycleBin = ref(false);
  const select = defineModel('select');

  const tableHeader = computed(() => {
    const headers: any = props.headers;

    const action_exist = props.headers?.some(
      (item: any) => item.name == 'action'
    );
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

  onMounted(() => {
    buildQuary();
    props.dataGrid.refresh = () => {
      buildQuary();
    };
  });

  function getFiltersData(value: object) {
    if (Object.entries(value).length !== 0) {
      filterData.value = value;
      refreshGrid.value = false;
      buildQuary();
    }
  }
  function sortColumn(column: any) {
    sort.value.sortField = column.key;
    sort.value.sortType === ''
      ? (sort.value.sortType = 'asc')
      : sort.value.sortType === 'asc'
        ? (sort.value.sortType = 'desc')
        : (sort.value.sortType = '');
    selectQuery();
  }

  function changePage(page: number) {
    pagination.value.page = page;
    selectQuery();
  }
  function changePageSize(size: number) {
    pagination.value.itemsPerPage = size;
    selectQuery();
  }
  function selectQuery() {
    if (isRecycleBin.value) {
      deleteQuary();
    } else {
      buildQuary();
    }
  }
  function buildQuary() {
    paramsBuilder();
    quary();
  }
  function quary() {
    loading.value = true;
    let service = props.queryService
      ? props.queryService(params.value)
      : props.service.$list(params.value);
    service.then(
      ({data}: {data: {successful: boolean; data: []; totalPages: number}}) => {
        if (data.successful === true) {
          items.value = data.data;
          pagination.value.totalPages = data.totalPages;
          loading.value = false;
        }
      }
    );
  }
  function paramsBuilder() {
    if (props.defaultFilter) {
      params.value = props.defaultFilter;
    }
    if (props.withPagination) {
      params.value.currentPage = pagination.value.page;
      params.value.pageSize = pagination.value.itemsPerPage;
    }

    if (sort.value.sortField) {
      params.value.sortType = sort.value.sortType;
      params.value.sortField = sort.value.sortField;
    }

    if (Object.entries(filterData.value).length !== 0) {
      params.value = Object.assign(params.value, filterData.value);
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
    isRecycleBin.value = false;
    refreshGrid.value = true;
    sort.value = {
      sortType: 'asc',
      sortField: ''
    };
    buildQuary();
  }
  async function downloadExcel() {
    const data = await props.service.$export(
      {fileName: 'harchi'},
      props.excelUrl
    );
    useDownloadExcel(data);
  }
  async function recycleBinList() {
    isRecycleBin.value = !isRecycleBin.value;
    selectQuery();
  }
  function deleteQuary() {
    paramsBuilder();
    _deletedList();
  }
  async function _deletedList(): Promise<void> {
    loading.value = true;
    props.service
      .$deleteListWithHeader(params.value)
      .then(
        ({
          data
        }: {
          data: {successful: boolean; data: []; totalPages: number};
        }) => {
          if (data.successful) {
            items.value = data.data;
            pagination.value.totalPages = data.totalPages;
            loading.value = false;
          }
        }
      );
  }
  async function _delete(id: string): Promise<void> {
    let service = props.deleteService
      ? props.deleteService(id)
      : props.service.$deleteWithHeader({id});
    service.then(
      ({
        data
      }: {
        data: {
          successful: boolean;
          data: [];
          totalPages: number;
          messages: string[];
        };
      }) => {
        if (data.successful) {
          buildQuary();
          $toast.showToast({
            message: 'آیتم با موفقیت حذف شد',
            type: 'success'
          });
        } else {
          for (const error of data.messages) {
            $toast.showToast(
              {
                message:
                  error ||
                  'خطایی رخ داده است لطفا مجدد تلاش کنید یا به ادمین پنل پیام دهید',
                type: 'error'
              },
              'bottom_left'
            );
          }
        }
      }
    );
  }
  async function _restore(id: string): Promise<void> {
    props.service.$restoreWithHeader({id}).then(
      ({
        data
      }: {
        data: {
          successful: boolean;
          data: [];
          totalPages: number;
          messages: string[];
        };
      }) => {
        if (data.successful) {
          deleteQuary();
          $toast.showToast({
            message: 'آیتم با موفقیت بازیابی شد',
            type: 'success'
          });
        } else {
          for (const error of data.messages) {
            $toast.showToast(
              {
                message:
                  error ||
                  'خطایی رخ داده است لطفا مجدد تلاش کنید یا به ادمین پنل پیام دهید',
                type: 'error'
              },
              'bottom_left'
            );
          }
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

      &::-webkit-scrollbar {
        height: 5px;
      }

      &::-webkit-scrollbar-thumb {
        background: rgb(var(--v-theme-primary));
        border-radius: 10px;
      }

      .v-btn--icon {
        &.v-btn--density-default {
          width: 30px;
          height: 30px;
        }
      }
      .v-selection-control--density-default {
        --v-selection-control-size: unset;
      }
      th {
        background: rgb(var(--v-theme-primary));
        span {
          color: #fff;
        }
      }
      td,
      th {
        border-bottom: 0 !important;
        text-align: right;
        font-size: 16px;
        height: 50px;
        padding-right: 10px;
        white-space: nowrap;
      }
      tr:nth-child(even) {
        background-color: $light_blue_color;
      }
    }
  }
</style>
