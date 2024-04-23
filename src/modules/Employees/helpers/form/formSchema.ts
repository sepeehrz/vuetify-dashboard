import {object, string} from 'yup';

const employeesManagementFormScheme = object().shape({
  name: string().required(),
  // organizationId: string().required(),
  // birthDate: string().required(),
  gender: string().required()
});

export default employeesManagementFormScheme;
