import {ref} from 'vue';

export function useFormData() {
  const formFieldData = ref([
    {
      rows: [
        {
          type: 'SwitchField',
          model: 'isActive',
          name: 'isActive',
          col: 6,
          required: true
        },
        {
          label: 'نام',
          type: 'TextField',
          placeholder: 'نام را وارد نمایید',
          model: 'title',
          name: 'title',
          col: 6,
          required: true
        },
        {
          label: 'تصویر',
          type: 'FileField',
          name: 'picture',
          model: 'picture',
          targetPath: 'baraye/stuffs/categories/pictures',
          col: 6,
          required: true,
          placeholder: 'تصویر را انتخاب نمایید را وارد نمایید'
        },
        {
          type: 'TextAreaField',
          model: 'description',
          name: 'description',
          label: 'توضیحات',
          col: 6,
          required: true,
          placeholder: 'توضیحات را وارد نمایید'
        }
      ]
    }
  ]);
  return {formFieldData};
}
