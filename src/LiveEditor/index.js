import { Flex, Typography, Card, Button, Segmented, Descriptions, ColorPicker, Alert, Input } from 'antd';
import { useState } from 'react';
import { EyeOutlined } from '@ant-design/icons';
import qs from 'qs';
import { encode } from 'plantuml-encoder';
import { createWithRemoteLoader } from '@kne/remote-loader';

const defaultContent = encode(JSON.stringify({
  props: {
    title: {
      type: 'string', defaultValue: '测试标题'
    }, content: {
      type: 'string', defaultValue: '测试内容'
    }
  }, scope: {
    'InfoPage': 'components-core:InfoPage'
  }, content: `<div id="print-el" style={{ width: '500px', height: '400px', padding: '12px' }}>
  <InfoPage>
    <InfoPage.Part title={props.title}>
      {props.content}
      <Antd.Flex justify="center">
        <Antd.Button>
          测试按钮
        </Antd.Button>
      </Antd.Flex>
    </InfoPage.Part>
  </InfoPage>
</div>`
}));


const LiveEditor = createWithRemoteLoader({
  modules: ['components-thirdparty:LiveComponentEditor']
})(({ remoteModules }) => {
  const [LiveComponentEditor] = remoteModules;
  const searchParams = qs.parse(window.location.search.slice(1));
  const [params, setParams] = useState({ content: defaultContent, selector: 'print-el' });
  const [outputType, setOutputType] = useState('/');
  const { content, props, themeColor, locale, selector } = params;
  const [value, setValue] = useState(searchParams.content || content);

  const targetUrl = `${window.location.origin}${outputType}?${qs.stringify({
    content: value, props, themeColor, locale, options: {
      selector: selector
    }
  })}`;

  return <Flex vertical gap={8} style={{ padding: '24px' }}>
    <Card size="small" title="访问地址">
      <Flex vertical gap={4}>
        <div>
          <Segmented value={outputType} onChange={setOutputType}
                     options={[{ value: '/', label: '组件' }, {
                       value: '/api/v1/parseRemoteModuleToPdf', label: 'PDF'
                     }, { value: '/api/v1/parseRemoteModuleToPhoto', label: '图片' }]} />
        </div>
        <div>
          <Typography.Text copyable>
            {targetUrl}
          </Typography.Text>
          <Button href={targetUrl} type="link" target="_blank" size="small" icon={<EyeOutlined />} />
        </div>
      </Flex>
    </Card>
    <Card size="small" title="属性">
      <Descriptions items={[{
        label: '主题色', children: <ColorPicker value={themeColor} onChange={(color) => {
          setParams((params) => {
            return Object.assign({}, params, { themeColor: color.toHexString() });
          });
        }} />
      }, {
        label: '语言', children: <Segmented value={locale || 'zh-CN'} onChange={(value) => {
          setParams((params) => {
            return Object.assign({}, params, { locale: value });
          });
        }} options={[{ value: 'zh-CN', label: '中文' }, {
          value: 'en-US', label: '英文'
        }]} />
      }, {
        label: '选择器', children: <Flex vertical gap={4}>
          <Input value={selector} onChange={(e) => {
            const selector = e.target.value;
            setParams((params) => {
              return Object.assign({}, params, { selector });
            });
          }} />
          <Alert
            message="css选择器，只渲染选择器对应的元素，PDF和图片输出有效。输入不存在的选择器将会不能正确输出结果，渲染整个页面传空即可"
            size="small" />
        </Flex>
      }]} />
    </Card>
    <LiveComponentEditor defaultValue={value} onChange={setValue} />
  </Flex>;
});

export default LiveEditor;