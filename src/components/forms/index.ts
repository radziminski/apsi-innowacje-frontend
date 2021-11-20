import { COLORS } from '~/styles/variables';

export interface FormComponentPropsBase {
  id: string;
  className?: string;
}

//eslint-disable-next-line @typescript-eslint/no-explicit-any
export type FormComponentProps = FormComponentPropsBase & any;

export interface SelectOption {
  label: string;
  value: string;
  details?: string;
}

export const customSelectStyles = (isError: boolean) => ({
  control: (provided, state) => ({
    ...provided,
    borderColor: 'transparent',
    boxShadow: state.isFocused ? `0 0 0.25rem ${isError ? COLORS.error : COLORS.primary}AF` : 0,
    '&:hover': {
      boxShadow: state.isFocused
        ? `0 0 0.25rem ${isError ? COLORS.error : COLORS.primary}AF !important`
        : `0 0 0.15rem ${isError ? COLORS.error : COLORS.primary}AF !important`,
      transition: 'box-shadow 0.15s ease-in-out'
    },
    borderRadius: '1rem'
  }),
  option: (provided, state) => ({
    ...provided,
    color: COLORS.black,
    backgroundColor: state.isSelected ? COLORS.lightGray : COLORS.white,
    '&:hover': {
      backgroundColor: state.isSelected ? COLORS.lightGray : '#eee',
      transition: 'background-color 0.15s ease-in-out'
    }
  }),
  placeholder: styles => ({
    ...styles,
    color: COLORS.lightGray
  })
});
