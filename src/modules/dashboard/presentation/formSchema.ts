import {object, string} from 'yup';

const loginFormSchema = object().shape({
  email: string().required().email().label('ایمیل'),
  // @ts-ignore
  password: string().required().creditCardLength('Too short'),
  money: string().required()
});

export default loginFormSchema;
