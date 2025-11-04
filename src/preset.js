import { preset as remoteLoaderPreset } from '@kne/remote-loader';


window.PUBLIC_URL = window.runtimePublicUrl || process.env.PUBLIC_URL;


export const globalInit = async () => {
  const registry = {
    url: 'https://uc.fatalent.cn', tpl: '{{url}}/packages/@kne-components/{{remote}}/{{version}}/build'
  };
  const componentsCoreRemote = {
    ...registry, remote: 'components-core', defaultVersion: '0.4.34'
  };
  remoteLoaderPreset({
    remotes: {
      default: componentsCoreRemote, 'components-core': componentsCoreRemote, 'components-iconfont': {
        ...registry, remote: 'components-iconfont', defaultVersion: '0.2.1'
      }, 'components-view': {
        ...registry, remote: 'components-view', defaultVersion: '0.1.40'
      }, 'components-thirdparty': {
        ...registry, remote: 'components-thirdparty', defaultVersion: '0.1.1'
      }
    }
  });

  return {};
};