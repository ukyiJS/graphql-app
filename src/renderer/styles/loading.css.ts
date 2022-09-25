import { globalStyle, keyframes, style } from '@vanilla-extract/css';

const fadein = keyframes({
  from: {
    visibility: 'visible',
    opacity: 0,
  },
  to: {
    visibility: 'visible',
    opacity: 1,
  },
});

export const spin = keyframes({
  '0%': {
    transform: 'rotate(0deg)',
  },
  '100%': {
    transform: 'rotate(359deg)',
  },
});

export const loadingContainer = style({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  zIndex: 10000,
  backgroundColor: 'hsl(var(--color-base))',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  justifyContent: 'center',
  marginTop: 'auto',
  marginBottom: 'auto',
});

globalStyle('body', {
  backgroundColor: 'rgba(33, 42, 59, .75)',
});

export const fallbackFadein = style({
  visibility: 'hidden',
  animation: `${fadein} 1.5s`,
  animationFillMode: 'forwards',
  animationDelay: '0.25s',
});

export const spinner = style({
  animation: `${spin} 2s infinite linear`,
});
