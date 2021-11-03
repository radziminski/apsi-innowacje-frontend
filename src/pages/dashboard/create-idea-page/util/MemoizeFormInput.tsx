import React from 'react';

export const MemoizeFormInput = React.memo(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ({ children }: React.PropsWithChildren<any & { methods: any & { formState: any & { isDirty: boolean } } }>) =>
    React.cloneElement(children),
  (prevProps, nextProps) => prevProps.methods.formState.isDirty === nextProps.methods.formState.isDirty
);
