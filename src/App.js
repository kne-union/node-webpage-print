import { createWithRemoteLoader } from '@kne/remote-loader';
import './index.scss';
import qs from 'qs';


const App = createWithRemoteLoader({
  modules: ['components-thirdparty:LiveComponentView']
})(({ remoteModules }) => {
  const [LiveComponentView] = remoteModules;
  const searchParams = qs.parse(window.location.search.slice(1));
  return <LiveComponentView {...Object.assign({}, searchParams)} />;
});

export default App;
