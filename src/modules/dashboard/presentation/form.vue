<template>
  <form-generator
    v-model="items"
    :formData="formData"
    :validationSchema="loginFormSchema" />
</template>
<script lang="ts" setup>
  import {ref} from 'vue';
  import loginFormSchema from './formSchema';

  const items = ref<any>({});

  const formData = ref([
    {
      title: 'مشخصات برنامه ریزی',
      rows: [
        {
          label: 'ایمیل',
          type: 'TextField',
          model: 'email',
          name: 'ایمیل',
          placeholder: 'ایمیل',
          hint: 'ایمیل خود را وارد نمایید'
        },
        {
          label: 'پسورد',
          type: 'TextField',
          model: 'password',
          placeholder: 'پسورد',
          hint: 'پسورد خود را وارد نمایید'
        },
        {
          label: 'مبلغ کل',
          type: 'Currency',
          model: 'money',
          disabled: false,
          placeholder: 'sdsdsd',
          hint: 'Enter your password to access this website'
        }
        // {
        //   label: 'مبلغ اولین قسط',
        //   type: 'AutoCompleteField',
        //   placeholder: 'sdsdsd',
        //   hint: 'Enter your password to access this website',

        //   items: [
        //     {
        //       text: 'California',
        //       value: 1
        //     },
        //     {
        //       text: 'Colorado',
        //       value: 2
        //     },
        //     {
        //       text: 'Florida',
        //       value: 3
        //     },
        //     {
        //       text: 'Georgia',
        //       value: 4
        //     }
        //   ],
        //   model: 'monthlyAmounts'
        //   // disabled: true,
        // },
        // {
        //   label: '2مبلغ اولین قسط',
        //   type: 'SelectField',
        //   placeholder: 'sdsdsd',
        //   hint: 'Enter your password to access this website',
        //   items: [
        //     {
        //       text: 'California',
        //       value: 1
        //     },
        //     {
        //       text: 'Colorado',
        //       value: 2
        //     },
        //     {
        //       text: 'Florida',
        //       value: 3
        //     },
        //     {
        //       text: 'Georgia',
        //       value: 4
        //     }
        //   ],
        //   model: 'monthlyAmount'
        //   // disabled: true,
        // },
        // {
        //   label: 'دیت پیکر',
        //   type: 'DatePicker',
        //   model: 'installmentCount',
        //   disabled: false
        // },
        // {
        //   label: 'مبلغ کل',
        //   type: 'Currency',
        //   model: 'totalInstallmentAmout',
        //   disabled: false,
        //   placeholder: 'sdsdsd',
        //   hint: 'Enter your password to access this website'
        // },
        // // {
        // //   label: "مبلغ پرداخت شده",
        // //   type: "Currency",
        // //   model: "totalPaidInstallmentAmout",
        // //   disabled: true,
        // // },
        // // {
        // //   label: "مبلغ برنامه ریزی شده",
        // //   type: "Currency",
        // //   model: "totalPlannedInstallmentAmout",
        // //   disabled: true,
        // // },
        // {
        //   label: 'فاصله تا هدف',
        //   type: 'TextField',
        //   model: 'totalUnpaidInstallmentAmout',
        //   disabled: true
        // }
        // {
        //   label: "سود",
        //   type: "Currency",
        //   model: "untilNowProfitAmount",
        //   disabled: true,
        // },
        // {
        //   label: "مبلغ باز خرید",
        //   type: "Currency",
        //   model: "redemptionAmount",
        //   disabled: true,
        // },
      ]
    }
    // {
    //   title: 'مشخصات مالی',
    //   rows: [
    //     {
    //       label: 'بانک مبدا',
    //       type: 'TextField',
    //       model: 'sourceBankName',
    //       disabled: true
    //     },
    //     {
    //       label: 'شماره حساب مبدا',
    //       type: 'TextField',
    //       model: 'sourceBankAccountNumber',
    //       disabled: true
    //     },
    //     {
    //       label: 'بانک مقصد',
    //       type: 'TextField',
    //       model: 'targetBankName',
    //       disabled: true
    //     },
    //     {
    //       label: 'شماره حساب مقصد',
    //       type: 'TextField',
    //       model: 'targetBankAccountNumber',
    //       disabled: true
    //     }
    //   ]
    // }
    // {
    //   title: 'مشخصات فردی',
    //   rows: [
    //     {
    //       label: 'شرکت',
    //       type: 'TextField',
    //       model: 'organizationName',
    //       disabled: true
    //     },
    //     {
    //       label: 'نام',
    //       type: 'TextField',
    //       model: 'name',
    //       disabled: true
    //     },
    //     {
    //       label: 'نام خانوادگی',
    //       type: 'TextField',
    //       model: 'surName',
    //       disabled: true
    //     },
    //     {
    //       label: 'کد ملی',
    //       type: 'TextField',
    //       model: 'nationalCode',
    //       disabled: true
    //     },
    //     {
    //       label: 'نام پدر',
    //       type: 'TextField',
    //       model: 'fathersName',
    //       disabled: true
    //     },
    //     {
    //       label: 'شماره شناسنامه',
    //       type: 'TextField',
    //       model: 'sejelCode',
    //       disabled: true
    //     },
    //     {
    //       label: 'صادره از',
    //       type: 'TextField',
    //       model: 'sejelFrom',
    //       disabled: true
    //     },
    //     // {
    //     //   label: "تاریخ تولد",
    //     //   type: "DatePicker",
    //     //   model: "birthDate",
    //     //   disabled: true,
    //     // },
    //     {
    //       label: 'سریال شناسنامه',
    //       type: 'TextField',
    //       model: 'sejelSerial',
    //       placeholder: 'sdsdsd',
    //       disabled: true
    //     },
    //     {
    //       label: 'کد تامین اجتماعی',
    //       type: 'TextField',
    //       model: 'insuranceCode',
    //       disabled: true
    //     },
    //     {
    //       label: 'تلفن همراه',
    //       type: 'TextField',
    //       model: 'mobile',
    //       disabled: true
    //     },
    //     {
    //       label: 'پست الکترونیک',
    //       type: 'TextField',
    //       model: 'email',
    //       disabled: true
    //     },
    //     {
    //       label: 'تلفن ثابت',
    //       type: 'TextField',
    //       model: 'tel',
    //       disabled: true
    //     },
    //     {
    //       label: 'کد پستی',
    //       type: 'TextField',
    //       model: 'postalCode',
    //       disabled: true
    //     },
    //     {
    //       label: 'استان',
    //       type: 'TextField',
    //       model: 'province',
    //       disabled: true
    //     },
    //     {
    //       label: 'شهر',
    //       type: 'TextField',
    //       model: 'cityName',
    //       disabled: true
    //     },
    //     {
    //       label: 'آدرس',
    //       type: 'TextField',
    //       model: 'address',
    //       disabled: true,
    //       column: 6
    //     }
    //   ]
    // }
  ]);
</script>
