<script lang="ts" setup>
  import { PropType, computed } from 'vue';
  import {
    NIcon,
    NButton,
    NForm,
    NFormItem,
    NInput,
    NSelect,
    NCollapseItem
  } from 'naive-ui';

  import { useQueryFormValue, useKeywords, useRenderKeywordOption } from '../hooks';
  import { TrashBinOutline as RemoveIcon, AddOutline as AddIcon } from '@vicons/ionicons5';

  import { displayInfoLabelMap, compProps, compEmits, compCls } from '@packages/configs';

  const cls = compCls.QueryComp;

  const props = defineProps(compProps.QueryComp);

  const emit = defineEmits(compEmits.QueryComp);

  const {
    currentFormValue,
    formValueKeys,
    updateValue,
    resetValue,
    removeValue
  } = useQueryFormValue(props.formValue, emit);
  const { keywordList, addKeyWord, removeKeyWord } = useKeywords(currentFormValue);
  const optionRender = useRenderKeywordOption(keywordList, currentFormValue, {
    iconClick: handleIconClick
  });

  function handleSelectBlur(e: Event) {
    const tar = e.target || e.srcElement;

    if (tar instanceof HTMLInputElement) {
      const inputValue: string = tar.value.trim();
      addKeyWord(inputValue);
    }
  }

  function handleKeyDown(e: KeyboardEvent) {
    const tar = e.target || e.srcElement;
    const code = e.code.toLowerCase();
    
    if (code === 'enter') {
      if (tar instanceof HTMLInputElement) {
        const inputValue: string = tar.value.trim();
        addKeyWord(inputValue);
      }
    }
  }

  function handleIconClick(e: Event) {
    const tar = e.target || e.srcElement;
    if (tar instanceof HTMLElement) {
      const tagName: string = tar.tagName.toLowerCase();
      const value: string = tar.dataset.value || '';
      if (tagName === 'i') {
        removeKeyWord(value);
      }
    }

    e.stopPropagation();
  }

  function handleInputBlur(e: Event, prop: string) {
    const tar = e.target;

    if (tar instanceof HTMLInputElement) {
      updateValue(prop, tar.value);
    }
  }

  function handleAddQueryBtnClick() {
    emit('on-open-add-modal');
  }

  defineExpose({
    reset: resetValue
  });
</script>

<template>
  <div :class="cls.Container">
    <n-collapse-item title="Query 参数配置" name="query-form">
      <n-form
        :class="cls.InnerForm"
        :model="currentFormValue"
        label-placement="left"
        label-align="right"
        label-width="120px"
      >
        <n-form-item
          v-for="(value, prop) in currentFormValue"
          :key="`${prop} ${value}`"
          :label="`${displayInfoLabelMap[prop] || prop} : `"
        >
          <n-select
            :class="cls.FormComp"
            v-if="['keyword', 'keywords'].includes(prop)"
            v-model:value="currentFormValue[prop]"
            :multiple="prop === 'keywords'"
            :filterable="true"
            :options="keywordList"
            :tag="true"
            :max-tag-count="10"
            :render-label="optionRender"
            @blur="handleSelectBlur"
            @keydown="handleKeyDown"
          />
          <n-input
            class="query-form-comp"
            v-if="prop.includes('url')"
            :default-value="currentFormValue[prop]"
            @blur="handleInputBlur($event, prop)"
            :placeholder="`请输入${displayInfoLabelMap[prop] || ''}...`"
          />
          <!-- v-model:value.lazy="currentFormValue[prop]" -->
          <p
            v-if="!prop.includes('url') && !['keyword', 'keywords'].includes(prop)"
            class="readonly-paragraph"
          >
            {{ value }}
          </p>

          <!-- common -->
          <n-button :class="cls.IconBtn" circle type="error" @click="removeValue(prop)">
            <n-icon>
              <remove-icon />
            </n-icon>
          </n-button>
          <n-button :class="cls.IconBtn" circle type="primary" @click="handleAddQueryBtnClick">
            <n-icon>
              <add-icon />
            </n-icon>
          </n-button>
        </n-form-item>
      </n-form>

      <!-- 没有参数时显示一个添加按钮 -->
      <div :class="cls.EmptyPlaceholder" v-if="formValueKeys.length === 0">
        <n-button :class="cls.IconBtn" circle size="large" type="primary" @click="handleAddQueryBtnClick">
          <n-icon>
            <add-icon />
          </n-icon>
        </n-button>
      </div>
    </n-collapse-item>
  </div>
</template>
