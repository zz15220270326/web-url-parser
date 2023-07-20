/* common hooks */

import {
  computed,
  ref,
  watch,

  type Ref
} from 'vue';

import { getQueryString } from './utils';
import { ICallbackOptions } from '../typings';

export function useCurrentUrl(
  state: Record<string, any>,
  emit: (event: 'update:url', ...args: any[]) => void
) {
  const currentSearch = computed(() => getQueryString(state.query));
  const currentUrl = computed(() => {
    const { protocol, host, pathname, query } = state;
    return `${protocol}//${host}${pathname}?${currentSearch.value}`;
  });

  watch(currentUrl, (newValue) => {
    emit('update:url', newValue);
  });

  return currentUrl;
}

export function useFowardRef(): [Ref<object | null>, (ref: object | null) => void] {
  const queryFormRef: Ref<object | null> = ref<object | null>() as Ref<object | null>;

  const forwardQueryFormRef = (ref: object | null) => {
    queryFormRef.value = ref;
  }

  return [queryFormRef, forwardQueryFormRef];
}

export function useVisible(): [Ref<boolean>, (isVisible: boolean) => void] {
  const visible: Ref<boolean> = ref<boolean>(false);

  const setVisible = (isVisible: boolean) => {
    visible.value = isVisible;
  }

  return [visible, setVisible];
}

export function useCopyValue(options: ICallbackOptions) {
  const {
    success,
    fail
  } = options;

  async function doCopy(value: string): Promise<boolean> {
    if (navigator) {
      return (
        navigator.clipboard.writeText(value)
          .then(() => {
            success({ value });
            return true;
          })
          .catch((err) => {
            fail(err);
            return false;
          })
      );
    }
    return new Promise<boolean>((resolve, reject) => {
      useDOMCopy(value, ({ el }) => {
        try {
          el.select();
          el.focus();
          const isCopyed = document.execCommand('copy');
          resolve(isCopyed);
        } catch (e) {
          reject(e);
        }
      });
    });
  }

  function useDOMCopy(
    value: string,
    callback: ({ el }: { el: HTMLTextAreaElement }) => void
  ) {
    const oTextArea: HTMLTextAreaElement = document.createElement('textarea');
    oTextArea.value = value;
    oTextArea.style.display = 'none';
    document.body.appendChild(oTextArea);

    callback({ el: oTextArea });

    document.body.removeChild(oTextArea);
  }

  return doCopy;
}
