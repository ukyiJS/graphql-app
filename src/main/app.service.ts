import { Setting } from '@main/modules/setting';
import { Inject, Injectable } from './utils/decorators';

@Injectable()
export class AppService {
  constructor(@Inject(Setting) private setting: Setting) {}

  getHistory() {
    return this.setting.get('history') ?? [];
  }

  setHistory(history: string[]) {
    return this.setting.set('history', history);
  }
}
