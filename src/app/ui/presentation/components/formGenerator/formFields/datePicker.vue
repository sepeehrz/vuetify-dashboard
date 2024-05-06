<template>
  <datePicker
    v-model="model"
    :label="field.label"
    :min="field.min"
    :max="field.max"
    :placeholder="field.placeholder"
    :hint="field.hint"
    :required="field.required"
    :error-messages="errorMessage"
    :disabled="field.disabled" />
</template>
<script lang="ts" setup>
  import datePicker from '../../forms/datePicker.vue';
  // defineOptions({
  //   inheritAttrs: false
  // });
  interface Props {
    field: any;
    errorMessage: string | undefined;
  }
  withDefaults(defineProps<Props>(), {});
  const model: any = defineModel();
</script>
<style lang="scss" scoped></style>
