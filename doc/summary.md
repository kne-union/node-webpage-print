#### 简介
Node Webpage Print 是一个基于Node.js的网页打印服务，能够将HTML内容或URL转换为PDF或图片格式。该服务提供RESTful API接口，支持单页面处理和批量处理功能，适用于需要自动化文档生成、网页存档或截图的应用场景。

#### 技术栈
- **运行环境**: Node.js
- **Web框架**: Fastify
- **网页渲染**: Puppeteer (基于Chromium)
- **容器化**: Docker

#### 主要功能
- 将HTML内容转换为PDF
- 将URL网页转换为PDF
- 将HTML内容转换为图片
- 将URL网页转换为图片
- 批量处理多个转换任务
- 自定义页面设置和输出选项

#### 部署方式
项目支持两种部署方式：

##### 本地部署
```bash
# 安装依赖
npm install

# 启动服务
npm start
```

##### 使用 Docker

最简单的方式是使用已发布的 Docker 镜像：

```bash
docker run --name node-webpage-print -p 8047:8040 -d --restart=always ghcr.io/kne-union/node-webpage-print
```

这将启动一个名为 `node-webpage-print` 的容器，并将服务映射到本地的 8047 端口。

#### 环境变量配置

可以通过环境变量自定义服务的行为：

| 环境变量 | 描述 | 默认值 |
|----------|------|--------|
| PORT | 服务器端口 | 8040 |
| MAX_CACHE_KEYS | 最大缓存键数 | 1000 |
| MAX_TASK_SIZE | 最大任务数 | 100 |
| PAGE_WIDTH | 页面宽度（像素） | 1366 |
| PAGE_HEIGHT | 页面高度（像素） | 768 |

示例：

```bash
docker run --name node-webpage-print -p 8047:8040 -e PORT=8040 -e PAGE_WIDTH=1920 -e PAGE_HEIGHT=1080 -d --restart=always ghcr.io/kne-union/node-webpage-print
```

#### 使用场景
- 自动化报表生成
- 网页内容归档
- 网站截图服务
- 批量文档转换
- 网页内容的离线访问
