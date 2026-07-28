import { Flex, Typography, Button, Segmented, Tooltip, Input, Space, App } from 'antd';
import { useRef, useState } from 'react';
import { CopyOutlined, EyeOutlined, GlobalOutlined } from '@ant-design/icons';
import qs from 'qs';
import { encode } from 'plantuml-encoder';
import { createWithRemoteLoader } from '@kne/remote-loader';
import lodash from 'lodash';
import dayjs from 'dayjs';

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

// 保持引用稳定，避免 LiveComponentEditor / 预览因 props 身份变化反复重挂载
const EDITOR_LIBS = { lodash, dayjs, qs };
const EDITOR_SITES = [{ host: 'localStorage:webpage-print-editor', name: '本地站点' }];
const transformContentUrl = url =>
  `${window.location.origin}/?contentUrl=${encodeURIComponent(url)}`;

const OUTPUT_OPTIONS = [
  {
    value: '/',
    label: '组件',
    hint: '在浏览器中直接打开并渲染当前组件'
  },
  {
    value: '/api/v1/parseRemoteModuleToPdf',
    label: 'PDF',
    hint: '请求导出接口，生成 PDF 文件'
  },
  {
    value: '/api/v1/parseRemoteModuleToPhoto',
    label: '图片',
    hint: '请求导出接口，生成图片文件'
  }
];

const AccessUrlContent = ({ getContent }) => {
  const { message } = App.useApp();
  const [outputType, setOutputType] = useState('/');
  const targetUrl = `${window.location.origin}${outputType}?${qs.stringify({
    content: getContent()
  })}`;
  const currentOption = OUTPUT_OPTIONS.find(item => item.value === outputType) || OUTPUT_OPTIONS[0];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(targetUrl);
      message.success('链接已复制');
    } catch (error) {
      console.error(error);
      message.error('复制失败');
    }
  };

  return (
    <Flex vertical gap={16} className="access-url-modal">
      <Flex vertical gap={8}>
        <Typography.Text strong>输出类型</Typography.Text>
        <Segmented
          block
          value={outputType}
          onChange={setOutputType}
          options={OUTPUT_OPTIONS.map(({ value, label }) => ({ value, label }))}
        />
        <Typography.Text type="secondary" className="access-url-hint">
          {currentOption.hint}
        </Typography.Text>
      </Flex>

      <Flex vertical gap={8}>
        <Typography.Text strong>访问链接</Typography.Text>
        <Space.Compact className="access-url-compact">
          <Input value={targetUrl} readOnly className="access-url-input" />
          <Tooltip title="复制">
            <Button icon={<CopyOutlined />} onClick={handleCopy} />
          </Tooltip>
          <Tooltip title="打开">
            <Button icon={<EyeOutlined />} href={targetUrl} target="_blank" rel="noreferrer" />
          </Tooltip>
        </Space.Compact>
      </Flex>
    </Flex>
  );
};

const AccessUrlButton = createWithRemoteLoader({
  modules: ['components-core:Modal@useModal']
})(({ remoteModules, getContent }) => {
  const [useModal] = remoteModules;
  const modal = useModal();

  return (
    <Tooltip title="访问地址">
      <Button
        icon={<GlobalOutlined />}
        onClick={() => {
          modal({
            title: '访问地址',
            footer: null,
            width: 640,
            children: (
              <App>
                <AccessUrlContent getContent={getContent} />
              </App>
            )
          });
        }}
      />
    </Tooltip>
  );
});

const LiveEditor = createWithRemoteLoader({
  modules: ['components-thirdparty:LiveComponentEditor']
})(({ remoteModules }) => {
  const [LiveComponentEditor] = remoteModules;
  const searchParams = qs.parse(window.location.search.slice(1));
  // value 仅用于生成访问地址；defaultValue 只作初始值，不能与 onChange 回写形成环
  const [value, setValue] = useState(() => searchParams.content || defaultContent);
  const [initialValue] = useState(value);
  const valueRef = useRef(value);
  valueRef.current = value;

  return (
    <LiveComponentEditor
      className="live-editor-full"
      defaultValue={initialValue}
      onChange={setValue}
      libs={EDITOR_LIBS}
      sites={EDITOR_SITES}
      transformContentUrl={transformContentUrl}
      toolbarExtra={<AccessUrlButton getContent={() => valueRef.current} />}
    />
  );
});

export default LiveEditor;
