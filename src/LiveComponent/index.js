import React, { useEffect, useRef, useMemo } from 'react';
import ReactDOM from 'react-dom/client';
import { useState } from 'react';
import { withRemoteLoader } from '@kne/remote-loader';
import lodash from 'lodash';
import { transform as _transform } from '@babel/standalone';
import * as Antd from 'antd';
import { Flex } from 'antd';

const { transform, memoize } = lodash;


const LiveComponent = withRemoteLoader(({ remoteModules, children, props, themeToken = {}, locale = 'zh-CN' }) => {
  const [error, setError] = useState(null);
  const rootRef = useRef(null);
  const { content, moduleNames } = children;
  const scope = useMemo(() => {
    return memoize((moduleNames) => {
      return transform(remoteModules, (result, module, index) => {
        result[moduleNames[index]] = module;
      }, {});
    })(moduleNames);
  }, [remoteModules, moduleNames]);
  useEffect(() => {
    const root = ReactDOM.createRoot(rootRef.current);

    const promise = (async () => {
      const code = _transform(`render(<PureGlobal themeToken={${JSON.stringify(themeToken)}} preset={${JSON.stringify({
        locale
      })}}>${content}</PureGlobal>);`, { presets: ['es2015', 'react'] }).code;
      // eslint-disable-next-line no-new-func
      const runnerFunction = new Function('React', 'render', 'props', 'Antd', 'lodash', ...moduleNames, code);
      runnerFunction(React, (jsx) => root.render(jsx), props, Antd, lodash, ...moduleNames.map((name) => scope[name]));
    })().catch((e) => {
      setError(e);
    });
    return () => {
      promise.then(() => {
        root.unmount();
      });
    };
  }, [scope, moduleNames, props, content]);

  return <Flex vertical>
    <div ref={rootRef} />
    {error && <div className="error-message">
      <pre>{error.message}</pre>
    </div>}
  </Flex>;
});

export default LiveComponent;