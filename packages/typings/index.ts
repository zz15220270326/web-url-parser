/**
 * switch-tab component-list configs
 */
export interface ISwitchTabConfig {
  name: string;
  tab: string;
}

/**
 * parse-url action-types
 */
export enum ParseUrlActionTypes {
  SetProtocol = 'SetProtocol',
  SetHost = 'SetHost',
  SetPathname = 'SetPathname',
  SetQuery = 'SetQuery',
  AddQuery = 'AddQuery',
  RemoveQuery = 'RemoveQuery',

  UpdateAll = 'UpdateAll'
}

/**
 * edit-modal reactive state
 */
export interface IEditModalState {
  isShow: boolean;
  formValue: Record<string, any>;
}

/**
 * common prop-value declaration
 */
export interface IPropValue <T = any> {
  prop: string;
  value: T;
}

/**
 * common callback-options declaration
 */
export interface ICallbackOptions <SuccessData = Record<string, any>> {
  success: (data: SuccessData) => void;
  fail: (err: Error) => void;
}
