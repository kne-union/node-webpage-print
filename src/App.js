import { createWithRemoteLoader } from '@kne/remote-loader';
import './index.scss';
import qs from 'qs';
import lodash from 'lodash';
import dayjs from 'dayjs';
import Fetch from '@kne/react-fetch';


const App = createWithRemoteLoader({
  modules: ['components-thirdparty:LiveComponentView']
})(({ remoteModules }) => {
  const [LiveComponentView] = remoteModules;
  const searchParams = qs.parse(window.location.search.slice(1));
  if (searchParams.cacheKey) {
    return <Fetch url={`/api/v1/cache/${searchParams.cacheKey}`} render={({ data }) => {
      return <div id="target">
        <LiveComponentView {...Object.assign({}, data)} libs={{ lodash, dayjs, qs }} />
      </div>;
    }} />;
  }
  return <LiveComponentView {...Object.assign({}, searchParams)} libs={{ lodash, dayjs, qs }} />;
});

export default App;
