import CodeEditor, { loader } from '@monaco-editor/react';
import { Flex, Typography, Card, Tabs, Button, Segmented, Descriptions, ColorPicker, Alert, Input } from 'antd';
import { useState } from 'react';
import { EyeOutlined } from '@ant-design/icons';
import ensureSlash from '@kne/ensure-slash';
import getParams from '../getParams';
import qs from 'qs';
import { encode } from 'plantuml-encoder';
import merge from 'lodash/merge';
import omitBy from 'lodash/omitBy';
import isEmpty from 'lodash/isEmpty';

loader.config({ paths: { vs: `${ensureSlash(window.PUBLIC_URL)}/monaco-editor/min/vs` } });

const defaultParams = merge({}, {
  content: `<div id="print-el" style={{width: '500px',height:'400px',padding:'12px'}}>
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
</div>;`, props: {
    title: '测试标题', content: '测试内容'
  }, scope: {
    'InfoPage': 'components-core:InfoPage'
  }, selector: '#print-el'
}, omitBy(getParams(), isEmpty));

const LiveEditor = () => {
  const [params, setParams] = useState(defaultParams);
  const [outputType, setOutputType] = useState('/');
  const { content, props, scope, themeColor, locale, selector } = params;

  const targetUrl = `${window.location.origin}${outputType}?${qs.stringify({
    content: encode(content), props, scope: encode(JSON.stringify(scope)), themeColor, locale, options: {
      selector: selector
    }
  })}`;

  return <Flex vertical gap={8}>
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
    <Tabs defaultActiveKey="content" items={[{
      key: 'props',
      label: '组件参数',
      children: <CodeEditor height={500} defaultLanguage="json" defaultValue={JSON.stringify(props, null, 2)}
                            onChange={(str) => {
                              try {
                                const props = JSON.parse(str);
                                setParams((params) => {
                                  return Object.assign({}, params, {
                                    props
                                  });
                                });
                              } catch (e) {
                              }
                            }} />
    }, {
      key: 'scope',
      label: '组件域',
      children: <CodeEditor height={500} defaultLanguage="json" defaultValue={JSON.stringify(scope, null, 2)}
                            onChange={(str) => {
                              try {
                                const scope = JSON.parse(str);
                                setParams((params) => {
                                  return Object.assign({}, params, {
                                    scope
                                  });
                                });
                              } catch (e) {
                              }
                            }} />
    }, {
      key: 'content',
      label: '组件内容',
      children: <CodeEditor height={500} defaultLanguage="javascript" defaultValue={content} onChange={(str) => {
        setParams((params) => {
          return Object.assign({}, params, {
            content: str
          });
        });
      }} />
    }]}></Tabs>
  </Flex>;
};

export default LiveEditor;