<template>
  <div class="Lr--data-table__search">
    <slot name="filters"></slot>
    <v-row>
      <v-col v-for="(item, index) in filters" :key="index" :sm="item.col || 4">
        <template v-if="item.type === 'select'">
          <v-select
            v-model="model[item.model]"
            :name="item.name"
            :items="item.items"
            :label="item.label"
            :placeholder="item.placeholder"
            :hint="item.hint"
            item-title="text"
            item-value="value"
            :variant="item.variant || 'outlined'"
            :disabled="item.disabled"
            clearable
            persistent-hint></v-select>
        </template>
        <template v-else>
          <v-text-field
            color="primary"
            autocomplete="off"
            v-model="model[item.model]"
            :name="item.name"
            :label="item.label"
            prepend-inner-icon="mdi-magnify"
            :variant="item.variant || 'outlined'"
            :placeholder="item.placeholder"
            :hint="item.hint"
            :disabled="item.disabled"
            clearable></v-text-field>
        </template>
      </v-col>
    </v-row>
  </div>
</template>
<script lang="ts" setup>
  import type {IFilters} from '../types';

  interface Props {
    filters?: IFilters[];
    querySearch?: boolean;
  }
  defineProps<Props>();

  const emits = defineEmits<{
    (e: 'filtersData', items: object[]): void;
  }>();

  const model: any = defineModel('filterData');
</script>
<style lang="scss" scoped>
  .Lr--data-table__search {
    padding: 40px 25px;
    overflow: hidden;
  }
</style>
