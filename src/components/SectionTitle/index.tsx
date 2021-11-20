import React, { ReactNode } from 'react';
import Box, { FlexBox } from '../Box';
import { Heading2, Heading3 } from '../Text';

interface Props {
  title: string;
  subTitle?: string;
  icon?: ReactNode;
}
export const SectionTitle: React.FC<Props> = ({ title, subTitle, icon }) => {
  return (
    <Box marginBottom="2rem">
      <FlexBox marginBottom="0.5rem" alignItems="center">
        {icon && (
          <Box height="28px" marginRight="0.5rem">
            {icon}
          </Box>
        )}
        <Heading2 fontSize="1.8rem" fontWeight={600}>
          {title}
        </Heading2>
      </FlexBox>
      {subTitle && (
        <Heading3 fontSize="1rem" fontWeight={400}>
          {subTitle}
        </Heading3>
      )}
    </Box>
  );
};

export default SectionTitle;
