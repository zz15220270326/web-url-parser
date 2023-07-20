import { App, DefineComponent } from 'vue';

/**
 * 注册单个组件
 */
export function registerComponent(Comp: DefineComponent<{}, {}, any>) {
  return {
    install(app: App) {
      const _compName: string = Comp.name;
      app.component(_compName, Comp);
      console.log('app', { app, _compName, Comp })
    }
  };
}

/**
 * 注册多个组件 TODO
 */
export function registerComponents(CompMap: { [key: string]: DefineComponent<{}, {}, any> }) {
  return {
    install(app: App) {
      Object.keys(CompMap).forEach(compName => {
        const Comp = CompMap[compName];
        app.component(compName, Comp);
      });
    }
  };
}

/**
 * 将 query-string 解析成 query-object
 */
export function getQueryObject(queryStr: string): Record<string, string> {
  const queryEntries = queryStr
    .replace(/^\?/, '')
    .split('&')
    .map(origin => {
      const [key, value] = origin.split('=');
      return [key, value];
    });
  return Object.fromEntries(queryEntries);
}

/**
 * 将 query-object 转化为 query-string
 */
export function getQueryString(queryObj: Record<string, string>): string {
  let queryStr = '';

  for (let k in queryObj) {
    queryStr += `${k}=${queryObj[k]}&`;
  }

  return queryStr.replace(/\&$/, '');
}
