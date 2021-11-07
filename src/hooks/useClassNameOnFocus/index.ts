import React from 'react';
import { useFocusHandler } from '~/hooks/useFocusHandler';

export const useClassNameOnFocus = (classNameSuffix, ref) => {
  const [isActive, setIsActive] = React.useState<boolean>(false);
  const onFocusChangeHandler = (gained: boolean) => {
    setIsActive(gained);
  };
  useFocusHandler(ref, onFocusChangeHandler);

  return isActive ? classNameSuffix : '';
};