export enum Device {
  Desktop = 'desktop',
  WideTab = 'wide-tab',
  Tab = 'tab',
  Mobile = 'mobile'
}

export interface CustomTheme {
  colors: {
    black: string;
    transparent: string;
    white: string;
    primary: string;
    primaryHover: string;
    primaryActive: string;
    primaryDark: string;
    primaryLight: string;
    secondary: string;
    secondaryHover: string;
    secondaryActive: string;
    background: string;
    accent1: string;
    accent2: string;
    accent3: string;
    accent4: string;
    error: string;
    darkGray: string;
    gray: string;
    lightGray: string;
  };
  borderRadiuses: {
    normal: string;
    small: string;
    large: string;
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
  spacing: {
    xs: string;
    s: string;
    m: string;
    l: string;
    xl: string;
    xxl: string;
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
