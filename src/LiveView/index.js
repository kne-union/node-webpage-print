import { createWithRemoteLoader } from '@kne/remote-loader';
import qs from 'qs';
import lodash from 'lodash';
import dayjs from 'dayjs';
import Fetch from '@kne/react-fetch';

const LIBS = { lodash, dayjs, qs };

const LiveView = createWithRemoteLoader({
  modules: ['components-thirdparty:LiveComponentView']
})(({ remoteModules }) => {
  const [LiveComponentView] = remoteModules;
  const searchParams = qs.parse(window.location.search.slice(1));

  if (searchParams.cacheKey) {
    return <Fetch url={`/api/v1/cache/${searchParams.cacheKey}`} render={({ data }) => {
      return <div id="target">
        <LiveComponentView {...Object.assign({}, data)} libs={LIBS} />
      </div>;
    }} />;
  }

  // 站点内容分享短链：?contentUrl=https://.../content/{shorten}
  if (searchParams.contentUrl) {
    const { contentUrl, content, cacheKey, options, ...rest } = searchParams;
    return <div id="target">
      <LiveComponentView.Fetch url={contentUrl} libs={LIBS} {...rest} />
    </div>;
  }

  return <LiveComponentView {...Object.assign({}, searchParams)} libs={LIBS} />;
});

export default LiveView;