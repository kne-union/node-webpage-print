import qs from 'qs';
import { decode } from 'plantuml-encoder';

const getParams = () => {
  const searchParams = qs.parse(window.location.search.slice(1));
  const { locale, themeColor, content, scope, props, encodeProps } = searchParams;

  try {
    return {
      locale: locale || 'zh-CN',
      themeColor,
      content: content ? decode(content) : '',
      scope: scope ? JSON.parse(decode(scope)) : {},
      props: Object.assign({}, props, encodeProps ? JSON.parse(decode(encodeProps)) : {})
    };
  } catch (e) {
    return { error: e.message || '参数无法解析' };
  }
};

export default getParams;