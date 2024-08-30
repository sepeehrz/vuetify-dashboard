<template>
  <v-checkbox
    v-model="model"
    :label="field.label"
    :name="field.name"
    :color="field.color"
    hide-details></v-checkbox>
</template>

<script lang="ts" setup>
  interface Props {
    field: any;
    errorMessage: string | undefined;
  }
  withDefaults(defineProps<Props>(), {});

  const model = defineModel();
</script>
<style lang="scss" scoped>
  .required {
    font-size: 16px;
    font-weight: bold;
    color: red;
  }
</style>
