#### 接口概览

| 接口名称 | 请求方法 | 请求路径 | 描述 |
|---------|---------|---------|------|
| parseHtmlToPdf | POST | /parseHtmlToPdf | 将 HTML 内容转换为 PDF 文件 |
| parseHtmlToPdfBatch | POST | /parseHtmlToPdfBatch | 批量将 HTML 内容转换为 PDF 文件（打包为 ZIP） |
| parseHtmlToPhoto | POST | /parseHtmlToPhoto | 将 HTML 内容转换为图片 |
| parseHtmlToPhotoBatch | POST | /parseHtmlToPhotoBatch | 批量将 HTML 内容转换为图片（打包为 ZIP） |
| parseUrlToPdf | POST | /parseUrlToPdf | 将 URL 网页转换为 PDF 文件 |
| parseUrlToPdfBatch | POST | /parseUrlToPdfBatch | 批量将 URL 网页转换为 PDF 文件（打包为 ZIP） |
| parseUrlToPhoto | POST | /parseUrlToPhoto | 将 URL 网页转换为图片 |
| parseUrlToPhotoBatch | POST | /parseUrlToPhotoBatch | 批量将 URL 网页转换为图片（打包为 ZIP） |

#### 接口详情

##### HTML 转换接口

###### parseHtmlToPdf

| 项目 | 说明 |
|------|------|
| 接口描述 | 将 HTML 内容转换为 PDF 文件 |
| 请求方法 | POST |
| 请求路径 | /parseHtmlToPdf |
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
| 请求路径 | /parseHtmlToPdfBatch |
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
| 请求路径 | /parseHtmlToPhoto |
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
| 请求路径 | /parseHtmlToPhotoBatch |
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
| 请求路径 | /parseUrlToPdf |
| 认证方式 | 根据配置的 authenticate 函数 |
| 请求参数 | JSON 对象 |

**请求参数详情：**

| 参数名 | 类型 | 必填 | 描述 |
|-------|------|------|------|
| url | string | 是 | 需要转换的网页 URL |
| options | object | 否 | PDF 生成选项，参考 Puppeteer API 和 URL 转换特有选项 |

**响应结果：**
- 返回生成的 PDF 文件流

###### parseUrlToPdfBatch

| 项目 | 说明 |
|------|------|
| 接口描述 | 批量将 URL 网页转换为 PDF 文件（打包为 ZIP） |
| 请求方法 | POST |
| 请求路径 | /parseUrlToPdfBatch |
| 认证方式 | 根据配置的 authenticate 函数 |
| 请求参数 | JSON 对象 |

**请求参数详情：**

| 参数名 | 类型 | 必填 | 描述 |
|-------|------|------|------|
| urlList | array | 是 | 需要转换的网页 URL 列表 |
| options | object | 否 | PDF 生成选项，参考 Puppeteer API 和 URL 转换特有选项 |

**响应结果：**
- 返回包含所有生成 PDF 的 ZIP 文件流

###### parseUrlToPhoto

| 项目 | 说明 |
|------|------|
| 接口描述 | 将 URL 网页转换为图片 |
| 请求方法 | POST |
| 请求路径 | /parseUrlToPhoto |
| 认证方式 | 根据配置的 authenticate 函数 |
| 请求参数 | JSON 对象 |

**请求参数详情：**

| 参数名 | 类型 | 必填 | 描述 |
|-------|------|------|------|
| url | string | 是 | 需要转换的网页 URL |
| selector | string | 否 | 页面元素选择器，指定截图区域。如果提供，将只截取该元素区域 |
| options | object | 否 | 图片生成选项，参考 Puppeteer API 和 URL 转换特有选项 |

**响应结果：**
- 返回生成的图片文件流

###### parseUrlToPhotoBatch

| 项目 | 说明 |
|------|------|
| 接口描述 | 批量将 URL 网页转换为图片（打包为 ZIP） |
| 请求方法 | POST |
| 请求路径 | /parseUrlToPhotoBatch |
| 认证方式 | 根据配置的 authenticate 函数 |
| 请求参数 | JSON 对象 |

**请求参数详情：**

| 参数名 | 类型 | 必填 | 描述 |
|-------|------|------|------|
| urlList | array | 是 | 需要转换的网页 URL 列表 |
| selector | string | 否 | 页面元素选择器，指定截图区域。如果提供，将只截取该元素区域 |
| options | object | 否 | 图片生成选项，参考 Puppeteer API 和 URL 转换特有选项 |

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

#### URL 转换特有选项

以下选项适用于 parseUrlToPdf、parseUrlToPdfBatch、parseUrlToPhoto 和 parseUrlToPhotoBatch 接口：

| 选项名 | 类型 | 描述 |
|-------|------|------|
| waitForSelectors | array | 等待页面中特定元素出现的选择器数组，在继续处理前会等待这些元素加载完成 |
| waitForVisible | boolean | 是否等待元素可见，默认为 false，仅检查元素是否存在于 DOM 中 |
| waitForMaxTime | number | 等待元素出现的最大时间（毫秒），默认为 10000（10秒） |
