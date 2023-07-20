import type { SelectOption } from 'naive-ui';
import type { ISwitchTabConfig } from '@packages/typings';

/** switch tab config-list */
export const switchTabList: ISwitchTabConfig[] = [
  {
    name: 'formConfig',
    tab: '表单配置'
  },
  {
    name: 'urlConfig',
    tab: '直接配置'
  }
];

/** protocol-list */
export const protocolList: SelectOption[] = [
  {
    label: 'HTTP',
    value: 'http:',
  },
  {
    label: 'HTTPS',
    value: 'https:',
  },
  {
    label: 'FTP',
    value: 'ftp:',
  },
  {
    label: 'FTPS',
    value: 'ftps:',
  },
  {
    label: 'WS',
    value: 'ws:'
  },
  {
    label: 'WSS',
    value: 'wss:'
  },
];

/** parse-url form-info map */
export const displayInfoLabelMap: Record<string, string> = {
  protocol: '网络协议',
  host: '域名 / IP 地址',
  pathname: '路径 / 路由',
  query: '路径携带参数'
};
