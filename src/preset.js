import { preset as remoteLoaderPreset } from '@kne/remote-loader';
import { preset as fetchPreset } from '@kne/react-fetch';
import createAjax from '@kne/axios-fetch';

window.PUBLIC_URL = window.runtimePublicUrl || process.env.PUBLIC_URL;
const baseApiUrl = window.runtimeApiUrl || '';

export const globalInit = async () => {
  const ajax = createAjax({
    baseURL: baseApiUrl
  });
  fetchPreset({
    ajax, transformResponse: response => {
      const { data } = response;
      response.data = {
        code: data.code === 0 ? 200 : data.code, msg: data.msg, results: data.data
      };
      return response;
    }
  });

  const registry = {
    url: 'https://cdn.leapin-ai.com', tpl: '{{url}}/components/@kne-components/{{remote}}/{{version}}/build'
  };
  const componentsCoreRemote = {
    ...registry, remote: 'components-core', defaultVersion: '0.5.22'
  };
  remoteLoaderPreset({
    remotes: {
      default: componentsCoreRemote, 'components-core': componentsCoreRemote, 'components-iconfont': {
        ...registry, remote: 'components-iconfont', defaultVersion: '0.2.1'
      }, 'components-view': {
        ...registry, remote: 'components-view', defaultVersion: '0.1.40'
      }, 'components-thirdparty': {
        ...registry,
        url: 'http://localhost:3050',
        tpl: '{{url}}',
        remote: 'components-thirdparty', defaultVersion: '0.1.32'
      }
    }
  });

  return {ajax};
};