<template>
  <v-select
    autocomplete="off"
    v-model="model"
    :name="field.name"
    :items="field.items"
    :placeholder="field.placeholder"
    :hint="field.hint"
    :multiple="field.multiple"
    :chips="field.chips"
    item-title="text"
    color="primary"
    item-value="value"
    :variant="field.variant || 'outlined'"
    :disabled="field.disabled"
    :error-messages="errorMessage"
    clearable
    persistent-hint>
    <template #chip="{item}" v-if="field.chips">
      <v-chip
        size="small"
        :variant="field.chipsVariant || 'outlined'"
        :color="setChipsColor(item)"
        rounded>
        {{ item.title }}
      </v-chip>
    </template>
    <template #label>
      <span>
        {{ field.label }}
        <span v-if="field.required" class="required">*</span>
      </span>
    </template>
  </v-select>
</template>

<script lang="ts" setup>
  interface Props {
    field: any;
    errorMessage: string | undefined;
  }
  withDefaults(defineProps<Props>(), {});

  const model = defineModel();

  function setChipsColor(item: any) {
    return item.raw && item.raw.color ? item.raw.color : 'primary';
  }
</script>
<style lang="scss" scoped>
  .required {
    font-size: 16px;
    font-weight: bold;
    color: red;
  }
</style>
