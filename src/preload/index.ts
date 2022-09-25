import { contextBridge, ipcRenderer, type IpcRendererEvent } from 'electron';

export type Listener<T = any> = (...args: T[]) => void;

export type AppInterface = {
  on(channel: string, listener: Listener): number;
  off(id: number): void;
  invoke<T>(channel: string, args?: any): Promise<T>;
};

type PairMap = {
  [key: number]: {
    channel: string;
    listener: Listener;
  };
};

class App {
  static app: AppInterface;
  private seq = 0;
  private pairMap: PairMap = {};

  static of(): AppInterface {
    if (!this.app) this.app = new App();
    return this.app;
  }

  invoke = ipcRenderer.invoke.bind(ipcRenderer);

  on = (channel: string, listener: Listener) => {
    this.seq += 1;
    const callback = (event: IpcRendererEvent, ...args: any[]) => listener(...args);
    this.pairMap[this.seq] = { channel, listener: callback };
    ipcRenderer.on(channel, callback);
    return this.seq;
  };

  off = (id: number) => {
    const { channel, listener } = this.pairMap[id];
    ipcRenderer.removeListener(channel, listener);
    delete this.pairMap[id];
  };
}

contextBridge.exposeInMainWorld('app', App.of());
