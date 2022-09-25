import { AppEmitterEvent } from '@main/modules/appEmitterEvent';
import { Setting } from '@main/modules/setting';
import { type BrowserWindow, type KeyboardEvent } from 'electron';
import { AppService } from './app.service';
import { Inject, Injectable, IpcInvoke, IpcSend, On } from './utils/decorators';

@Injectable()
export class AppController {
  constructor(
    @Inject(AppService) private appService: AppService,
    @Inject(AppEmitterEvent) private event: AppEmitterEvent,
    @Inject(Setting) private setting: Setting,
  ) {}

  @IpcSend('reply-msg')
  replyMsg(msg: string) {
    return `${this.appService.getDelayTime()} seconds later, the main process replies to your message: ${msg}`;
  }

  @IpcInvoke('send-msg')
  async handleSendMsg(msg: string) {
    this.replyMsg(msg);
    return `The main process received your message: ${msg}`;
  }

  @IpcSend('url-input-click')
  showUrlInput() {
    return true;
  }

  @IpcInvoke('get-history')
  getHistory() {
    return this.setting.get('history') ?? [];
  }

  @IpcInvoke('set-history')
  setHistory(history: string[]) {
    return this.setting.set('history', history);
  }

  @On('url-input-click')
  onUrlInputClick(window: BrowserWindow, event: KeyboardEvent) {
    this.showUrlInput();
  }
}
