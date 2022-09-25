import { AppEmitterEvent } from '@main/modules/appEmitterEvent';
import { BrowserWindow, ipcMain } from 'electron';
import { container } from 'tsyringe';
import { CONTROLLERS, Injectable, InjectAll, IPC_INVOKE, IPC_SEND, EMITTER_ON } from '../utils/decorators';

@Injectable()
export class CustomDecorator {
  constructor(@InjectAll(CONTROLLERS) private controllers: Constructor[]) {
    this.controllers.forEach(ControllerClass => {
      const controller = container.resolve(ControllerClass);
      const controllerMethods = Object.getOwnPropertyNames(ControllerClass.prototype).filter(name => name !== 'constructor');
      controllerMethods.forEach(methodName => {
        this.addIpcInvokeMethodDecorator(controller, methodName);
        this.addIpcSendMethodDecorator(controller, methodName);
        this.addOnEventEmitter(controller, methodName);
      });
    });
  }

  /** @IpcInvoke */
  addIpcInvokeMethodDecorator(controller: any, methodName: string) {
    const ipcInvokeEvent = Reflect.getMetadata(IPC_INVOKE, controller, methodName);
    if (!ipcInvokeEvent) return;

    ipcMain.handle(ipcInvokeEvent, async (event, ...args) => Reflect.apply(controller[methodName], controller, args));
  }

  /** @IpcSend */
  addIpcSendMethodDecorator(controller: any, methodName: string) {
    const method = controller[methodName];
    const ipcSendEvent = Reflect.getMetadata(IPC_SEND, controller, methodName);
    if (!ipcSendEvent) return;

    controller[methodName] = async (...args: any[]) => {
      const result = Reflect.apply(method, controller, args);
      const mainWindow = container.resolve(BrowserWindow);
      mainWindow.webContents?.send(ipcSendEvent, result);
      return result;
    };
  }

  /** @On */
  addOnEventEmitter(controller: any, methodName: string) {
    const method = controller[methodName];
    const emitterOnEvent = Reflect.getMetadata(EMITTER_ON, controller, methodName);
    if (!emitterOnEvent) return;

    const appEmitterEvent = container.resolve(AppEmitterEvent);
    appEmitterEvent.on(emitterOnEvent, (...args: any[]) => Reflect.apply(method, controller, args));
  }
}
