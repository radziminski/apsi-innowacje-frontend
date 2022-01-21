import * as yup from 'yup';

export const enum CreateIdeaFormFields {
  title = 'title',
  anonymous = 'anonymous',
  subject = 'subject',
  keywords = 'keywords',
  description = 'description',
  benefits = 'benefits',
  costs_from = 'costs_from',
  costs_to = 'costs_to',
  attachments = 'attachments'
}

export const schema = yup
  .object({
    [CreateIdeaFormFields.title]: yup
      .string()
      .required('Proszę wpisać tytuł.')
      .max(100, 'Maksymalna długość to 100 znaków'),
    [CreateIdeaFormFields.subject]: yup.object().required('Proszę wybrać temat.'),
    [CreateIdeaFormFields.keywords]: yup
      .array()
      .min(1, 'Proszę wpisać przynajmniej jedno słowo kluczowe.')
      .required('Proszę wpisać przynajmniej jedno słowo kluczowe.')
      .max(10, 'Maksymalnie 10 słów kluczowych.'),
    [CreateIdeaFormFields.description]: yup
      .string()
      .required('Proszę opisać pomysł.')
      .min(30, 'Proszę użyć przynajmniej 30 znaków.')
      .max(5000, 'Proszę użyć maksymalnie 5000 znaków.'),
    [CreateIdeaFormFields.benefits]: yup
      .string()
      .required('Proszę opisać planowane korzyści.')
      .max(1000, 'Proszę użyć maksymalnie 1000 znaków.'),
    [CreateIdeaFormFields.costs_from]: yup
      .number()
      .required('Proszę wpisać dodatnią wartość.')
      .positive('Proszę wpisać dodatnią wartosć.')
      .integer('Proszę wpisać liczbę.')
      .typeError('Proszę wpisać dodatnią wartość.'),
    [CreateIdeaFormFields.costs_to]: yup
      .number()
      .positive('Proszę wpisać dodatnią wartosć.')
      .integer('Proszę wpisać liczbę.')
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
