import * as yup from 'yup';

const validationSchema = () => {
  return yup.object({
    name_user: yup.string().required('Name is required'),
    role: yup.string().required('Role is required'),
    gender: yup.string().required('Gender is required'),
    username: yup.string().required('Username is required'),
    telephone: yup.string().required('Telephone is required'),
  });
};

export { validationSchema };
