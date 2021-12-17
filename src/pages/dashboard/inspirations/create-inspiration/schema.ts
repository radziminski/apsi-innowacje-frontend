import * as yup from 'yup';

export const schema = yup
  .object({
    title: yup.string().required('Proszę wpisać tytuł.'),
    content: yup.string().required('Proszę wpisać treść inspiracji.')
  })
  .required();
