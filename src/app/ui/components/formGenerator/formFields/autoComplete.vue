<template>
  <v-autocomplete
    autocomplete="off"
    v-model="model"
    :name="field.name"
    :items="field.items"
    :placeholder="field.placeholder"
    :hint="field.hint"
    :multiple="field.multiple"
    :chips="field.chips"
    item-title="text"
    item-value="value"
    prepend-inner-icon="mdi-magnify"
    :variant="field.variant || 'outlined'"
    :error-messages="errorMessage"
    :disabled="field.disabled"
    clearable
    persistent-hint>
    <template #label>
      <span>
        {{ field.label }}
        <span v-if="field.required" class="required">*</span>
      </span>
    </template>
    <template #no-data>
      <div class="no-result">موردی یافت نشد</div>
    </template>
  </v-autocomplete>
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
  .no-result {
    text-align: center;
    padding: 10px 0;
  }
  .required {
    font-size: 16px;
    font-weight: bold;
    color: red;
  }
</style>
