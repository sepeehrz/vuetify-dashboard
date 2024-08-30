import {ref} from 'vue';

export function useHeaders() {
  const headers = ref([
    {
      title: 'نام دسته بندی',
      align: 'start',
      width: '20%',
      sortable: true,
      key: 'title'
    },
    {
      title: 'توضیحات',
      align: 'start',
      width: '50%'
    },
    {
      title: 'وضعیت',
      align: 'start',
      width: '20%',
      sortable: true,
      key: 'isActive'
    }
  ]);
  return {headers};
}
