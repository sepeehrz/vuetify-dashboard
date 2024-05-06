<template>
  <v-text-field
    autocomplete="off"
    v-bind="$attrs"
    v-model="model"
    :name="field.name"
    :variant="field.varient || 'outlined'"
    :placeholder="field.placeholder"
    :hint="field.hint"
    :disabled="field.disabled"
    :error-messages="errorMessage"
    clearable>
    <template #label>
      <span>
        {{ field.label }}
        <span v-if="field.required" class="required">*</span>
      </span>
    </template>
  </v-text-field>
</template>

<script lang="ts" setup>
  interface Props {
    field: any;
    errorMessage: string | undefined;
  }
  withDefaults(defineProps<Props>(), {});
  // defineOptions({
  //   inheritAttrs: false
  // });
  const model = defineModel();
</script>
<style lang="scss" scoped>
  .required {
    font-size: 16px;
    font-weight: bold;
    color: red;
  }
</style>
