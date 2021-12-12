import { Device } from './types';

export const COLORS = {
  black: '#000000',
  white: '#ffffff',
  transparent: 'transparent',
  primary: '#5226ff',
  primaryHover: '#2266ff',
  primaryActive: '#00b7fd',
  secondary: '#c4cfda',
  secondaryHover: '#959fba',
  secondaryActive: '#757f9a',
  primaryDark: '#1b255a',
  primaryLight: '#eee9ff',
  background: '#f8f9fb',
  accent1: '#e8246b',
  accent2: '#fcbf59',
  accent3: '#00b7fd',
  accent4: '#00b73d',
  error: '#DD0000',
  darkGray: '#757f9a',
  gray: '#959fba',
  lightGray: '#c4cfda'
};

export const SPACING = {
  s: '1rem',
  m: '1.5rem',
  l: '2rem',
  xl: '3rem',
  xxl: '4rem'
};

export const FONT_WEIGHTS = {
  thin: 100,
  extraLight: 200,
  light: 300,
  normal: 400,
  medium: 500,
  semiBold: 600,
  bold: 700,
  extraBold: 800,
  black: 900
};

export const Z_INDEX = {
  backgroundBack: 1,
  backgroundMiddle: 5,
  backgroundFront: 9,
  foregroundBack: 10,
  foregroundMiddle: 15,
  foregroundFront: 19,
  stickedBack: 20,
  stickedMiddle: 25,
  stickedFront: 29,
  modalBack: 30,
  modalMiddle: 35,
  modalFront: 39
};

export const BREAKPOINTS: Record<Device, number> = {
  [Device.Desktop]: 1920,
  [Device.Tab]: 962,
  [Device.WideTab]: 1240,
  [Device.Mobile]: 601
};

export const BORDER_RADIUSES = {
  normal: '0.75rem',
  small: '0.5rem',
  large: '1rem'
};

export const MEDIA_QUERIES = {
  ...Object.values(Device).reduce<Record<Device, string>>((acc, breakpoint) => {
    return {
      ...acc,
      [breakpoint]: `only screen and (max-width: ${BREAKPOINTS[breakpoint]}px)`
    };
  }, {} as Record<Device, string>)
};
