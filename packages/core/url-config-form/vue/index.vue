<!-- UrlConfigForm -->
<script lang="ts" setup>
  import { ref, onMounted } from 'vue';
  import { NInput, NButton, useDialog } from 'naive-ui';

  import { compProps, compCls, compEmits } from '../../../configs';

  const cls = compCls.UrlConfigForm;

  const props = defineProps(compProps.UrlConfigForm);
  const emit = defineEmits(compEmits.UrlConfigForm);
  
  const nDialog = useDialog();

  const oInputRef = ref();
  const inputValueRef = ref<string>('');

  onMounted(() => {
    handleInitInput();
  });

  function handleInitInput() {
    inputValueRef.value = props.url;
    onOperateInput((oInput) => {
      oInput.focus();
    });
  }

  function handleSubmit() {
    onOperateInput((oInput) => {
      const inputValue: string = inputValueRef.value.trim();

      if (!inputValue) {
        return;
      }
      nDialog.warning({
        title: '确认',
        content: '是否需要覆盖 url 的内容 ? (请谨慎操作)',
        positiveText: '确定',
        negativeText: '取消',
        onPositiveClick() {},
        onNegativeClick() {}
      });
    });
  }

  function handleLabelClick() {
    onOperateInput((oInput) => {
      oInput.focus();
    });
  }

  function onOperateInput(callback: (el: HTMLInputElement) => void) {
    const oElement: HTMLElement | undefined = oInputRef.value.$el;

    if (oElement) {
      if (oElement instanceof HTMLInputElement) {
        callback(oElement);
      } else {
        const oInput: HTMLInputElement = oElement.getElementsByTagName('input')[0];
        oInput && callback(oInput);
      }
    }
  }
</script>

<template>
  <div :class="cls.Container">
    <div :class="cls.Item">
      <label :class="cls.ItemLabel" @click="handleLabelClick">
        修改值：
      </label>
      <n-input
        ref="oInputRef"
        placeholder="请输入 url 的值"
        :class="cls.ItemComponent"
        size="large"
        v-model:value="inputValueRef"
      />
    </div>
    <div :class="cls.BtnGroup">
      <n-button :class="cls.Btn" @click="handleInitInput">重置内容</n-button>
      <n-button :class="cls.Btn" type="info">确认修改</n-button>
    </div>
  </div>
</template>
