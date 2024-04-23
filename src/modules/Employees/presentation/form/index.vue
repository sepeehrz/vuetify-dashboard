<template>
  <section ref="employeesForm">
    <form-generator
      v-model="items"
      :formData="formData"
      :title="title"
      :validationSchema="employeesManagementFormScheme"
      :service="request" />
  </section>
</template>
<script lang="ts" setup>
  import {inject, onMounted, ref} from 'vue';
  import employeesManagementFormScheme from '../../helpers/form/formSchema';
  import {useFormData} from '../../helpers/form/formData';
  import {EmployeesManagementService} from '../../helpers/service/index';
  import {get} from '@dashboard/application';
  import {useRoute} from 'vue-router';
  const request = get(EmployeesManagementService);
  const items = ref<any>({});

  const {formData} = useFormData();
  const $route = useRoute();
  const title = ref('');
  const $loader: any = inject('loader');
  const employeesForm = ref(null);
  const options = {
    width: 3,
    color: 'primary',
    size: 32
  };
  onMounted(async () => {
    if ($route.params.id) {
      const loading = $loader.show(employeesForm.value);
      const {data} = await request.$get($route.params.id);
      items.value = data.data;
      title.value = `مشاهده فرم ${data.data.name}`;
      loading.hide();
    } else {
      title.value = 'ایجاد جدید';
    }
  });
</script>
