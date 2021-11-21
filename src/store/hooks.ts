import { RootState } from '~/store/store';
import { useSelector as originalUseSelector } from 'react-redux';

export const useSelector = <T>(selector: (state: RootState) => T) => {
  return originalUseSelector<RootState, T>(selector);
};
