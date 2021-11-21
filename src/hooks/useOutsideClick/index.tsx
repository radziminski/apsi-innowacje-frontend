import React, { useEffect } from 'react';

export const useOutsideClick = (
  ref: React.RefObject<HTMLElement> | React.RefObject<HTMLElement | undefined>[],
  callback: () => void
) => {
  const onClick = e => {
    if (Array.isArray(ref)) {
      if (!ref.some(r => r && r.current && r.current.contains(e.target))) {
        callback();
      }
    } else {
      if (ref.current && !ref.current.contains(e.target)) {
        callback();
      }
    }
  };

  useEffect(() => {
    document.addEventListener('click', onClick);

    return () => {
      document.removeEventListener('click', onClick);
    };
  });
};
