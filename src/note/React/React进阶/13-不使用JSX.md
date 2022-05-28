# 不使用 JSX

React 补充强制要求使用 JSX。当不想在构建环境中配置有关 JSX 编译时，不使用 JSX 会更加方便。

事实上，每个 JSX 元素知识调用 React.createElemengt(...) 的语法糖。因此，使用 JSX 可以完成的任何事情都可以用原生 JS 完成。

# createElement()

```jsx
React.createElement(
	componentName,
    [props],
    [...children]
)
```

该方法创建并返回指定的 React 元素。

如果 componentName 是小写字母开头，则渲染原本的 HTML 标签；

如果 componentName 是大写字母开头，则是渲染自定义的 React 组件；

componentName 也可以是 React.fragment。
