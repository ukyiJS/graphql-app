import { Singleton } from '@main/utils/decorators';
import { app, type Rectangle } from 'electron';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

type SettingData = {
  bounds: Rectangle;
  history: string[];
};

const parseDataFile = (filePath: string, defaultSetting = {} as SettingData) => {
  try {
    return JSON.parse(readFileSync(filePath).toString());
  } catch (error) {
    return defaultSetting;
  }
};

@Singleton()
export class Setting {
  private dataPath = join(app.getPath('userData'), 'string.json');
  private data = parseDataFile(this.dataPath) as SettingData;

  get<K extends keyof SettingData>(key: K): SettingData[K] | undefined {
    return this.data[key];
  }

  set<K extends keyof SettingData>(key: K, data: SettingData[K]) {
    this.data[key] = data;
    writeFileSync(this.dataPath, JSON.stringify(this.data));
  }
}
