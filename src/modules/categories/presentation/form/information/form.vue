<template>
  <section ref="suppliersForm">
    <form-generator
      v-model="items"
      :formData="formFieldData"
      :title="title"
      :validationSchema="CategoriesFormScheme"
      :service="request" />
  </section>
</template>
<script lang="ts" setup>
  import {useRoute} from 'vue-router';
  import {getInstance} from '@app/utils';
  import {useFormData} from './formData';
  import {inject, onMounted, ref} from 'vue';
  import {CategoriesService} from '../../../logics/service';
  import CategoriesFormScheme from './formValidationSchema';

  const $loader: any = inject('loader');
  const request = getInstance(CategoriesService);
  const items = ref<any>({isActive: true});
  const {formFieldData} = useFormData();
  const $route = useRoute();
  const title = ref('');
  const suppliersForm = ref(null);

  onMounted(async () => {
    if ($route.params.id) {
      const loading = $loader.show(suppliersForm.value);
      const {data} = await request.$queryWithHeader({id: $route.params.id});
      items.value = data.data;
      title.value = `مشاهده فرم ${data.data.title}`;
      loading.hide();
    } else {
      title.value = 'ایجاد دسته بندی جدید';
    }
  });
</script>
