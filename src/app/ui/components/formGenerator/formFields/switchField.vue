<template>
  <div class="switch-field-item">
    <div class="label" :class="{active: model, inActive: !model}">
      <template v-if="field.label">
        {{ field.label }}
      </template>
      <template v-else>
        {{ model ? 'فعال' : 'غیرفعال' }}
      </template>
      <span v-if="field.required" class="required">*</span>
    </div>
    <v-switch
      v-bind="$attrs"
      :name="field.name"
      v-model="model"
      color="#198754"
      hide-details />
  </div>
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
  .switch-field-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    background-color: $light_blue_color;
    border-radius: 5px;
    .label {
      font-size: 15px;
      font-weight: 500;
      &.active {
        color: #198754;
      }
      &.inActive {
        color: #dc3545;
      }
    }
  }
  .required {
    font-size: 16px;
    font-weight: bold;
    color: red;
  }
</style>
