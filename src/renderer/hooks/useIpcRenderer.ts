import { Listener } from '@preload/index';
import { useEffect } from 'react';

export const useIpcInvoke = <T>(event: string, payload: unknown, listener: (args: T) => void) => {
  useEffect(() => {
    window.app.invoke<T>(event, payload).then(listener);
  }, []);
};

export const useIpcOn = <T>(event: string, listener: Listener<T>) => {
  useEffect(() => {
    const id = window.app.on(event, listener);
    return () => window.app.off(id);
  }, []);
};
