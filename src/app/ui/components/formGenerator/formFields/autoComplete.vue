<template>
  <v-autocomplete
    autocomplete="off"
    v-model="model"
    :items="field.items"
    :name="field.name"
    :placeholder="field.placeholder"
    :custom-filter="customFilter"
    :hint="field.hint"
    color="primary"
    prepend-inner-icon="mdi-magnify"
    :variant="field.variant || 'outlined'"
    :error-messages="errorMessage"
    :disabled="field.disabled"
    persistent-hint
    clearable
    auto-select-first>
    <template #label>
      <span>
        {{ field.label }}
        <span v-if="field.required" class="required">*</span>
      </span>
    </template>
    <template v-slot:selection="{item}">
      <span>
        {{ (item.props as unknown as ItemProps).title.text }}
      </span>
    </template>

    <template v-slot:item="{props, item}">
      <v-list-item
        v-bind="props"
        :title="(item.props as unknown as ItemProps).title.text"></v-list-item>
    </template>
    <template #no-data>
      <div class="no-result">موردی یافت نشد</div>
    </template>
  </v-autocomplete>
</template>

<script lang="ts" setup>
  defineOptions({
    inheritAttrs: false
  });
  interface Title {
    text: string;
  }

  interface ItemProps {
    title: Title;
  }

  interface Props {
    field: any;
    errorMessage: string | undefined;
  }
  interface Props {
    field: any;
    errorMessage: string | undefined;
  }
  withDefaults(defineProps<Props>(), {});

  const model = defineModel();

  function customFilter(value: string, queryText: string, item?: any) {
    const data = item.raw.text.toLowerCase();
    const searchText = queryText.toLowerCase();
    return data.indexOf(searchText) > -1;
  }
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
