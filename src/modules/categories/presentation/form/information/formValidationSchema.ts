import {object, string} from 'yup';

const CategoriesFormScheme = object().shape({
  title: string().required('وارد کردن نام اجباری میباشد'),
  picture: string().required('وارد کردن تصویر اجباری میباشد'),
  description: string().required('وارد کردن توضیحات اجباری میباشد')
});

export default CategoriesFormScheme;
