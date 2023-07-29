import { ref, watch, type Ref } from 'vue';

interface ILogInfo {
  /** 日志 id (回滚记录的时候使用) */
  id: string;
  /** 日志创建的时间 */
  createTime: number;
  /** 日志内容 (使用 JSON 字符串进行存储) */
  logContent: string;
}

interface ILoggerOptions {
  key: string;
}

class Logger {
  private static keyList: string[] = [];
  private _currentKey: string;
  private logInfoList: Ref<ILogInfo[]> = ref([]);

  constructor(options: ILoggerOptions) {
    const { key } = options;
    const { keyList } = Logger;
    this._currentKey = `logger_$$_${key}`;

    if (keyList.includes(key)) {
      return;
    }
    keyList.push(key);

    this._init();
  }

  private _init() {
    this._initWatchers();
    this._initValue();
  }

  private _initWatchers() {
    const { _currentKey } = this;
    watch(this.logInfoList, (newValue) => {
      localStorage.setItem(_currentKey, JSON.stringify(newValue));
    });
  }

  private _initValue() {
    const { _currentKey } = this;
    const logInfoList: ILogInfo[] = JSON.parse(localStorage.getItem(_currentKey) || '[]');
    this.logInfoList.value = logInfoList;
  }

  public get currentKey() {
    return this._currentKey;
  }

  /** 添加一条日志信息到 logList 里面 */
  public add(logInfo: ILogInfo) {
    this.logInfoList.value.unshift(logInfo);
  }

  /** 根据 id 将当前的日志回滚到某一个版本 */
  public revert(id: string) {
    const logInfoList = this.logInfoList.value;
    const idIndex = logInfoList.findIndex(item => id == item.id);

    if (idIndex !== -1) {
      this.logInfoList.value = logInfoList.filter((item, index) => index >= idIndex);
    }
  }
}

export default Logger;
