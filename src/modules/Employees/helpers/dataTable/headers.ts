import {ref} from 'vue';

export function useHeaders() {
  const headers = ref([
    {
      title: 'نام',
      align: 'right',
      width: '10%',
      sortable: true,
      key: 'name'
    },
    {
      title: 'نام خانوادگی',
      align: 'right',
      width: '15%',
      sortable: true,
      key: 'surName'
    },
    {
      title: 'کد ملی',
      align: 'right',
      width: '15%',
      sortable: true,
      key: 'nationalCode'
    },
    {
      title: 'تاریخ استخدام',
      align: 'right',
      width: '20%',
      sortable: true,
      key: 'hiringDate'
    },
    {
      title: 'تاریخ ترک کار',
      align: 'right',
      width: '15%',
      sortable: true,
      key: 'leavingDate'
    },
    {
      title: 'وضعیت',
      align: 'center',
      width: '10%',
      sortable: true,
      key: 'isActive'
    }
  ]);
  return {headers};
}
