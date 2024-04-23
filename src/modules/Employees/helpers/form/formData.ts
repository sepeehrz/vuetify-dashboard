import {ref} from 'vue';

export function useFormData() {
  const formData = ref([
    {
      rows: [
        {
          type: 'AutoCompleteField',
          model: 'organizationId',
          name: 'organizationId',
          label: 'نام سازمان',
          placeholder: 'نام سازمان را انتخاب کنید'
        },
        {
          label: 'نام',
          validation: ['required'],
          type: 'TextField',
          model: 'name',
          name: 'name',
          required: true,
          placeholder: 'نام خود را وارد کنید',
          singleValidation: true
        },
        {
          label: 'نام خانوادگی',
          validation: ['required'],
          type: 'TextField',
          model: 'surName',
          placeholder: 'نام خانوادگی خود را وارد کنید'
        },
        {
          type: 'SelectField',
          model: 'gender',
          label: 'جنسیت',
          validation: ['required'],
          placeholder: 'جنسیت خود را وارد کنید',
          items: [
            {value: 1, text: 'مرد'},
            {value: 2, text: 'زن'}
          ]
        },
        {
          label: 'نام پدر',
          type: 'TextField',
          model: 'fathersName',
          placeholder: 'نام پدر خود را وارد کنید'
        },
        {
          label: 'کد ملی',
          validation: ['required', 'nationalCode', 'digit'],
          type: 'TextField',
          model: 'nationalCode',
          placeholder: 'کد ملی خود را وارد کنید'
        },
        {
          label: 'شماره شناسنامه',
          validation: ['digit'],
          type: 'TextField',
          model: 'sejelCode',
          placeholder: 'شماره شناسنامه را وارد کنید'
        },
        {
          label: 'صادره از',
          type: 'AutoCompleteField',
          model: 'sejelFromId',
          placeholder: 'محل صدور خود را انتخاب کنید',
          items: []
        },
        {
          label: 'تاریخ تولد',
          type: 'DatePickerField',
          name: 'birthDate',
          model: 'birthDate',
          validation: ['required'],
          placeholder: 'تاریخ تولد خود را وارد کنید'
        },
        {
          label: 'سریال شناسنامه',
          type: 'TextField',
          model: 'sejelSerial',
          placeholder: 'سریال شناسنامه خود را وارد کنید'
        },
        {
          label: 'کد تامین اجتماعی',
          type: 'TextField',
          validation: ['digit'],
          model: 'insuranceCode',
          placeholder: 'کد تامین اجتماعی خود را وارد کنید'
        },
        {
          label: 'تلفن همراه',
          type: 'TextField',
          validation: ['required', 'digit'],
          model: 'mobile',
          placeholder: 'تلفن همراه خود را وارد کنید'
        },
        {
          label: 'پست الکترونیک',
          type: 'TextField',
          validation: ['email'],
          model: 'email',
          placeholder: 'پست الکترونیک خود را وارد کنید'
        },
        {
          label: 'تلفن  ثابت (به همراه پیش شماره)',
          validation: ['phone', 'digit'],
          type: 'TextField',
          model: 'tel',
          placeholder: 'شماره تلفن خود را وارد کنید'
        },
        {
          label: 'کد پستی',
          validation: ['postalCode', 'digit'],
          type: 'TextField',
          model: 'postalCode',
          placeholder: 'کد پستی خود را وارد کنید'
        },
        {
          label: 'استان',
          type: 'AutoCompleteField',
          items: [
            {value: 1, text: 'جعفر'},
            {value: 2, text: 'حسین'}
          ],
          model: 'cityProvinceId',
          placeholder: 'انتخاب یا جستجو کنید.'
        },
        {
          label: 'شهر',
          type: 'AutoCompleteField',
          items: [],
          model: 'cityId',
          placeholder: 'انتخاب یا جستجو کنید.'
        },
        {
          label: 'تاریخ استخدام',
          type: 'DatePickerField',
          model: 'hiringDate',
          validation: ['required'],
          placeholder: 'تاریخ استخدام خود را انتخاب کنید'
        },
        {
          label: 'تاریخ ترک کار',
          type: 'DatePickerField',
          model: 'leavingDate',
          placeholder: 'تاریخ ترک کار خود را انتخاب کنید',
          minKey: 'hiringDate'
        },
        {
          label: 'تاریخ مبنای محاسبات سنوات',
          type: 'DatePickerField',
          model: 'issueDate',
          validation: ['required'],
          placeholder: 'تاریخ تاریخ مبنای محاسبات سنوات خود را انتخاب کنید'
        },
        {
          label: ' حقوق پایه ناخالص',
          type: 'CurrencyField',
          validation: ['required'],
          model: 'netSalary',
          placeholder: 'حقوق پایه ناخالص خود را وارد کنید'
        },
        {
          label: 'سقف اعتباری (ریال)',
          type: 'CurrencyField',
          model: 'creditCeiling',
          placeholder: 'سقف اعتباری  خود را وارد کنید'
        },
        {
          label: 'آدرس',
          type: 'TextField',
          model: 'address',
          placeholder: 'آدرس کارمند را وارد کنید'
        }
      ]
    }
  ]);
  return {formData};
}
