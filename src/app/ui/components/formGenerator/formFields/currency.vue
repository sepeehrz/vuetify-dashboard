<template>
  <currency
    v-model="model"
    :name="field.name"
    :label="field.label"
    :variant="field.varient || 'outlined'"
    :placeholder="field.placeholder"
    :error-messages="errorMessage"
    :required="field.required"
    :hint="field.hint"
    :disabled="field.disabled" />
</template>

<script lang="ts" setup>
  import currency from '../../forms/currency.vue';
  interface Props {
    field: any;
    errorMessage: string | undefined;
  }
  withDefaults(defineProps<Props>(), {});

  const model = defineModel();
</script>
<style lang="scss" scoped></style>
