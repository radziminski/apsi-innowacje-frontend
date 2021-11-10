import * as yup from 'yup';

export const schema = yup
  .object({
    topic: yup.object().required('Proszę wybrać temat.'),
    keywords: yup
      .array()
      .min(1, 'Propszę wpisać przynajmniej jedno słowo kluczowe.')
      .required('Propszę wpisać przynajmniej jedno słowo kluczowe.'),
    description: yup.string().required('Proszę opisać pomysł.').min(30, 'Proszę użyć przynajmniej 30 znaków.'),
    benefits: yup.string().required('Proszę opisać planowane korzyści.'),
    costs_from: yup
      .number()
      .required('Proszę wpisać dodatnią wartość.')
      .positive()
      .integer()
      .typeError('Proszę wpisać dodatnią wartość.'),
    costs_to: yup
      .number()
      .positive()
      .integer()
      .required('Proszę wpisać dodatnią wartosć.')
      .when(['costs_from'], costs_from => {
        return yup
          .number()
          .min(costs_from, 'Wartość nie może być niższa niż w pierwszym polu.')
          .typeError('Proszę wpisać dodatnią wartość.');
      })
      .typeError('Proszę wpisać dodatnią wartość.')
  })
  .required();
