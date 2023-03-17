import * as yup from 'yup';

const validationSchema = () => {
  return yup.object({
    username: yup.string('Enter your username').required('Username is required'),
    password: yup
      .string('Enter your password')
      .required('Password is required'),
  });
};

export { validationSchema };
