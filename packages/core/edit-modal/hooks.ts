import {
  reactive,
  onMounted,
  toRef,
  onBeforeUnmount,
  watch,
  h,
  computed,
  toRaw,
  ref,

  type Ref,
} from 'vue';
import type { SelectOption, SelectRenderLabel } from 'naive-ui';
import { IPropValue, ICallbackOptions } from '@packages/typings';

export function useQueryFormValue(
  intiialValue: Record<string, string>,
  emit: (event: 'on-change' | 'update:formValue', ...args: any[]) => void
) {
  const state = reactive<{
    formValue: Record<string, string>
  }>({
    formValue: {}
  });

  onMounted(() => {
    state.formValue = { ...intiialValue };
  });

  onBeforeUnmount(() => {
    state.formValue = {};
  });

  watch(() => state.formValue, (newValue) => {
    emit('on-change', toRaw(newValue));
    emit('update:formValue', toRaw(newValue));
  });

  const currentFormValue = toRef(state, 'formValue');

  const formValueKeys = computed(() => {
    const value = currentFormValue.value;
    return Object.keys(value);
  });

  function updateValue(prop: string, value: any) {
    state.formValue[prop] = value;
    emit('update:formValue', toRaw(state.formValue));
  }

  function resetValue() {
    if (state.formValue.hasOwnProperty('keyword')) {
      state.formValue.keyword = '';
    }
    if (state.formValue.hasOwnProperty('keywords')) {
      state.formValue.keywords = '';
    }

    state.formValue = { ...intiialValue };
    // emit('update:formValue', toRaw(state.formValue));
  }

  function removeValue(prop: string) {
    delete state.formValue[prop];
    // emit('update:formValue', toRaw(state.formValue));
  }

  return {
    currentFormValue,
    formValueKeys,

    updateValue,
    resetValue,
    removeValue
  };
}

interface IUseKeywordsApi {
  keywordList: Ref<SelectOption[]>;
  addKeyWord: (keyword: string) => void;
  removeKeyWord: (keyword: string) => void;
}
export function useKeywords(
  formValue: Ref<Record<string, any>>
): IUseKeywordsApi {
  const state = reactive({
    keywordList: <SelectOption[]> []
  });

  onMounted(() => {
    const initialValue = formValue.value;
    const keywordStr: string = String(initialValue.keyword || initialValue.keywords || '');
    const keywordList: SelectOption[] = keywordStr.split(',').map((val) => {
      return {
        label: val,
        value: val
      };
    });
    state.keywordList = keywordList;
  });

  onBeforeUnmount(() => {
    state.keywordList = [];
  });

  function addKeyWord(keyword: string): void {
    if (!keyword) {
      return;
    }
    const prevKeywordList = state.keywordList;
    if (prevKeywordList.length >= 10) {
      return;
    }
    if (prevKeywordList.find(item => item.value === keyword)) {
      return;
    }
    
    state.keywordList = [
      { value: keyword, label: `新增 ${keyword}` },
      ...prevKeywordList
    ];
  }

  function removeKeyWord(keyword: string) {
    if (!keyword) {
      return;
    }
    const prevKeywordList = state.keywordList;

    state.keywordList = prevKeywordList.filter(item => item.value !== keyword);
  }

  return {
    keywordList: toRef(state, 'keywordList'),
    addKeyWord,
    removeKeyWord
  };
}

export function useRenderKeywordOption(
  keywordList: Ref<SelectOption[]>,
  currentFormValue: Ref<{
    [x: string]: string;
  }>,
  { iconClick }: { iconClick: (e: Event) => void }
) {
  const isExistedValue = computed<boolean>(() => {
    const list = keywordList.value;
    const value = currentFormValue.value;
    const valueList = (value.keyword || value.keywords || '').split(',');

    return list.some(item => valueList.includes(String(item.value)));
  });

  const render: SelectRenderLabel = ({ label, value }, isSelected: boolean) => {
    return h(
      'div',
      {
        class: 'my-design-option'
      },
      [
        h(
          'i',
          {
            class: 'icon-close',
            onClick: iconClick,
            'data-value': value
          },
          'x '
        ),
        h(
          'span',
          {},
          String(label)
        ),
      ]
    )
  }

  return render;
}

export function useValidatePropValueList(
  data: IPropValue[],
  options: ICallbackOptions
) {
  const { success, fail } = options;
  
  const isNullIndex: number = data.findIndex(item => !item.prop || !item.value);
  if (isNullIndex !== -1) {
    fail(new Error(`第${isNullIndex + 1}项的 "prop" 和 "value" 均不能为空`));
    return;
  }

  const isInvalidIndex: number = data.findIndex(item => !item.value);
  if (isInvalidIndex !== -1) {
    fail(new Error(`第${isNullIndex + 1}项的 "value" 不合法`));
    return;
  }

  success(data);
}
