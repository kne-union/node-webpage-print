# Node Webpage Print

一个基于 Node.js 和 Puppeteer 的网页打印服务，用于打印或批量化打印网页为 PDF 文件。

## 功能特点

- 提供 RESTful API 接口，用于将网页转换为 PDF
- 支持自定义页面尺寸
- 支持批量打印任务
- 基于 Fastify 和 Puppeteer 实现，性能优异
- 提供 Docker 镜像，易于部署和使用

## 快速开始

### 使用 Docker

最简单的方式是使用已发布的 Docker 镜像：

```bash
docker run --name node-webpage-print -p 8047:8040 -d --restart=always ghcr.io/kne-union/node-webpage-print
```

这将启动一个名为 `node-webpage-print` 的容器，并将服务映射到本地的 8047 端口。

### 环境变量配置

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

### API 接口文档

本文档详细描述了 fastify-puppeteer 插件提供的所有 API 接口。

#### 接口概览

| 接口名称 | 请求方法 | 请求路径                   | 描述 |
|---------|---------|------------------------|------|
| parseHtmlToPdf | POST | /api/v1/parseHtmlToPdf | 将 HTML 内容转换为 PDF 文件 |
| parseHtmlToPdfBatch | POST | /api/v1/parseHtmlToPdfBatch | 批量将 HTML 内容转换为 PDF 文件（打包为 ZIP） |
| parseHtmlToPhoto | POST | /api/v1/parseHtmlToPhoto  | 将 HTML 内容转换为图片 |
| parseHtmlToPhotoBatch | POST | /api/v1/parseHtmlToPhotoBatch | 批量将 HTML 内容转换为图片（打包为 ZIP） |
| parseUrlToPdf | POST | /api/v1/parseUrlToPdf     | 将 URL 网页转换为 PDF 文件 |
| parseUrlToPdfBatch | POST | /api/v1/parseUrlToPdfBatch | 批量将 URL 网页转换为 PDF 文件（打包为 ZIP） |
| parseUrlToPhoto | POST | /api/v1/parseUrlToPhoto  | 将 URL 网页转换为图片 |
| parseUrlToPhotoBatch | POST | /api/v1/parseUrlToPhotoBatch | 批量将 URL 网页转换为图片（打包为 ZIP） |

#### 接口详情

##### HTML 转换接口

###### parseHtmlToPdf

| 项目 | 说明 |
|------|------|
| 接口描述 | 将 HTML 内容转换为 PDF 文件 |
| 请求方法 | POST |
| 请求路径 | /api/v1/parseHtmlToPdf |
| 认证方式 | 根据配置的 authenticate 函数 |
| 请求参数 | JSON 对象 |

**请求参数详情：**

| 参数名 | 类型 | 必填 | 描述 |
|-------|------|------|------|
| content | string | 是 | 需要转换的 HTML 内容 |
| options | object | 否 | PDF 生成选项，参考 Puppeteer API |

**响应结果：**
- 返回生成的 PDF 文件流

###### parseHtmlToPdfBatch

| 项目 | 说明 |
|------|------|
| 接口描述 | 批量将 HTML 内容转换为 PDF 文件（打包为 ZIP） |
| 请求方法 | POST |
| 请求路径 | /api/v1/parseHtmlToPdfBatch |
| 认证方式 | 根据配置的 authenticate 函数 |
| 请求参数 | JSON 对象 |

**请求参数详情：**

| 参数名 | 类型 | 必填 | 描述 |
|-------|------|------|------|
| contentList | array | 是 | 需要转换的 HTML 内容列表 |
| options | object | 否 | PDF 生成选项，参考 Puppeteer API |

**响应结果：**
- 返回包含所有生成 PDF 的 ZIP 文件流

###### parseHtmlToPhoto

| 项目 | 说明 |
|------|------|
| 接口描述 | 将 HTML 内容转换为图片 |
| 请求方法 | POST |
| 请求路径 | /api/v1/parseHtmlToPhoto |
| 认证方式 | 根据配置的 authenticate 函数 |
| 请求参数 | JSON 对象 |

**请求参数详情：**

| 参数名 | 类型 | 必填 | 描述 |
|-------|------|------|------|
| content | string | 是 | 需要转换的 HTML 内容 |
| options | object | 否 | 图片生成选项，参考 Puppeteer API |

**响应结果：**
- 返回生成的图片文件流

###### parseHtmlToPhotoBatch

| 项目 | 说明 |
|------|------|
| 接口描述 | 批量将 HTML 内容转换为图片（打包为 ZIP） |
| 请求方法 | POST |
| 请求路径 | /api/v1/parseHtmlToPhotoBatch |
| 认证方式 | 根据配置的 authenticate 函数 |
| 请求参数 | JSON 对象 |

