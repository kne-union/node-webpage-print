### API 文档

#### 概述
Node Webpage Print 服务提供了一系列RESTful API接口，用于将HTML内容或URL转换为PDF或图片格式。所有API都使用POST方法，并接受JSON格式的请求体。

#### 通用参数

##### 页面设置参数
所有API都支持以下页面设置参数：

| 参数名 | 类型 | 必填 | 默认值 | 描述 |
|--------|------|------|--------|------|
| format | string | 否 | A4 | 页面格式，如 'A4', 'Letter', 'Legal' 等 |
| width | number/string | 否 | - | 页面宽度，如 '8.5in' 或 794 (像素) |
| height | number/string | 否 | - | 页面高度，如 '11in' 或 1123 (像素) |
| margin | object | 否 | - | 页面边距 |
| margin.top | number/string | 否 | 0 | 上边距，如 '1cm' 或 40 (像素) |
| margin.right | number/string | 否 | 0 | 右边距，如 '1cm' 或 40 (像素) |
| margin.bottom | number/string | 否 | 0 | 下边距，如 '1cm' 或 40 (像素) |
| margin.left | number/string | 否 | 0 | 左边距，如 '1cm' 或 40 (像素) |
| landscape | boolean | 否 | false | 是否使用横向布局 |
| scale | number | 否 | 1 | 页面缩放比例，范围 0.1 到 2 |

##### PDF 特有参数

| 参数名 | 类型 | 必填 | 默认值 | 描述 |
|--------|------|------|--------|------|
| printBackground | boolean | 否 | true | 是否打印背景图形 |
| displayHeaderFooter | boolean | 否 | false | 是否显示页眉和页脚 |
| headerTemplate | string | 否 | - | 页眉的HTML模板 |
| footerTemplate | string | 否 | - | 页脚的HTML模板 |
| preferCSSPageSize | boolean | 否 | false | 是否优先使用CSS定义的页面尺寸 |

##### 图片特有参数

| 参数名 | 类型 | 必填 | 默认值 | 描述 |
|--------|------|------|--------|------|
| type | string | 否 | png | 图片类型，支持 'png', 'jpeg', 'webp' |
| quality | number | 否 | 80 | 图片质量，仅适用于 jpeg 和 webp，范围 0-100 |
| fullPage | boolean | 否 | true | 是否捕获完整页面，false 则只捕获可视区域 |
| omitBackground | boolean | 否 | false | 是否省略背景 |
| clip | object | 否 | - | 裁剪区域 |
| clip.x | number | 是(如果使用clip) | - | 裁剪区域左上角的x坐标 |
| clip.y | number | 是(如果使用clip) | - | 裁剪区域左上角的y坐标 |
| clip.width | number | 是(如果使用clip) | - | 裁剪区域的宽度 |
| clip.height | number | 是(如果使用clip) | - | 裁剪区域的高度 |

#### API 端点

### HTML 转 PDF

```
POST /html-to-pdf
```

将HTML内容转换为PDF文档。

#### 请求参数

| 参数名 | 类型 | 必填 | 描述 |
|--------|------|------|------|
| content | string | 是 | 要转换的HTML内容 |
| options | object | 否 | 页面设置和PDF选项 |

#### 响应

成功时返回PDF文件的二进制数据，Content-Type为`application/pdf`。

#### 示例请求

```json
{
  "content": "<html><body><h1>Hello World</h1></body></html>",
  "options": {
    "format": "A4",
    "margin": {
      "top": "1cm",
      "right": "1cm",
      "bottom": "1cm",
      "left": "1cm"
    },
    "printBackground": true
  }
}
```

### URL 转 PDF

```
POST /url-to-pdf
```

将指定URL的网页转换为PDF文档。

#### 请求参数

| 参数名 | 类型 | 必填 | 描述 |
|--------|------|------|------|
| url | string | 是 | 要转换的网页URL |
| options | object | 否 | 页面设置和PDF选项 |
| waitUntil | string | 否 | 等待页面加载的事件，可选值: 'load', 'domcontentloaded', 'networkidle0', 'networkidle2' |
| timeout | number | 否 | 页面加载超时时间(毫秒) |

#### 响应

成功时返回PDF文件的二进制数据，Content-Type为`application/pdf`。

#### 示例请求

```json
{
  "url": "https://example.com",
  "options": {
    "format": "A4",
    "landscape": true
  },
  "waitUntil": "networkidle2",
  "timeout": 30000
}
```

### HTML 转图片

```
POST /html-to-image
```

将HTML内容转换为图片。

#### 请求参数

| 参数名 | 类型 | 必填 | 描述 |
|--------|------|------|------|
| content | string | 是 | 要转换的HTML内容 |
| options | object | 否 | 页面设置和图片选项 |

#### 响应

成功时返回图片的二进制数据，Content-Type根据选择的图片类型而定。

#### 示例请求

```json
{
  "content": "<html><body><h1>Hello World</h1></body></html>",
  "options": {
    "type": "jpeg",
    "quality": 90,
    "fullPage": true
  }
}
```

### URL 转图片

```
POST /url-to-image
```

将指定URL的网页转换为图片。

#### 请求参数

| 参数名 | 类型 | 必填 | 描述 |
|--------|------|------|------|
| url | string | 是 | 要转换的网页URL |
| options | object | 否 | 页面设置和图片选项 |
| waitUntil | string | 否 | 等待页面加载的事件，可选值: 'load', 'domcontentloaded', 'networkidle0', 'networkidle2' |
| timeout | number | 否 | 页面加载超时时间(毫秒) |

#### 响应

成功时返回图片的二进制数据，Content-Type根据选择的图片类型而定。

#### 示例请求

```json
{
  "url": "https://example.com",
  "options": {
    "type": "png",
    "fullPage": false,
    "clip": {
      "x": 0,
      "y": 0,
      "width": 1280,
      "height": 800
    }
  },
  "waitUntil": "networkidle2"
}
```

### 批量处理

```
POST /batch
```

批量处理多个转换任务。

#### 请求参数

| 参数名 | 类型 | 必填 | 描述 |
|--------|------|------|------|
| tasks | array | 是 | 任务数组 |

每个任务对象的格式如下：

| 参数名 | 类型 | 必填 | 描述 |
|--------|------|------|------|
| type | string | 是 | 任务类型，可选值: 'html-to-pdf', 'url-to-pdf', 'html-to-image', 'url-to-image' |
| params | object | 是 | 与单个API相同的参数对象 |

#### 响应

成功时返回一个包含所有任务结果的ZIP文件，Content-Type为`application/zip`。

#### 示例请求

```json
{
  "tasks": [
    {
      "type": "html-to-pdf",
      "params": {
        "content": "<html><body><h1>Document 1</h1></body></html>",
        "options": {
          "format": "A4"
        }
      }
    },
    {
      "type": "url-to-image",
      "params": {
        "url": "https://example.com",
        "options": {
          "type": "png",
          "fullPage": true
        }
      }
    }
  ]
}
```

### 错误处理

当API请求失败时，服务将返回适当的HTTP状态码和JSON格式的错误信息：

```json
{
  "statusCode": 400,
  "error": "Bad Request",
  "message": "错误详情"
}
```

常见的错误状态码：

| 状态码 | 描述 |
|--------|------|
| 400 | 请求参数无效 |
| 404 | 请求的资源不存在 |
| 408 | 请求超时 |
| 500 | 服务器内部错误 |
