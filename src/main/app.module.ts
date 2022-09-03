import { app, BrowserWindow } from 'electron';
import { container } from 'tsyringe';
import { AppController } from './app.controller';
import { MainWindow } from './modules/mainWindow';
import { Module } from './utils/decorators';

@Module({
  controllers: [AppController],
  providers: [],
})
export class AppModule {
  constructor() {
    app.on('window-all-closed', () => {
      container.resolve(BrowserWindow).destroy();
      if (process.platform !== 'darwin') app.quit();
    });

    app.on('second-instance', () => {
      const window = container.resolve(BrowserWindow);
      if (!window) return;

      if (window.isMinimized()) window.restore();
      window.focus();
    });

    app.on('activate', () => {
      container.resolve(BrowserWindow)?.show();
    });

    const isSingleInstance = app.requestSingleInstanceLock();
    if (!isSingleInstance) {
      app.quit();
      process.exit(0);
    }

    if (import.meta.env.DEV) {
      app.whenReady()
        .then(() => import('electron-debug').then(({ default: debug }) => debug({ showDevTools: false })))
        .then(() => import('./modules/devTools').then(({ DevTools }) => DevTools.install(DevTools.REACT)));
    }

    app.whenReady().then(container.resolve(MainWindow).create);
  }
}
