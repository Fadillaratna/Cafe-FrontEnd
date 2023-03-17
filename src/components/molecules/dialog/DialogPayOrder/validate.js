import * as yup from 'yup';

const validationSchema = () => {
  return yup.object({
    total_bayar: yup.string().required('Total pay is required'),
  });
};

export { validationSchema };
