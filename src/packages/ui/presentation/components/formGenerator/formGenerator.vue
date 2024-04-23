<template>
  <div class="form">
    <div class="form-header">
      <h3>{{ title }}</h3>
      <div class="form-actions">
        <v-btn class="back-btn" size="large" variant="flat" @click="goBack">
          <template v-slot:prepend>
            <div class="icon-shape icon-back">
              <v-icon color="#ced4da">mdi-chevron-right</v-icon>
            </div>
          </template>
          برگشت
        </v-btn>
        <v-btn
          v-if="withSave"
          size="large"
          variant="flat"
          class="save-btn"
          :loading="loading"
          @click="save">
          <template v-slot:prepend>
            <div class="icon-shape icon-save">
              <v-icon color="#ced4da">mdi-chevron-left</v-icon>
            </div>
          </template>
          ذخیره
        </v-btn>
      </div>
    </div>
    <formItems
      v-model="model"
      :form-data="formData"
      :error-message="errorMessage"
      :validationSchema="validationSchema" />
  </div>
</template>
<script lang="ts">
  import {defineComponent} from 'vue';

  export default defineComponent({
    name: 'FormGenerator'
  });
</script>

<script lang="ts" setup>
  import {ref, computed, inject} from 'vue';
  import formItems from './formItems.vue';
  import type {IFormData} from './types/types';
  import {useRoute, useRouter} from 'vue-router';
  import type {RequestAxiosResource} from '@dashboard/utils/axios/types/AxiosTypes';

  interface Props {
    formData: IFormData[];
    service?: RequestAxiosResource;
    backUrl?: string;
    saveUrl?: string;
    withSave?: boolean;
    title?: string;
    // {validate: (s: any, t: any) => Promise<object>}
    validationSchema: any;
    saveForm?: (params: object) => void;
  }
  const props = withDefaults(defineProps<Props>(), {
    formData: () => [],
    withSave: true,
    title: 'فرم'
  });
  const model = defineModel();

  const $router = useRouter();
  const $route = useRoute();
  const errorMessage = ref<Record<string, object>>({});
  const loading = ref<boolean>(false);
  const $toast = inject<any>('toast');
  const checkJustSpace = (str: string) => /^\s*$/.test(str);
  const cleanFormData = computed(() => {
    const data: any = model.value;
    for (const item in data) {
      if (data[item] === '') {
        delete data[item];
      }
      if (checkJustSpace(data[item])) {
        delete data[item];
      }
    }
    return data;
  });
  function save() {
    // loading az kharej az safhe ham ezafe shavad

    props.validationSchema
      .validate(cleanFormData.value, {abortEarly: false})
      .then((response: object) => {
        errorMessage.value = {};
        if (props.saveForm) {
          return props.saveForm(response);
        }
        if (props.service) {
          loading.value = true;
          let result;
          if ($route.params.id) {
            result = props.service.$update($route.params.id, response);
          } else {
            result = props.service.$save(response);
          }
          result.then(
            ({data, status}: {data: {message: string}; status: number}) => {
              if (status === 200) {
                $toast.showToast({
                  message: `${data.message} تا لحظاتی دیگر به صفحه لیست منتقل میشوید`,
                  type: 'success'
                });
                saveUrl();
              } else {
                $toast.showToast(
                  {
                    message:
                      data.message ||
                      'خطایی رخ داده است لطفا مجدد تلاش کنید یا به ادمین پنل پیام دهید',
                    type: 'error'
                  },
                  'bottom_left'
                );
              }
            }
          );
        }
        loading.value = false;
      })
      .catch(
        (err: {
          inner: {
            path: string | number;
            message: any;
          }[];
        }) => {
          errorMessage.value = {};
          err.inner.forEach((error: {path: string | number; message: any}) => {
            errorMessage.value[error.path] = error.message;
          });
          loading.value = false;
        }
      );
  }
  function saveUrl() {
    if (props.saveUrl) {
      $router.push(props.saveUrl);
    } else {
      $router.go(-1);
    }
  }
  function goBack() {
    if (props.backUrl) {
      $router.push(props.backUrl);
    } else {
      $router.go(-1);
    }
  }
</script>
<style lang="scss" scoped>
  .form-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 80px;
    padding: 0 16px;
    position: sticky;
    top: 0;
    background-color: #fff;
    z-index: 10;
    border-bottom: 1px solid rgb(var(--v-theme-primary));
    h3 {
      font-size: 16px;
      color: #000;
    }
    .form-actions {
      .icon-shape {
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 3px;
        width: 18px;
        height: 18px;
      }
      .icon-back {
        background-color: #212529;
      }
      .icon-save {
        background-color: #fff;
      }
      .back-btn {
        margin-left: 10px;
        border: 1px solid #d1cbcc;
        color: #000 !important;
        background: #d1cbcc !important;
      }
      .save-btn {
        color: #fff !important;
      }
    }
  }
</style>
