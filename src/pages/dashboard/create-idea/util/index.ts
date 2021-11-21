import { CreateIdeaFormSchema } from '~/pages/dashboard/create-idea/components/CreateIdeaForm';
import { IdeaDto, IdeaDtoStatusEnum } from '~/api-client';

export const formSchemaToIdeaDTO = (formData: CreateIdeaFormSchema, currentUserId: number): IdeaDto => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { anonymous, subjectId, keywords, description, benefits, costs_from, costs_to } = formData;
  return {
    anonymous,
    authorId: currentUserId,
    subjectId: undefined, // TODO parseInt(subjectId.value),
    keywords: keywords.map(keyword => keyword.label),
    benefits: [
      {
        description: benefits,
        title: 'New description'
      }
    ],
    blocked: false,
    costs: [
      {
        title: 'Costs from',
        value: costs_from
      },
      {
        title: 'Costs to',
        value: costs_to
      }
    ],
    description,
    status: IdeaDtoStatusEnum.New
  };
};
