import React from 'react';
import Box, { FlexBox } from '../Box';
import { CenteredLoader } from '../Loader';
import { Heading5 } from '../Text';

interface Props {
  isError?: boolean;
  isLoading?: boolean;
  errorMessage?: string;
}
export const AsyncContentContainer: React.FC<Props> = ({ isError, isLoading, errorMessage, children }) => {
  if (isLoading) {
    return (
      <Box minHeight="150px">
        <CenteredLoader />
      </Box>
    );
  }

  if (isError) {
    return (
      <FlexBox>
        <Heading5>{errorMessage ?? 'Wystąpił nieznany błąd.'}</Heading5>
      </FlexBox>
    );
  }

  return <>{children}</>;
};

export default AsyncContentContainer;
