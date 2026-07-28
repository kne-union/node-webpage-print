import { createWithRemoteLoader } from '@kne/remote-loader';
import './index.scss';

const App = createWithRemoteLoader({
  modules: ['components-core:Global']
})(({ remoteModules,...props }) => {
  const [Global] = remoteModules;
  return <Global {...props} />;
});

export default App;
