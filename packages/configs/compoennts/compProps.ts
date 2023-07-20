import type { PropType } from 'vue';
import type { FormRules } from 'naive-ui';
import { ISwitchTabConfig } from '@packages/typings';

const compProps = {
  DisplayInfoPannel: {
    formValue: {
      type: Object,
      default() {
        return {};
      }
    },
    rules: {
      type: Object as PropType<FormRules>,
      default() {
        return {};
      }
    },
    showTotalUrl: Boolean,
    currentUrl: {
      type: String,
      default: ''
    }
  },

  AddQueryModal: {
    visible: Boolean,
  },

  QueryComp: {
    disabled: Boolean,
    formValue: {
      type: Object as PropType<Record<string, string>>,
      required: true,
      default() {
        return {};
      }
    }
  },

  EditModal: {
    show: Boolean,
    formValue: {
      type: Object as PropType<Record<string, any>>,
      default() {
        return {};
      }
    },
    rules: {
      type: Object as PropType<FormRules>,
      default() {
        return {};
      }
    },
    currentUrl: String,
  },

  PreviewUrlModal: {
    modelValue: Boolean,
    url: {
      type: String,
      default: ''
    },
  },

  SwitchTabs: {
    list: {
      type: Array as PropType<ISwitchTabConfig[]>,
      default() {
        return [];
      }
    },
    activeName: String,
  },

  UrlConfigForm: {
    url: {
      type: String,
      required: true,
      default: ''
    }
  },

  WebUrlParser: {
    url: {
      type: String,
      required: true,
      default: ''
    },
    isShowTabs: {
      type: Boolean,
      default: false
    }
  },
};

export default compProps;
