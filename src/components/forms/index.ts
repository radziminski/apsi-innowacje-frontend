import { COLORS } from '~/styles/variables';

export interface FormComponentPropsBase {
  id: string;
  className?: string;
}

//eslint-disable-next-line @typescript-eslint/no-explicit-any
export type FormComponentProps = FormComponentPropsBase & any;

export interface Option {
  label: string;
  value: string;
}

export const customSelectStyles = (isError: boolean) => ({
  control: (provided, state) => ({
    ...provided,
    borderColor: 'transparent',
    boxShadow: state.isFocused ? `0 0 0.25rem ${isError ? COLORS.error : COLORS.primary}` : 0,
    '&:hover': {
      boxShadow: state.isFocused
        ? `0 0 0.25rem ${isError ? COLORS.error : COLORS.primary} !important`
        : `0 0 0.15rem ${isError ? COLORS.error : COLORS.primary} !important`,
      transition: 'box-shadow 0.15s ease-in-out'
    },
    borderRadius: '1rem'
  }),
  option: (provided, state) => ({
    ...provided,
    color: COLORS.black,
    backgroundColor: state.isActive ? COLORS.gray : COLORS.white,
    '&:hover': {
      backgroundColor: '#eee',
      transition: 'background-color 0.15s ease-in-out'
    }
  }),
  placeholder: styles => ({
    ...styles,
    color: COLORS.lightGray
  })
});
