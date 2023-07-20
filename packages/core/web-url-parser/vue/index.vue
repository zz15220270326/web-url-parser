<script lang="ts" setup>
  import { computed, defineAsyncComponent } from 'vue';
  
  import { useParseUrlState, useParseUrlEvents, useEditModal } from '../hooks';

  // 同步导入组件
  // import { SwitchTabs } from '@core/switch-tabs';
  // import { DisplayInfoPannel } from '@core/display-info-pannel';
  // import { EditModal } from '@core/edit-modal';

  // 异步导入组件
  const SwitchTabs = defineAsyncComponent(
    () => import('@core/switch-tabs/vue/index.vue')
  );
  const DisplayInfoPannel = defineAsyncComponent(
    () => import('@core/display-info-pannel/vue/index.vue')
  );
  const EditModal = defineAsyncComponent(
    () => import('@core/edit-modal/vue/index.vue')
  );
  const UrlConfigForm = defineAsyncComponent(
    () => import('@core/url-config-form/vue/index.vue')
  );

  import { ParseUrlActionTypes as Types } from '@packages/typings';
  import { compProps, compEmits, compCls, switchTabList } from '@packages/configs';
  import { useCurrentUrl } from '@packages/libs/hooks';

  const cls = compCls.WebUrlParser;

  const props = defineProps(compProps.WebUrlParser);

  const emit = defineEmits(compEmits.WebUrlParser);

  const isShowTabs = computed(() => props.isShowTabs);

  const { state, dispatch } = useParseUrlState(props.url ?? '');
  const currentUrl = useCurrentUrl(state, emit);

  const {
    handleChangeProtocol,
    handleChangeHost,
    handleChangePathname,
    handleSetQuery,
    handleAddQuery,
    handleRemoveQuery
  } = useParseUrlEvents(dispatch);

  const {
    isShow,
    formValue,
    setEditModalShow,
    setEditModalHide,
    resetEditModalValue,
    handleChangeFormValue
  } = useEditModal();

  function handleUpdateToTotalState(formValue: Record<string, string>) {
    dispatch(Types.UpdateAll, formValue);
    setEditModalHide(false);
  }
</script>

<template>
  <div :class="cls.Container">
    <switch-tabs
      v-if="isShowTabs"
      :list="switchTabList"
      :active-name="switchTabList[0].name"
    >
      <template #formConfig>
        <display-info-pannel
          show-total-url
          :current-url="currentUrl"
          :form-value="state"
          :rules="{}"
          @on-change-protocol="handleChangeProtocol"
          @on-change-host="handleChangeHost"
          @on-change-pathname="handleChangePathname"
          @on-show-edit-modal="() => setEditModalShow(state)"
        />
      </template>
      <template #urlConfig>
        <!-- TODO 直接配置 url 的组件 -->
        <url-config-form :url="currentUrl" />
      </template>
    </switch-tabs>

    <template v-else>
      <display-info-pannel
        show-total-url
        :current-url="currentUrl"
        :form-value="state"
        :rules="{}"
        @on-change-protocol="handleChangeProtocol"
        @on-change-host="handleChangeHost"
        @on-change-pathname="handleChangePathname"
        @on-show-edit-modal="() => setEditModalShow(state)"
      />
    </template>
  
    <!-- 编辑信息的表单 -->
    <edit-modal
      :show="isShow"
      :form-value="formValue"
      :current-url="currentUrl"
      @on-close="setEditModalHide"
      @on-reset="resetEditModalValue"
      @on-change-value="handleChangeFormValue"
      @on-update="handleUpdateToTotalState"
    />
  </div>
</template>