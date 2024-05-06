<template>
  <v-text-field
    autocomplete="off"
    v-model="displayValue"
    :name="name"
    :id="id"
    :variant="'outlined'"
    :placeholder="placeholder"
    :error-messages="Boolean(model) ? '' : errorMessages"
    prepend-inner-icon="mdi-calendar-range"
    :hint="hint"
    v-bind="$attrs"
    :disabled="disabled"
    @click="show = true">
    <template #label>
      <span>
        {{ label }}
        <span v-if="required" class="required">*</span>
      </span>
    </template>
  </v-text-field>

  <VuePersianDatetimePicker
    v-model="model"
    :show="show"
    @close="show = false"
    :auto-submit="true"
    :custom-input="id"
    :min="min"
    :max="max"
    :format="format"
    :disabled="disabled"></VuePersianDatetimePicker>
</template>

<script lang="ts" setup>
  // @ts-ignore
  import moment from 'moment-jalaali';
  import VuePersianDatetimePicker from 'vue3-persian-datetime-picker';
  import {ref, computed, watch} from 'vue';

  defineOptions({
    inheritAttrs: false
  });
  interface Props {
    modelValue: string | null;
    label?: string;
    format?: string;
    displayFormat?: string;
    placeholder?: string;
    disabled?: boolean;
    required?: boolean;
    validation?: any;
    min?: string;
    max?: string;
    name?: string;
    varient?: string;
    hint?: string;
    errorMessages?: string | undefined;
  }

  const props = withDefaults(defineProps<Props>(), {
    modelValue: '',
    format: 'YYYY-MM-DD',
    displayFormat: 'jYYYY/jMM/jDD'
  });

  const emits = defineEmits<{
    (e: 'update:modelValue', items: object): void;
  }>();

  const show = ref(false);

  const displayValue = ref(
    props.modelValue
      ? moment(props.modelValue, [props.format]).format(props.displayFormat)
      : ''
  );

  const model = computed({
    get() {
      if (props.modelValue === null || props.modelValue === undefined) {
        return;
      }
      return props.modelValue;
    },
    set(value: any) {
      emits('update:modelValue', value);
    }
  });

  watch(
    () => props.modelValue,
    value => {
      if (value && value.length !== 0) {
        displayValue.value = moment(value, [props.format]).format(
          props.displayFormat
        );
      }
    },
    {immediate: true}
  );
  const id = computed(() => {
    return `datepicker_${new Date().getMilliseconds()}`;
  });
</script>
<style lang="scss" scoped>
  .required {
    font-size: 16px;
    font-weight: bold;
    color: red;
  }
  ::v-deep(.vpd-container) {
    .vpd-content {
      border-radius: 10px;
      background-color: #e9ecef;
      .vpd-header {
        background-color: #e9ecef !important;
        border-radius: 10px 10px 0 0;
        color: #000;
      }
    }
    .vpd-selected {
      span {
        background-color: red !important;
      }
    }
    .vpd-day-effect {
      background-color: red !important;
    }
  }
</style>
