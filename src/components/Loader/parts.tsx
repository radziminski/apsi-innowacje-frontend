import styled from 'styled-components';

export const Container = styled.div<{ size?: number; margin?: number; borderSize?: number; color?: string }>`
  display: inline-block;
  position: relative;
  width: ${({ size }) => size ?? 80}px;
  height: ${({ size }) => size ?? 80}px;
  opacity: 0.75;

  div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: ${({ size }) => (size ?? 80) * 0.8}px;
    height: ${({ size }) => (size ?? 80) * 0.8}px;
    margin: ${({ margin }) => margin ?? 8}px;
    border: ${({ borderSize }) => borderSize ?? 6}px solid transparent;
    border-radius: 50%;
    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: ${({ color }) => color ?? 'currentColor'} transparent transparent transparent;
  }
  div:nth-child(1) {
    animation-delay: -0.45s;
  }
  div:nth-child(2) {
    animation-delay: -0.3s;
  }
  div:nth-child(3) {
    animation-delay: -0.15s;
  }
  @keyframes lds-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
