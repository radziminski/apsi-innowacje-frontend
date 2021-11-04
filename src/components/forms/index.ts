export interface FormInputPropsBase {
  id: string;
  className?: string;
}

//eslint-disable-next-line @typescript-eslint/no-explicit-any
export type FormInputProps = FormInputPropsBase & any;

export interface Option {
  label: string;
  value: string;
}

// export const customSelectStyles = {
//   // menu: (provided, state) => ({
//   //   ...provided,
//   //   width: state.selectProps.width,
//   //   borderBottom: '1px dotted pink',
//   //   color: state.selectProps.menuColor,
//   //   padding: 20,
//   // }),
//
//   menu: (_, { selectProps: { width } }) => ({
//     width: width
//   })
//
//   // singleValue: (provided, state) => {
//   //   const opacity = state.isDisabled ? 0.5 : 1;
//   //   const transition = 'opacity 300ms';
//   //
//   //   return { ...provided, opacity, transition };
//   // }
// };
