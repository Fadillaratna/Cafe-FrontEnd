import * as yup from 'yup';

const validationSchema = () => {
  return yup.object({
    table_number: yup.string().required('Table number is required'),
    capacity: yup.number().required('Capacity is required'),
  });
};

export { validationSchema };
