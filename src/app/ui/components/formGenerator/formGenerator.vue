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
      :validationSchema="validationSchema">
      <template #extra-form-item>
        <slot name="extra-form-item" />
      </template>
    </formItems>
    <slot name="extend-form" />
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
  import {useRouter} from 'vue-router';

  interface Props {
    formData: any;
    service?: any;
    backUrl?: string;
    saveUrl?: string;
    withSave?: boolean;
    title?: string;
    validationSchema: any;
    saveForm?: (params: object) => void;
    afterSave?: (params: object) => void;
    beforeSave?: (params: object) => void;
  }
  const props = withDefaults(defineProps<Props>(), {
    formData: () => [],
    withSave: true,
    title: 'فرم'
  });
  const model = defineModel();

  const $router = useRouter();
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
    props.validationSchema
      .validate(cleanFormData.value, {abortEarly: false})
      .then((response: {id: string | number}) => {
        errorMessage.value = {};
        if (props.saveForm) {
          return props.saveForm(response);
        }
        if (props.service) {
          loading.value = true;
          if (props.beforeSave) {
            props.beforeSave(response);
          }
          let result;
          if (response.hasOwnProperty('id')) {
            result = props.service.$updateWithHeader({data: response});
          } else {
            result = props.service.$save({data: response});
          }
          result.then(
            ({data}: {data: {messages: string; successful: boolean}}) => {
              if (data.successful === true) {
                $toast.showToast({
                  message: 'فرم با موفقیت ذخیره شد',
                  type: 'success'
                });
                if (props.afterSave) {
                  return props.afterSave(data);
                }
                saveUrl();
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
    border-bottom: 1px solid #e4e4e4;
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
        i {
          line-height: 0;
        }
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
        background: $light_blue_color !important;
      }
      .save-btn {
        color: #fff !important;
      }
    }
  }
</style>
