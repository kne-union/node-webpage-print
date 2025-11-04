import CodeEditor, { loader } from '@monaco-editor/react';
import { Flex, Typography, Card, Tabs, Button, Segmented } from 'antd';
import { useState } from 'react';
import { EyeOutlined } from '@ant-design/icons';
import ensureSlash from '@kne/ensure-slash';
import getParams from '../getParams';
import qs from 'qs';
import { encode } from 'plantuml-encoder';

loader.config({ paths: { vs: `${ensureSlash(window.PUBLIC_URL)}/monaco-editor/min/vs` } });

const defaultParams = Object.assign({}, {
  content: `<InfoPage>
  <InfoPage.Part title={props.title}>
    {props.content}
    <Antd.Flex justify="center">
      <Antd.Button>
        测试按钮
      </Antd.Button>
    </Antd.Flex>
  </InfoPage.Part>
</InfoPage>`, props: {
    title: '测试标题'
  }, scope: {
    'InfoPage': 'components-core:InfoPage'
  }
}, getParams());

const LiveEditor = () => {
  const [params, setParams] = useState(defaultParams);
  const [outputType, setOutputType] = useState('/');
  const { content, props, scope } = params;

  const targetUrl = `${window.location.origin}${outputType}?${qs.stringify({
    content: encode(content), props, scope: encode(JSON.stringify(scope))
  })}`;

  return <Flex vertical gap={8}>
    <Card size="small" title="访问地址">
      <div>
        <Segmented value={outputType} onChange={setOutputType}
                   options={[{ value: '/', label: '组件' }, {
                     value: '/api/v1/parseRemoteModuleToPdf', label: 'PDF'
                   }, { value: '/api/v1/parseRemoteModuleToPhoto', label: '图片' }]} />
      </div>
      <Typography.Text copyable>
        {targetUrl}
      </Typography.Text>
      <Button href={targetUrl} type="link" target="_blank" size="small" icon={<EyeOutlined />} />
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