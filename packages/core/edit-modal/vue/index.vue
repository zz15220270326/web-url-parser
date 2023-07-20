<script lang="ts" setup>
  import { computed, ref, nextTick } from 'vue';
  import {
    NModal,
    NCollapse,
    NForm,
    NFormItem,
    NInput,
    NSelect,
    NButton,

    useMessage,

    FormInst
  } from 'naive-ui';

  import QueryComp from './QueryComp.vue';
  import AddQueryModal from './AddQueryModal.vue';

  import { useFowardRef, useVisible, useCopyValue } from '@packages/libs/hooks';
  import {
    compProps,
    compEmits,
    compRules,
    compCls,

    protocolList,
    displayInfoLabelMap
  } from '@packages/configs';
  import { IPropValue } from '@packages/typings';

  const props = defineProps(compProps.EditModal);

  const emit = defineEmits(compEmits.EditModal);

  const cls = compCls.EditModal;

  const rules = compRules.EditModal;

  const formRef = ref<FormInst>();
  
  const nMessage = useMessage();
  const [isAddModalVisible, setIsAddModalVisible] = useVisible();
  const [queryCompRef, forwardQueryFormRef] = useFowardRef();
  const handleCopy = useCopyValue({
    success({ value }) {
      nMessage.success('复制成功');
      console.log(value);
    },
    fail() {}
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

  function handleChangeValue(value: string, prop: string) {
    emit('on-change-value', { value, prop });
  }

  function handleResetClick() {
    if (!queryCompRef.value) return;

    const { reset } = queryCompRef.value as { reset(): void };
    typeof reset === 'function' && reset();

    emit('on-reset');
  }

  function handleSubmitClick() {
    const formApi = formRef.value;
    if (!formApi) return;

    formApi.validate((errors) => {
      if (errors?.length) {
        console.warn(errors);
        return;
      }
      emit('on-update', props.formValue);
    });
  }

  function handleClose() {
    emit('on-close');
  }

  function addQuery(data: IPropValue[]) {
    const { query } = props.formValue;
    
    for (let { prop, value } of data) {
      if (query.hasOwnProperty(prop)) {
        continue;
      }
      props.formValue.query[prop] = value;
    }
  }

</script>

<template>
  <n-modal
    :class="cls.Modal"
    preset="dialog"
    :show="props.show"
    close-on-esc
    :z-index="888"
    title="编辑内容"
    type="info"
    :show-icon="true"
    style="width: 760px"
    to="body"
    role="dialog"
    aria-modal="true"
    transform-origin="center"
    @close="handleClose"
  >
    <n-collapse
      :class="cls.Inner"
      default-expanded-names="query-form"
    >
      <n-form
        style="width: 720px;"
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
          <a
            href="javascript:;"
            v-if="props.currentUrl"
            @click="handleCopy(props.currentUrl || '')"
          >
            {{ props.currentUrl }}
          </a>
        </n-form-item>

        <n-form-item
          v-for="(value, prop) in props.formValue"
          :key="prop"
          :label="`${displayInfoLabelMap[prop]} : `"
          :path="prop"
        >
          <n-select
            v-if="['protocol'].includes(prop)"
            :value="value"
            :options="currentProtocolList"
            :filterable="true"
            @update:value="handleChangeValue($event, prop)"
          />
          <n-input
            v-if="['host', 'pathname'].includes(prop)"
            :value="value"
            @input="handleChangeValue($event, prop)"
            placeholder="请输入。。。"
          />
          <query-comp
            v-if="['query'].includes(prop)"
            :ref="forwardQueryFormRef"
            :disabled="false"
            v-model:formValue="props.formValue[prop]"
            @on-open-add-modal="setIsAddModalVisible(true)"
          />
        </n-form-item>

        <n-form-item :class="cls.BtnGroup">
          <n-button @click="handleResetClick">
            重置
          </n-button>
          <n-button
            type="info"
            icon-placement="left"
            @click="handleSubmitClick"
          >
            编辑
          </n-button>
        </n-form-item>
      </n-form>
    </n-collapse>
  </n-modal>

  <!-- 添加 query 参数的组件 -->
  <add-query-modal
    v-model:visible="isAddModalVisible"
    @on-add-query="addQuery"
  />
</template>
