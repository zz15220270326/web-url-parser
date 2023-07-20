import { WebUrlParser } from '@core/web-url-parser';
import { SwitchTabs } from '@core/switch-tabs';
import { EditModal } from '@core/edit-modal';
import { DisplayInfoPannel } from '@core/display-info-pannel';

import { registerComponents } from './libs/utils';

// 按需导入
export {
  WebUrlParser,
  SwitchTabs,
  EditModal,
  DisplayInfoPannel
};

// 全局 app.use 安装
export default registerComponents({
  WebUrlParser,
  SwitchTabs,
  EditModal,
  DisplayInfoPannel
});

export * from './libs/utils';
export * from './libs/hooks';
