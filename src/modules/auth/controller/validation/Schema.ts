import {object, string} from 'yup';

const loginFormSchema = object({
  username: string().required(),
  password: string().required()
});

export default loginFormSchema;
