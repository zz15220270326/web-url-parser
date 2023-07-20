<script lang="ts" setup>
  import {
    ref,
    watch,
    toRaw
  } from 'vue';
  import {
    NModal,
    NSelect,
    NAutoComplete,
    NInput,
    NDivider,
    NButton,

    useMessage
  } from 'naive-ui'

  import { useValidatePropValueList } from '../hooks';

  import { IPropValue } from '@packages/typings';
  import { compCls, compProps, compEmits } from '@packages/configs';

  const cls = compCls.AddQueryModal;

  const props = defineProps(compProps.AddQueryModal);

  const emit = defineEmits(compEmits.AddQueryModal);

  const nMessage = useMessage();

  const propValList = ref<IPropValue[]>([
    { prop: '', value: '' }
  ]);

  watch(() => props.visible, (isVisible) => {
    if (!isVisible) {
      propValList.value = [{ prop: '', value: '' }];
    }
  });

  function handleRemoveItem(index: number) {
    const prevValue = propValList.value;
    if (prevValue.length <= 1) return;

    propValList.value = prevValue.filter((itm, idx) => idx !== index);
  }

  function handleAddItem() {
    const prevValue = propValList.value;
    propValList.value = [
      ...prevValue,
      { value: '', prop: '' }
    ];
  }

  function handleSubmit() {
    useValidatePropValueList(toRaw(propValList.value), {
      success(data) {
        emit('on-add-query', data);
        emit('update:visible', false);
      },
      fail(err) {
        nMessage.error(`校验失败: ${err?.message || JSON.stringify(err)}`);
      }
    });
  }
</script>

<template>
  <n-modal
    :show="props.visible"
    title="批量添加 query 参数"
    :class="cls.Modal"
    :z-index="999"
    :mask-closable="false"
    preset="confirm"
    negative-text="确认添加"
    :negative-button-props="{
      size: 'large',
      type: 'primary',
    }"
    @negative-click="handleSubmit"
    @close="emit('update:visible', false)"
    :unstable-show-mask="true"
  >
    <template
      v-for="(item, index) of propValList"
      :key="`${index + 1} ${item.prop}`"
    >
      <div :class="cls.GroupItems">
        <div :class="cls.PropItem">
          <label :class="cls.InnerTip">
            请输入属性 : 
          </label>
          <p :class="cls.InnerComponent">
            <n-input
              :id="`item-prop-${item.prop}`"
              :default-value="item.prop"
              @change="item.prop = $event"
            />
          </p>
        </div>
        <div :class="cls.ContentItem">
          <label :class="cls.InnerTip">
            请输入内容 : 
          </label>
          <p :class="cls.InnerComponent">
            <n-input
              :id="`item-prop-${item.prop}`"
              :default-value="item.value"
              @change="item.value = $event"
            />
          </p>
        </div>
      </div>
      <div :class="cls.BtnGroup">
        <n-button
          type="error"
          :disabled="propValList.length <= 1"
          @click="handleRemoveItem(index)"
        >
          删除此项
        </n-button>
        <n-button
          type="primary"
          :disabled="propValList.length >= 3"
          @click="handleAddItem"
        >
          新增一项
        </n-button>
      </div>
      <n-divider />
    </template>
  </n-modal>
</template>
