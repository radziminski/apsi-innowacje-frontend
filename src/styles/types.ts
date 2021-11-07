export enum Device {
  Desktop = 'desktop',
  Tab = 'tab',
  Mobile = 'mobile'
}

export interface CustomTheme {
  colors: {
    black: string;
    transparent: string;
    white: string;
    primary: string;
    primaryDark: string;
    primaryLight: string;
    background: string;
    accent1: string;
    accent2: string;
    accent3: string;
    error: string;
    darkGray: string;
    gray: string;
    lightGray: string;
  };
  fontWeights: {
    thin: number;
    extraLight: number;
    light: number;
    normal: number;
    medium: number;
    semiBold: number;
    bold: number;
    extraBold: number;
    black: number;
  };
  breakpoints: Record<Device, number>;
  mediaQueries: Record<Device, string>;
  margins: {
    small: string;
    medium: string;
    big: string;
    large: string;
  };
  zIndex: {
    backgroundBack: number;
    backgroundMiddle: number;
    backgroundFront: number;
    foregroundBack: number;
    foregroundMiddle: number;
    foregroundFront: number;
    stickedBack: number;
    stickedMiddle: number;
    stickedFront: number;
    modalBack: number;
    modalMiddle: number;
    modalFront: number;
  };
}
