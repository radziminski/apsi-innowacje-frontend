import { SubjectDtoAudienceEnum } from '~/api-client';

export function subjectDTOAudienceToSelectText(
  audience:
    | SubjectDtoAudienceEnum.Student
    | SubjectDtoAudienceEnum.Employee
    | SubjectDtoAudienceEnum.Committee
    | SubjectDtoAudienceEnum.Admin
    | null
    | undefined
): string {
  switch (audience) {
    case SubjectDtoAudienceEnum.Student:
      return 'Studenci';
    case SubjectDtoAudienceEnum.Employee:
      return 'Wykładowcy';
    case SubjectDtoAudienceEnum.Committee:
      return 'Komisja';
    case SubjectDtoAudienceEnum.Admin:
      return 'Administratorzy';
  }
  return 'Nieznana';
}
