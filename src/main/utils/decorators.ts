import { autoInjectable, type ClassProvider, inject, injectable, injectAll, type InjectionToken, type Provider, type RegistrationOptions, registry, singleton } from 'tsyringe';

export const IPC_INVOKE = 'ipc:invoke';
export const IPC_SEND = 'ipc:send';
export const CONTROLLERS = 'controllers';

type ClassConstructor = ClassProvider<any>['useClass'];
type RegistrationProvider = { token: InjectionToken; options?: RegistrationOptions; } & Provider;
type ModuleProvider = ClassConstructor | RegistrationProvider;
type RegistrationModule = {
  controllers?: ModuleProvider[];
  providers?: ModuleProvider[];
};

export const IpcInvoke = (event: string): MethodDecorator => {
  if (!event) throw new Error('ipc invoke event is required');
  return (target, propertyName) => Reflect.defineMetadata(IPC_INVOKE, event, target, propertyName);
};

export const IpcSend = (event: string): MethodDecorator => {
  if (!event) throw new Error('ipc on event is required');
  return (target, propertyName) => Reflect.defineMetadata(IPC_SEND, event, target, propertyName);
};

export const Singleton = singleton;
export const Injectable = injectable;
export const AutoInjectable = autoInjectable;
export const Inject = inject;
export const InjectAll = injectAll;
export const Registry = registry;

const isProvider = <T extends RegistrationProvider>(provider: T | ClassConstructor): provider is T => !!(provider as T)?.token;
const getProviders = (constructors?: ModuleProvider[], token?: InjectionToken): RegistrationProvider[] => constructors?.map(constructor => (isProvider(constructor) ? constructor : ({ token: token || constructor, useValue: constructor }))) ?? [];
export const Module = (registration: RegistrationModule) => {
  const providers = getProviders(registration.providers);
  const controllers = getProviders(registration.controllers, CONTROLLERS);
  return registry([...providers, ...controllers]);
};
