declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  
  /** Vue组件定义 */
  const VueComponent: DefineComponent<{}, {}, any>;

  export default VueComponent;
}