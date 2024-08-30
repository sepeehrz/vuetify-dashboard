<template>
  <div class="data-table__search">
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
            @update:modelValue="buildFilter"
            clearable
            persistent-hint></v-select>
        </template>
        <template v-else>
          <v-text-field
            autocomplete="off"
            v-model="model[item.model]"
            :name="item.name"
            :label="item.label"
            prepend-inner-icon="mdi-magnify"
            :variant="item.variant || 'outlined'"
            :placeholder="item.placeholder"
            :hint="item.hint"
            :disabled="item.disabled"
            @click:clear="buildFilter"
            @keydown.enter="buildFilter"
            clearable>
            <template #append-inner>
              <v-tooltip location="bottom" text="جستجو">
                <template v-slot:activator="{props}">
                  <v-btn
                    v-bind="props"
                    @click="buildFilter"
                    variant="text"
                    color="#19a7ce"
                    class="check-btn"
                    density="compact"
                    icon="mdi-check"></v-btn>
                </template>
              </v-tooltip>
            </template>
          </v-text-field>
        </template>
      </v-col>
    </v-row>
  </div>
</template>
<script lang="ts" setup>
  import {ref, watch} from 'vue';
  import type {IFilters} from '../types';

  interface Props {
    filters?: IFilters[];
    refreshGrid?: boolean;
  }
  const props = defineProps<Props>();

  const emits = defineEmits<{
    (e: 'filterData', items: object): void;
  }>();

  const model: any = ref({});

  function encodeSearchValue(str: any) {
    if (str && str.length !== 0) {
      return encodeURIComponent(`"${str.trim()}"`);
    }
  }

  watch(
    () => props.refreshGrid,
    (value: any) => {
      if (value) {
        model.value = {};
      }
    }
  );
  function buildFilter() {
    let result = {
      search: ''
    };
    for (const [key, value] of Object.entries(model.value)) {
      if (result.search !== '') {
        result.search += ' && ';
      }
      if (key === 'search') {
        result.search += `summary.contains(${encodeSearchValue(value)})`;
      } else {
        result.search += `${key} == ${value}`;
      }
    }
    if (result.search.includes('summary.contains(undefined)')) {
      result.search = result.search
        .replace('summary.contains(undefined)', '')
        .trim();
    }
    emits('filterData', result);
  }
</script>
<style lang="scss" scoped>
  .data-table__search {
    padding: 40px 25px;
    overflow: hidden;
  }
</style>
