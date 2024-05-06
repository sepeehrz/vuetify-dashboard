<template>
  <v-text-field
    v-model="displayValue"
    :name="name"
    :variant="varient"
    :placeholder="placeholder"
    :hint="hint"
    :disabled="disabled"
    :error-messages="errorMessage"
    @keypress="onKeyPress"
    @input="onChange"
    @change="emitValue"
    suffix="ریال">
    <template #label>
      <span>
        {{ label }}
        <span v-if="required" class="required">*</span>
      </span>
    </template>
  </v-text-field>
</template>

<script lang="ts" setup>
  import {ref, watch} from 'vue';

  type IVariant =
    | 'filled'
    | 'underlined'
    | 'outlined'
    | 'plain'
    | 'solo'
    | 'solo-inverted'
    | 'solo-filled'
    | undefined;

  interface Props {
    modelValue: any;
    label?: string;
    hint?: string;
    varient?: IVariant;
    name?: string;
    disabled?: boolean;
    required?: boolean;
    prefix?: string;
    validation?: any;
    placeholder?: string;
    errorMessage?: string | undefined;
  }

  const props = withDefaults(defineProps<Props>(), {
    modelValue: '',
    label: '',
    varient: 'outlined'
  });
  const emits = defineEmits<{
    (e: 'update:modelValue', items: string | number): void;
  }>();

  const displayValue = ref(props.modelValue);

  watch(
    () => props.modelValue,
    value => {
      if (value !== '' && value !== null) {
        displayValue.value = Number.parseFloat(value)
          .toFixed(value.toString().includes('.') ? 2 : 0)
          .replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, '$1,');
      }
    },
    {immediate: true}
  );

  function onKeyPress(e: any) {
    let numberArray = [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      '.',
      '۰',
      '۱',
      '۲',
      '۳',
      '۴',
      '۵',
      '۶',
      '۷',
      '۸',
      '۹'
    ];
    if (!numberArray.some(item => item == e.key)) {
      e.preventDefault();
    }
  }
  function onChange(val: any) {
    displayValue.value = val.target.value
      .replace(/[۰-۹]/g, function (w: any) {
        return ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'].indexOf(w);
      })
      .replace(/,/g, '')
      .replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, '$1,');
  }
  function emitValue() {
    let newValue = parseFloat(displayValue.value.replace(/[^\d.]/g, ''));
    emits('update:modelValue', newValue);
  }
</script>
<style lang="scss" scoped>
  .required {
    font-size: 16px;
    font-weight: bold;
    color: red;
  }
</style>
