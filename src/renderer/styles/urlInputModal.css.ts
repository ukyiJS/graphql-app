import { globalStyle, style } from '@vanilla-extract/css';

globalStyle('.graphiql-container.overlay', {
  position: 'fixed',
  inset: 0,
  display: 'inherit',
  width: 'inherit',
  height: 'inherit',
  overflow: 'inherit',
  backgroundColor: 'hsla(var(--color-neutral), 0.1)',
});

export const modalContainer = style({
  display: 'flex',
  flexDirection: 'column',
  position: 'absolute',
  inset: '50% auto auto 50%',
  transform: 'translate(-50%, -50%)',
  textAlign: 'left',
  width: 600,
  height: 360,
  borderRadius: 10,
  backgroundColor: 'rgba(37,37,37,.85)',
  boxShadow: '4px 4px 0 rgba(0,0,0,.2)',
  transition: 'all ease-in-out .3s',
});

export const windowMaximized = style({
  width: '100%',
  flexGrow: 1,
});

export const windowMinimized = style({
  height: 25,
  width: 180,
});

globalStyle(`${windowMinimized} .window-content`, {
  display: 'none',
});

export const header = style({
  display: 'flex',
  alignItems: 'center',
  gap: 6,
  background: '#E0E8F0',
  height: 30,
  borderRadius: '8px 8px 0 0',
  paddingLeft: 10,
});

const windowControlsButton = `${header} > .button`;
globalStyle(windowControlsButton, {
  width: 12,
  height: 12,
  display: 'inline-block',
  borderRadius: 8,
  cursor: 'pointer',
});

globalStyle(`${windowControlsButton}.green`, {
  backgroundColor: '#3BB662',
});

globalStyle(`${windowControlsButton}.yellow`, {
  backgroundColor: '#E5C30F',
});

globalStyle(`${windowControlsButton}.red`, {
  backgroundColor: '#E75448',
});

export const contents = style({
  color: 'hsla(var(--color-neutral),1)',
  background: '#30353A',
  padding: 10,
  boxSizing: 'border-box',
  position: 'absolute',
  width: '100%',
  top: 30,
  bottom: 0,
  overflow: 'auto',
  borderRadius: '0 0 10px 10px',
});

export const prompt = style({
  display: 'flex',
  fontFamily: 'Menlo, Monaco, "Consolas", "Courier New", "Courier"',
});

export const cursorIndicator = style({
  fontFamily: 'Consolas, monospace',
});

export const promptInput = style({
  backgroundColor: 'inherit',
  border: 'none',
  outline: 0,
  color: 'transparent',
  fontFamily: 'Consolas, monospace',
  flex: 1,
  ':focus': {
    outline: 'none',
  },
  '::placeholder': {
    color: 'hsla(var(--color-neutral), 0.2)',
  },
});
