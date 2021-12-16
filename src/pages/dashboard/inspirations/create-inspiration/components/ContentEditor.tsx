import { CenteredLoader } from '~/components/Loader';
import { FlexBox } from '~/components/Box';
import { Controller, useFormContext } from 'react-hook-form';
import { image, link } from 'suneditor/src/plugins';
import React, { Suspense } from 'react';
import styled from 'styled-components';
import { ChangeHandler, Control, RefCallBack } from 'react-hook-form/dist/types/form';
import { InternalFieldName } from 'react-hook-form/dist/types/fields';
import { FieldErrors } from 'react-hook-form/dist/types/errors';

const ControlledSunEditor = styled(
  (props: {
    id: string;
    control: Control;
    formRegisterRest: { onBlur: ChangeHandler; ref: RefCallBack; name: InternalFieldName };
    errors: FieldErrors;
    className?: string;
  }) => {
    const { id, control, formRegisterRest, className } = props;
    const SunEditor = React.lazy(() => import('suneditor-react'));

    return (
      <FlexBox className={className}>
        <Controller
          name={id}
          control={control}
          render={({ field }) => (
            <SunEditor
              {...field}
              {...formRegisterRest}
              defaultValue={field.value}
              placeholder="Wpisz treść inspiracji..."
              setOptions={{
                height: '200',
                width: '60vw',
                plugins: [image, link],
                buttonList: [['undo', 'redo', 'image', 'link']],
                defaultStyle: 'font-family: Poppins, sans-serif'
              }}
              lang={'pl'}
            />
          )}
        />
      </FlexBox>
    );
  }
)`
  .sun-editor {
    font-family: Poppins, sans-serif;
    ${({ errors, id }) => (errors[id] ? 'border: 1px solid red;' : '')}
  }
`;

export const ContentEditor = styled((props: { id: string; className?: string }) => {
  const { id, className } = props;
  const {
    control,
    formState: { errors },
    register
  } = useFormContext();

  // onChange has different signature than SunEditor expects
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { onChange, ...rest } = register(id);

  return (
    <Suspense fallback={<CenteredLoader />}>
      <ControlledSunEditor id={id} control={control} formRegisterRest={rest} errors={errors} />
      <FlexBox className={className}>{errors[id] && <p>{errors[id].message}</p>}</FlexBox>
    </Suspense>
  );
})`
  flex-direction: column;
`;
