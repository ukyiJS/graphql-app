import { AppEmitterEvent } from '@main/modules/appEmitterEvent';
import { AppService } from './app.service';
import { Inject, Injectable, IpcInvoke, IpcSend, On } from './utils/decorators';

@Injectable()
export class AppController {
  constructor(@Inject(AppService) private appService: AppService, @Inject(AppEmitterEvent) private event: AppEmitterEvent) {}

  @IpcSend('url-input-click')
  showUrlInput() {
    return true;
  }

  @IpcInvoke('get-history')
  getHistory() {
    return this.appService.getHistory();
  }

  @IpcInvoke('set-history')
  setHistory(history: string[]) {
    return this.appService.setHistory(history);
  }

  @On('url-input-click')
  onUrlInputClick() {
    this.showUrlInput();
  }
}
