import {
  reactive,
  computed,
  readonly,
  toRaw
} from 'vue';
import { useDialog } from 'naive-ui';

import { 
  IPropValue,
  ParseUrlActionTypes as Types,
  IEditModalState
} from '@packages/typings';
import { getQueryObject, getQueryString } from '@packages/libs/utils';

export function useParseUrlState(originUrl: string) {
  const { protocol, host, pathname, search } = new URL(originUrl);

  const state = reactive({
    protocol,
    host,
    pathname,
    query: getQueryObject(search)
  });

  const currentSearch = computed(() => getQueryString(state.query));

  const currentUrl = computed(() => {
    const { protocol, host, pathname, query } = state;
    return `${protocol}//${host}${pathname}?${currentSearch.value}`;
  });

  const dispatch = (type: string, payload?: string | Record<string, string>) => {
    switch (type) {
      case Types.SetProtocol:
        if (typeof payload === 'string') {
          state.protocol = payload;
        }
        break;
      case Types.SetHost:
        if (typeof payload === 'string') {
          state.host = payload;
        }
        break;
      case Types.SetPathname:
        if (typeof payload === 'string') {
          state.pathname = payload;
        }
        break;
      case Types.SetQuery:
        if (typeof payload === 'object' && payload !== null) {
          state.query = {
            ...state.query,
            ...payload
          };
        }
        break;
      case Types.AddQuery:
        if (typeof payload === 'object' && payload !== null) {
          const { key, value } = payload as Record<string, string>;
          if (!state.query.hasOwnProperty(key)) {
            state.query[key] = value;
          }
        }
        break;
      case Types.RemoveQuery:
        if (typeof payload === 'object' && payload !== null) {
          const { key } = payload as Record<string, string>;
          if (!state.query.hasOwnProperty(key)) {
            delete state.query[key];
          }
        }
        break;
      case Types.UpdateAll:
        if (typeof payload === 'object' && payload !== null) {
          Object.assign(state, payload);
        }
        break;
      default:
        break;
    }
  }

  return {
    state: readonly(state),
    currentSearch,
    currentUrl,
    dispatch
  };
}

export function useParseUrlEvents(
  dispatch: (type: string, payload?: string | Record<string, string>) => void
) {

  const handleChangeProtocol = (newValue: string): void => {
    console.log(newValue, 'handleChangeProtocol')
    dispatch(Types.SetProtocol, newValue);
  }

  const handleChangeHost = (newValue: string): void => {
    dispatch(Types.SetHost, newValue);
  }

  const handleChangePathname = (newValue: string): void => {
    dispatch(Types.SetPathname, newValue);
  };

  const handleSetQuery = (newQuery: Record<string, string>) => {
    dispatch(Types.SetPathname, newQuery);
  }

  const handleAddQuery = (key: string, value: string = '') => {
    dispatch(Types.AddQuery, { key, value });
  }

  const handleRemoveQuery = (key: string) => {
    dispatch(Types.RemoveQuery, { key });
  }

  return {
    handleChangeProtocol,
    handleChangeHost,
    handleChangePathname,
    handleSetQuery,
    handleAddQuery,
    handleRemoveQuery
  };
}

export function useEditModal() {
  let initialFormValue: null | Record<string, any>;
  const state = reactive<IEditModalState>({
    isShow: false,
    formValue: {}
  });
  const dialog = useDialog();

  const isShow = computed(() => state.isShow);
  const formValue = computed(() => state.formValue);

  function setIsShow(currentIsShow: boolean) {
    state.isShow = currentIsShow;
  }

  function setEditModalShow(formValue: Record<string, any>) {
    if (!Object.keys(toRaw(state.formValue)).length) {
      state.formValue = { ...formValue };
    }

    setIsShow(true);
    if (!initialFormValue) {
      initialFormValue = { ...formValue };
    }
  }

  function setEditModalHide(isTip = true) { 
    if (!isTip) {
      setIsShow(false);
      return;
    }

    dialog.info({
      title: '确认',
      content: '再退出之前，是否保留编辑数据',
      positiveText: '确定',
      negativeText: '取消',
      onPositiveClick() {
        console.log(state.formValue);
        setIsShow(false);
      },
      onNegativeClick() {
        state.formValue = {};
        setIsShow(false);
      },
    });
  }

  function handleChangeFormValue<T>(options: IPropValue) {
    const { prop, value } = options;

    state.formValue[prop] = value;
  }

  function resetEditModalValue() {
    if (initialFormValue) {
      state.formValue = { ...initialFormValue };
    }
    console.log(state.formValue);
  }

  return {
    isShow,
    formValue,
    
    setEditModalShow,
    setEditModalHide,
    handleChangeFormValue,
    resetEditModalValue
  };
}
