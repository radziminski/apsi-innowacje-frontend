import { Device } from './types';

export const COLORS = {
  black: '#000000',
  white: '#ffffff',
  transparent: 'transparent',
  primary: '#5226ff',
  primaryDark: '#1b255a',
  primaryLight: '#eee9ff',
  background: '#f8f9fb',
  accent1: '#e8246b',
  accent2: '#fcbf59',
  accent3: '#00b7fd',
  error: '#DD0000',
  darkGray: '#757f9a',
  gray: '#959fba',
  lightGray: '#c4cfda'
};

export const MARGINS = {
  small: '1rem',
  medium: '1.5rem',
  big: '2rem',
  large: '3rem'
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
  [Device.Mobile]: 601
};

export const MEDIA_QUERIES = {
  ...Object.values(Device).reduce<Record<Device, string>>((acc, breakpoint) => {
    return {
      ...acc,
      [breakpoint]: `only screen and (max-width: ${BREAKPOINTS[breakpoint]}px)`
    };
  }, {} as Record<Device, string>)
};
