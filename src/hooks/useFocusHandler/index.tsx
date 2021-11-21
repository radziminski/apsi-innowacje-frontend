import React from 'react';

export const useFocusHandler = (ref, focusHandler: (gainedFocus: boolean) => void) => {
  React.useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    ref?.current?.addEventListener('focus', () => focusHandler(true));
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    ref?.current?.addEventListener('blur', () => focusHandler(false));
  }, [ref, ref.current]);
};
