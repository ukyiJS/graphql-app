import { globalStyle } from '@vanilla-extract/css';

globalStyle('#root', {
  height: '100vh',
});

globalStyle('*', {
  margin: 0,
  padding: 0,
  font: 'inherit',
  color: 'inherit',
});

globalStyle('*, :after, :before', {
  flexShrink: 0,
});

globalStyle(':root', {
  textSizeAdjust: '100%',
  cursor: 'default',
  lineHeight: 1.5,
  overflowWrap: 'break-word',
  wordBreak: 'break-word',
  tabSize: 4,
});

globalStyle('html, body', {
  height: '100%',
});

globalStyle('img, picture, video, canvas, svg', {
  display: 'block',
  maxWidth: '100%',
});

globalStyle('button', {
  background: 'none',
  border: 0,
  cursor: 'pointer',
});

globalStyle('button:focus', {
  outline: 'none !important',
});

globalStyle('a', {
  textDecoration: 'none',
});

globalStyle('table', {
  borderCollapse: 'collapse',
  borderSpacing: 0,
});
