# 概述

## 节点

DOM 节点有七种类型：

+ Document：整个文档树的顶层节点。
+ DocumentType：doctype 标签。
+ Element：网页的各种 HTML 标签。
+ Attr：网页元素的属性。
+ Text：标签包含的文本。
+ Comment：注释。
+ DocumentFragment：文档的片段。

# DOMReady

HTML 标签与 DOM 节点：

HTML 是一种标记语言，展示页面有什么内容。但行为交互是需要通过 DOM 操作实现，要注意的是，两个尖括号的内容（标签）并不就是一个 DOM 节点。HTML 标签要通过浏览器**解析**才会变成 DOM 节点。

当我们向地址栏传入一个 URL，开始加载页面到我们看到内容，这期间就有一个 DOM 节点构建的过程。

节点们是以树的形式组织的， 当页面上所有 HTML 标签都转换为节点，这就叫做 DOM 树建完，也就是 DOMReady。

