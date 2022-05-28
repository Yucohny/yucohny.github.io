# 用法

通常来讲，当从组件的 `render` 方法返回一个元素时，该元素将被挂载到离它最近的父节点中。

但是如果我们想要自定义插入元素位置时，就可以使用 `Portal`：

```jsx
ReactDOM.createPortal(child, container)
```

第一个参数 child 是任何 [可渲染的 React 子元素](https://react.docschina.org/docs/react-component.html#render)，例如一个元素，字符串，甚至是 `fragment`。

第二个参数 container 是一个 DOM 元素。

一个 `portal` 的典型用例是当父组件有 `overflow: hidden` 或 `z-index` 样式时，但你需要子组件能够在视觉上“跳出”其容器。

# 通过 Portal 进行事件冒泡

尽管我们可以将 `portal` 放置在 DOM 树中的任何地方，但在任何其他方面，其行为和普通的 React 子节点行为一致。由于 `portal` 仍存在于 React 树， 且与 DOM 树中的位置无关，那么无论其子节点是否是 `portal`，像 `context` 这样的功能特性都是不变的。

这包含事件冒泡。一个从 portal 内部触发的事件会一直冒泡至 React 树的祖先，即便这些元素并不是 DOM 树中的祖先。
