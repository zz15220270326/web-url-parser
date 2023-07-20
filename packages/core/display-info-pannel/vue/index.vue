<script lang="ts" setup>
  import { computed } from 'vue';
  import {
    NCard,
    NForm,
    NFormItem,
    NInput,
    NSelect,
    NButton,
    NIcon,

    useMessage
  } from 'naive-ui';

  import { PreviewUrlModal } from '@core/preview-url-modal';

  import {
    compProps,
    compEmits,
    compCls,

    protocolList,
    displayInfoLabelMap
  } from '@packages/configs';
  import { useVisible, useCopyValue } from '@packages/libs/hooks';

  const cls = compCls.DispayInfoPannel;

  const props = defineProps(compProps.DisplayInfoPannel);
  
  const emit = defineEmits(compEmits.DisplayInfoPannel);

  const nMessage = useMessage();
  const [isShowPreviewModal, setIsShowPreviewModal] = useVisible();
  const copyValue = useCopyValue({
    success: ({ value }) => {
      nMessage.success('复制成功');
      console.log(value);
    },
    fail: (err) => {
      console.log('Error: ', err);
    }
  });

  const currentProtocolList = computed(() => {
    const { protocol } = props.formValue;
    return protocolList.map(item => {
      if (item.value === protocol) {
        return {
          ...item,
          disabled: true
        };
      }
      return {
        ...item,
        disabled: false
      };
    });
  });

  function handleShowQueryBtnClick() {
    emit('on-show-edit-modal');
  }

  function handlePreviewBtnClick() {
    setIsShowPreviewModal(true);
  }

</script>

<template>
  <div :class="cls.Container">
    <n-form
      ref="formRef"
      :inline="false"
      :model="props.formValue"
      :rules="rules"
      label-placement="left"
      label-align="right"
      label-width="120px"
    >
      <n-form-item
        key="current-url"
        label="当前 host: "
      >
        <a href="javascript:;" @click="copyValue(props.currentUrl)">
          {{ props.currentUrl }}
        </a>
      </n-form-item>
      <n-form-item
        v-for="(value, prop) in props.formValue"
        :key="prop"
        :label="`${displayInfoLabelMap[prop]} : `"
      >
        <n-select
          v-if="['protocol'].includes(prop)"
          :value="value"
          :readonly="true"
          :options="currentProtocolList"
        />
        <n-input
          v-if="['host', 'pathname'].includes(prop)"
          :value="value"
          :readonly="true"
          placeholder="请输入。。。"
        />
        <template v-if="['query'].includes(prop)">
          自定义表单
        </template>
      </n-form-item>
      <n-form-item :class="cls.BtnGroup">
        <n-button
          icon-placement="left"
          size="large"
          @click="handlePreviewBtnClick"
        >
          url 预览
        </n-button>
        <n-button
          type="primary"
          icon-placement="left"
          size="large"
          @click="handleShowQueryBtnClick"
        >
          编辑
        </n-button>
        <!-- <n-button type="info" icon-placement="left" size="large">
          操作日志
        </n-button> -->
      </n-form-item>
    </n-form>

    <!-- 预览 url 内容的组件 -->
    <preview-url-modal v-model="isShowPreviewModal" :url="props.currentUrl" />
  </div>

</template>
