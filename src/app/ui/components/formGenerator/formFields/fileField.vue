<template>
  <v-file-input
    v-bind="$attrs"
    v-model="selectedFile"
    :rules="rules"
    accept="image/*"
    clearable
    prepend-inner-icon="mdi-camera"
    prepend-icon=""
    :variant="field.varient || 'outlined'"
    :error-messages="errorMessage"
    show-size
    @click:clear="clearImages"
    @change="onFileChange">
    <template #label>
      <span>
        {{ field.label }}
        <span v-if="field.required" class="required">*</span>
      </span>
    </template>
  </v-file-input>
  <div v-if="image" class="image-wrapper">
    <img :src="image" :alt="field.name" />
  </div>
</template>

<script lang="ts" setup>
  import {ref, watch} from 'vue';
  import axios from 'axios';
  import {useRoute} from 'vue-router';
  interface Props {
    field: any;
    errorMessage: string | undefined;
  }
  const props = withDefaults(defineProps<Props>(), {});
  const model: any = defineModel();
  const selectedFile = ref<File[]>([]);
  const $route = useRoute();
  const image = ref<string>('');
  const baseStorageUrl = 'https://storage.iran.liara.space/lendroll/';
  const rules = [
    (value: string | any[]) => {
      return (
        !value ||
        !value.length ||
        value[0].size < 2000000 ||
        'سایز عکس نباید بیشتر از 2 مگابایت باشد'
      );
    }
  ];
  watch(
    () => model.value,
    value => {
      if (!value) {
        return;
      }
      if ($route.fullPath.includes('create')) {
        return;
      }
      image.value = baseStorageUrl + props.field.targetPath + '/' + value;
      createFileNameFromServer(image.value);
    },
    {immediate: true}
  );
  function createImage(file: any) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      image.value = e.target.result;
    };
    reader.readAsDataURL(file[0]);
  }
  function onFileChange(file: any) {
    if (!file) {
      return;
    }
    uploadFile(selectedFile.value).then((response: boolean) => {
      if (response) {
        createImage(selectedFile.value);
      }
    });
  }
  function clearImages() {
    selectedFile.value = [];
    image.value = '';
    model.value = '';
  }
  async function uploadFile(file: any): Promise<boolean> {
    return new Promise(async resolve => {
      if (!file) {
        return;
      }
      const formData = new FormData();
      formData.append('targetPath', props.field.targetPath);
      formData.append('formFile', file[0]);

      const {data} = await axios.post(`/Admin/api/Files/Upload`, formData, {
        headers: {
          'Content-Type': `multipart/form-data`
        }
      });
      if (data.successful) {
        model.value = data.fileName;
        resolve(true);
      }
    });
  }
  async function createFileNameFromServer(fileUrl: string) {
    try {
      const response = await axios.get(fileUrl, {
        responseType: 'blob'
      });
      const blob = new Blob([response.data], {
        type: response.headers['content-type']
      });
      const file = new File([blob], model.value, {type: blob.type});

      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);
      selectedFile.value.push(dataTransfer.files[0]);
    } catch (error) {
      console.error(error);
    }
  }
</script>
<style lang="scss" scoped>
  .required {
    font-size: 16px;
    font-weight: bold;
    color: red;
  }
  .image-wrapper {
    background-color: #dbdbdb;
    border-radius: 10px;
    width: 100%;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      max-height: 400px;
    }
  }
</style>
