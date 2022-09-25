import {
  autoInjectable,
  type ClassProvider,
  inject,
  injectable,
  injectAll,
  type InjectionToken,
  type Provider,
  type RegistrationOptions,
  registry,
  singleton,
  container,
} from 'tsyringe';

export const IPC_INVOKE = 'ipc:invoke';
export const IPC_SEND = 'ipc:send';
export const EMITTER_ON = 'emitter:on';
export const CONTROLLERS = 'controllers';

type ClassConstructor = ClassProvider<any>['useClass'];
type RegistrationProvider = { token: InjectionToken; options?: RegistrationOptions } & Provider;
type ModuleProvider = ClassConstructor | RegistrationProvider;
type RegistrationModule = {
  controllers?: ModuleProvider[];
  providers?: ModuleProvider[];
  imports?: InjectionToken[];
};

/**
 * @example
 * - @IpcInvoke('event')
 * - method(message: string) {
 * -   return message;
 * - }
 *
 * - @IpcInvoke 데코레이터는 아래와 같음
 * - ipcMain.handle('event', (event: IpcMainInvokeEvent, message: string) => message);
 */
export const IpcInvoke = (event: string): MethodDecorator => {
  if (!event) throw new Error('ipc invoke event is required');
  return (target, propertyName) => Reflect.defineMetadata(IPC_INVOKE, event, target, propertyName);
};

/**
 * @example
 * - @IpcSend('event')
 * - method(message: string) {
 * -   return message;
 * - }
 *
 * - @IpcSend 데코레이터는 아래와 같음
 * - new BrowserWindow().webContents.send('event', message);
 */
export const IpcSend = (event: string): MethodDecorator => {
  if (!event) throw new Error('ipc on event is required');
  return (target, propertyName) => Reflect.defineMetadata(IPC_SEND, event, target, propertyName);
};

/**
 * @example
 * - @On('event')
 * - method(message: string) {
 * -   return message;
 * - }
 *
 * - @on 데코레이터는 아래와 같음
 * - AppEmitterEvent.on('event', (message: string) => message);
 */
export const On = (event: string): MethodDecorator => {
  if (!event) throw new Error('on event is required');
  return (target, propertyName) => Reflect.defineMetadata(EMITTER_ON, event, target, propertyName);
};

export const Singleton = singleton;
export const Injectable = injectable;
export const AutoInjectable = autoInjectable;
export const Inject = inject;
export const InjectAll = injectAll;
export const Registry = registry;

const isConstructor = <T extends ClassConstructor>(constructor: T | unknown): constructor is T => !!constructor?.constructor;
const isProvider = <T extends RegistrationProvider>(provider: T | ClassConstructor): provider is T => {
  if (isConstructor(provider)) return false;
  return !!provider.token;
};
const getProviders = (constructors?: ModuleProvider[]): RegistrationProvider[] =>
  constructors?.map(constructor => {
    if (isProvider(constructor)) return constructor;
    return { token: constructor, useClass: constructor };
  }) ?? [];

export const Module = (registration: RegistrationModule) => {
  registration.controllers?.forEach(controller => container.register(CONTROLLERS, { useValue: controller }));
  if (registration?.imports) registration.imports.forEach(_import => container.resolve(_import));

  const providers = getProviders(registration.providers);
  return registry(providers);
};
