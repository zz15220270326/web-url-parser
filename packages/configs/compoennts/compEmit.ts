export const compEmits = {
  DisplayInfoPannel: [
    'on-change-protocol',
    'on-change-host',
    'on-change-pathname',
    'on-set-query',
    'on-add-query',
    'on-remove-query',
    'on-reset',
    'on-show-edit-modal',
    'on-show-preview-modal'
  ],

  EditModal: [
    'on-change-value',
    'on-reset',
    'on-close',
    'on-update'
  ],

  AddQueryModal: ['update:visible', 'on-add-query'],

  QueryComp: [
    'on-change',
    'update:formValue',
    'on-open-add-modal'
  ],

  PreviewUrlModal: ['update:modelValue'],

  UrlConfigForm: <string[]> [],

  SwitchTabs: <string[]> [],

  WebUrlParser: ['update:url']
};

export default compEmits;