**请求参数详情：**

| 参数名 | 类型 | 必填 | 描述 |
|-------|------|------|------|
| contentList | array | 是 | 需要转换的 HTML 内容列表 |
| options | object | 否 | 图片生成选项，参考 Puppeteer API |

**响应结果：**
- 返回包含所有生成图片的 ZIP 文件流

##### URL 转换接口

###### parseUrlToPdf

| 项目 | 说明 |
|------|------|
| 接口描述 | 将 URL 网页转换为 PDF 文件 |
| 请求方法 | POST |
| 请求路径 | /api/v1/parseUrlToPdf |
| 认证方式 | 根据配置的 authenticate 函数 |
| 请求参数 | JSON 对象 |

**请求参数详情：**

| 参数名 | 类型 | 必填 | 描述 |
|-------|------|------|------|
| url | string | 是 | 需要转换的网页 URL |
| options | object | 否 | PDF 生成选项，参考 Puppeteer API |

**响应结果：**
- 返回生成的 PDF 文件流

###### parseUrlToPdfBatch

| 项目 | 说明 |
|------|------|
| 接口描述 | 批量将 URL 网页转换为 PDF 文件（打包为 ZIP） |
| 请求方法 | POST |
| 请求路径 | /api/v1/parseUrlToPdfBatch |
| 认证方式 | 根据配置的 authenticate 函数 |
| 请求参数 | JSON 对象 |

**请求参数详情：**

| 参数名 | 类型 | 必填 | 描述 |
|-------|------|------|------|
| urlList | array | 是 | 需要转换的网页 URL 列表 |
| options | object | 否 | PDF 生成选项，参考 Puppeteer API |

**响应结果：**
- 返回包含所有生成 PDF 的 ZIP 文件流

###### parseUrlToPhoto

| 项目 | 说明 |
|------|------|
| 接口描述 | 将 URL 网页转换为图片 |
| 请求方法 | POST |
| 请求路径 | /api/v1/parseUrlToPhoto |
| 认证方式 | 根据配置的 authenticate 函数 |
| 请求参数 | JSON 对象 |

**请求参数详情：**

| 参数名 | 类型 | 必填 | 描述 |
|-------|------|------|------|
| url | string | 是 | 需要转换的网页 URL |
| selector | string | 否 | 页面元素选择器，指定截图区域 |
| options | object | 否 | 图片生成选项，参考 Puppeteer API |

**响应结果：**
- 返回生成的图片文件流

###### parseUrlToPhotoBatch

| 项目 | 说明 |
|------|------|
| 接口描述 | 批量将 URL 网页转换为图片（打包为 ZIP） |
| 请求方法 | POST |
| 请求路径 | /api/v1/parseUrlToPhotoBatch |
| 认证方式 | 根据配置的 authenticate 函数 |
| 请求参数 | JSON 对象 |

**请求参数详情：**

| 参数名 | 类型 | 必填 | 描述 |
|-------|------|------|------|
| urlList | array | 是 | 需要转换的网页 URL 列表 |
| selector | string | 否 | 页面元素选择器，指定截图区域 |
| options | object | 否 | 图片生成选项，参考 Puppeteer API |

**响应结果：**
- 返回包含所有生成图片的 ZIP 文件流

### 选项参数说明

#### PDF 生成选项

PDF 生成选项参考 Puppeteer 的 [page.pdf()](https://pptr.dev/api/puppeteer.page.pdf) 方法参数，常用选项包括：

| 选项名 | 类型 | 描述 |
|-------|------|------|
| format | string | 纸张格式，如 'A4', 'Letter' 等 |
| width | string | 纸张宽度，如 '8.5in' |
| height | string | 纸张高度，如 '11in' |
| margin | object | 页面边距，包含 top, right, bottom, left 属性 |
| printBackground | boolean | 是否打印背景图形 |
| landscape | boolean | 是否使用横向打印 |

#### 图片生成选项

图片生成选项参考 Puppeteer 的 [page.screenshot()](https://pptr.dev/api/puppeteer.page.screenshot) 方法参数，常用选项包括：

| 选项名 | 类型 | 描述 |
|-------|------|------|
| type | string | 图片格式，如 'png', 'jpeg' |
| quality | number | 图片质量 (0-100)，仅适用于 JPEG |
| fullPage | boolean | 是否捕获完整页面 |
| clip | object | 裁剪区域，包含 x, y, width, height 属性 |
| omitBackground | boolean | 是否隐藏默认白色背景 |


## 本地开发

1. 克隆仓库
2. 安装依赖：`npm install`
3. 启动服务：`node index.js`

## 构建 Docker 镜像

```bash
docker build -t node-webpage-print .
```

## 许可证

[MIT](LICENSE)
