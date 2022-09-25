import { AppEmitterEvent } from '@main/modules/appEmitterEvent';
import { app, BrowserWindow, Menu, MenuItem, shell } from 'electron';
import debounce from 'lodash/debounce';
import { join } from 'path';
import { container } from 'tsyringe';
import { Inject, Singleton } from '../utils/decorators';
import { Setting } from './setting';
import MenuItemConstructorOptions = Electron.MenuItemConstructorOptions;

@Singleton()
export class MainWindow {
  private pageUrl = import.meta.env.DEV ? import.meta.env.VITE_DEV_SERVER_URL : new URL('dist/index.html', `file://${__dirname}`).toString();

  constructor(@Inject(Setting) private setting: Setting, @Inject(AppEmitterEvent) private event: AppEmitterEvent) {}

  private init = async () => {
    const bounds = this.setting.get('bounds');
    const window = new BrowserWindow({
      ...bounds,
      show: false,
      title: 'GraphQL',
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: true,
        preload: join(app.getAppPath(), 'dist', 'preload.js'),
      },
    });
    container.register(BrowserWindow, { useValue: window });
    window.once('ready-to-show', () => setTimeout(() => window.show(), 100));
    await window.loadURL(this.pageUrl);

    this.addWindowHideEvent(window);
    this.addWindowMoveEvent(window);
    this.addWindowResizeEvent(window);
    this.addWindowOpenHandler(window);
    this.addContextMenu(window);

    return window;
  };

  create = async () => {
    const window = BrowserWindow.getAllWindows().find(w => !w.isDestroyed()) ?? (await this.init());
    if (window.isMinimized()) window.restore();
    window.focus();

    return window;
  };

  private addWindowHideEvent = (window: BrowserWindow) => {
    let isAppQuitting = false;
    app.on('before-quit', () => (isAppQuitting = true));

    window.on('close', e => {
      if (!isAppQuitting) e.preventDefault();
      window.hide();
    });
  };

  private addWindowMoveEvent = (window: BrowserWindow) => {
    window.addListener(
      'moved',
      debounce(() => this.setting.set('bounds', window.getBounds()), 300),
    );
  };

  private addWindowResizeEvent = (window: BrowserWindow) => {
    window.addListener(
      'resize',
      debounce(() => this.setting.set('bounds', window.getBounds()), 300),
    );
  };

  private addWindowOpenHandler = (window: BrowserWindow) => {
    window.webContents.setWindowOpenHandler(({ url }) => {
      if (/^https?:/.test(url)) shell.openExternal(url).then(() => true);
      return { action: 'deny' };
    });
  };

  private setContextMenuItems = (contextMenu: Menu, menuItems: MenuItemConstructorOptions[]) =>
    menuItems.map(menuItem => contextMenu.append(new MenuItem(menuItem)));

  private addContextMenu = (window: BrowserWindow) => {
    const contextMenu = new Menu();
    this.setContextMenuItems(contextMenu, [
      { label: '복사', role: 'copy' },
      { label: '잘라내기', role: 'cut' },
      { label: '붙여넣기', role: 'paste' },
      { label: 'URL 변경', submenu: [{ label: 'URL 입력', click: (item, window, event) => this.event.emit('url-input-click', window, event) }] },
    ]);
    window.webContents.on('context-menu', (e, { x, y }) => contextMenu.popup({ window, x, y }));
  };
}
