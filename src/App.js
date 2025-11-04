import LiveComponent from './LiveComponent';
import getParams from './getParams';
import './index.scss';


const App = () => {
  const { content, scope, props, themeColor, locale, error } = getParams();
  if (error) {
    return <div className="error-message">
      <pre>{error}</pre>
    </div>;
  }
  const moduleNames = Object.keys(scope);
  return <LiveComponent props={props} themeToken={{ colorPrimary: themeColor }} locale={locale}
                        modules={moduleNames.map((name) => scope[name]).concat(['components-core:Global@PureGlobal'])}
                        children={{ content, moduleNames: moduleNames.concat(['PureGlobal']) }} />;
};

export default App;
