import { Singleton } from '@main/utils/decorators';
import EventEmitter from 'events';

@Singleton()
export class AppEmitterEvent extends EventEmitter {}
