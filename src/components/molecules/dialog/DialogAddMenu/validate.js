import * as yup from 'yup';

const validationSchema = () => {
  return yup.object({
    menu_name: yup.string().required('Name of menu is required'),
    type: yup.string().required('Type is required'),
    subtype: yup.string().required('Subtype is required'),
    description: yup.string().required('Description is required'),
    image: yup.mixed().required('Image is required'),
    price: yup.string().required('Price is required'),
  });
};

export { validationSchema };
