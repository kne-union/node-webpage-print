import { createWithRemoteLoader } from '@kne/remote-loader';
import './index.scss';
import qs from 'qs';
import lodash from 'lodash';
import dayjs from 'dayjs';


const App = createWithRemoteLoader({
  modules: ['components-thirdparty:LiveComponentView']
})(({ remoteModules }) => {
  const [LiveComponentView] = remoteModules;
  const searchParams = qs.parse(window.location.search.slice(1));
  return <LiveComponentView {...Object.assign({}, searchParams)} libs={{ lodash, dayjs, qs }} />;
});

export default App;
