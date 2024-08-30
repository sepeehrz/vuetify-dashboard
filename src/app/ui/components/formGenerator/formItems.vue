<template>
  <section class="form-items">
    <template v-for="(row, sectionIndex) in formData" :key="sectionIndex">
      <template v-if="!row.hide">
        <h3 class="section-title" v-if="row.title">{{ row.title }}</h3>
        <v-row>
          <template v-for="(field, fieldIndex) in row.rows">
            <v-col v-if="!field.hide" :cols="field.col || '3'">
              <component
                v-model="model[field.model]"
                :error-message="errorMessages[field.model]"
                :field="field"
                :is="formsComponents[field.type]"
                :key="fieldIndex"
                @update:modelValue="change_field(field)"
                @blur="blur(field)"
                @focus="focus(field)">
                <template #dynamic-field>
                  <slot name="dynamic-field" />
                </template>
              </component>
            </v-col>
          </template>
          <slot name="extra-form-item" />
        </v-row>
      </template>
    </template>
  </section>
</template>

<script lang="ts" setup>
  import {watch, ref} from 'vue';
  import TextField from './formFields/textField.vue';
  import FileField from './formFields/fileField.vue';
  import type {IFormData, IRows} from './types/types';
  import CurrencyField from './formFields/currency.vue';
  import SelectField from './formFields/selectField.vue';
  import SwitchField from './formFields/switchField.vue';
  import DatePickerField from './formFields/datePicker.vue';
  import TextAreaField from './formFields/textAreaField.vue';
  import AutoCompleteField from './formFields/autoComplete.vue';
  import CheckboxField from './formFields/checkboxField.vue';
  // fixed type for IFormData
  interface Props {
    formData: any;
    errorMessage: any;
    validationSchema?: any;
  }
  const props = withDefaults(defineProps<Props>(), {
    formData: () => []
  });
  const model: any = defineModel();

  const formsComponents: any = {
    TextField,
    AutoCompleteField,
    SelectField,
    DatePickerField,
    CurrencyField,
    TextAreaField,
    SwitchField,
    FileField,
    CheckboxField
  };
  const errorMessages = ref(props.errorMessage);

  watch(
    () => props.errorMessage,
    (value: any) => {
      errorMessages.value = value;
    },
    {deep: true}
  );

  function change_field(field: IRows) {
    if (field.onChange) {
      field.onChange(model.value[field.model]);
    }
  }
  function blur(field: any): any {
    const schemaList = props.validationSchema.describe();
    if (schemaList.fields[field.model]) {
      props.validationSchema
        .validateAt(field.model, model.value)
        .then(() => {
          errorMessages.value[field.model] = '';
        })
        .catch((err: any) => {
          errorMessages.value[field.model] = err.message;
        });
    }
  }
  function focus(field: any): any {
    errorMessages.value[field.model] = '';
  }
</script>
<style lang="scss" scoped>
  .section-title {
    margin: 30px 0;
  }
  .form-items {
    padding: 40px 30px;
  }
</style>
