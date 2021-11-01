import styled, { CSSProperties } from 'styled-components';

import {
  background,
  BackgroundProps,
  border,
  BorderProps,
  boxShadow,
  BoxShadowProps,
  color,
  ColorProps,
  compose,
  flexbox,
  FlexboxProps,
  layout,
  LayoutProps,
  position,
  PositionProps,
  space,
  SpaceProps,
  system,
  textAlign,
  TextAlignProps,
} from 'styled-system';

type BoxProps = FlexboxProps &
  LayoutProps &
  PositionProps &
  SpaceProps &
  BackgroundProps &
  BorderProps &
  BoxShadowProps &
  TextAlignProps &
  ColorProps &
  Pick<CSSProperties, 'cursor' | 'transform' | 'transition' | 'pointerEvents'>;

export const boxStyledSystem = compose(
  border,
  color,
  flexbox,
  layout,
  position,
  space,
  boxShadow,
  textAlign,
  background,
  system({
    transition: true,
    cursor: true,
    pointerEvents: true,
    transform: true,
  })
);

const Box = styled.div<BoxProps>(boxStyledSystem);

export default Box;

export const FlexBox = styled(Box)`
  display: flex;
`;

export const Center = styled(FlexBox)`
  align-items: center;
  justify-content: center;
`;
