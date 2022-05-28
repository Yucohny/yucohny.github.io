# 用法

Profiler 能添加在 React 树中 的任何地方来测量渲染树中的这部分所需要的开销。

改组件接收两个属性：

+ id: string
+ onRender: callback()

> onRender 是当组件树种的组件「提交」更新时调用的回调函数。

举个例子，我们想要分析 Navigation 组件树：

```jsx
render(
  <App>
    <Profiler id="Navigation" onRender={callback}>      <Navigation {...props} />
    </Profiler>
    <Main {...props} />
  </App>
);
```

> 注意：
>
> 1. 多个 Profiler 组件能测量应用中的不同部分。
> 2. 可以嵌套使用 Profiler 进行检测。

# onRender 回调

该回调函数接收的参数描述了渲染的内容以及所花费的时间：

+ id：发生提交的树（或者说对应节点）的 id

> id 可用于分辨是树的哪一部分发生了「提交」。

+ phase：如果组件树该加载，则值为 mount；如果组件树重新渲染了，则值为 update。

> 判断是组件树的第一次装载引起的重渲染，还是由 props、state 或是 hooks 改变引起的重渲染。

+ actualDuration：本次更新花费的渲染时间

> 本次更新在渲染 Profiler 和它的子代上花费的时间。 这个数值表明使用 memoization 之后能表现得多好。理想情况下，由于子代只会因特定的 prop 改变而重渲染，因此这个值应该在第一次装载之后显著下降。

+ baseDuration：估计不使用 memoization 的情况下渲染整颗子树需要的时间

> 在 Profiler 树中最近一次每一个组件 render 的持续时间。 这个值估计了最差的渲染时间。（例如当它是第一次加载或者组件树没有使用 memoization）。

+ startTime：本次更新中 React 开始渲染的时间

> 本次更新中 React 开始渲染的时间戳。

+ commitTime：本次更新中 React committed 的时间

> 本次更新中 React commit 阶段结束的时间戳。 在一次 commit 中这个值在所有的 profiler 之间是共享的，可以将它们按需分组。

+ interactions：属于本次更新的 interactions 的集合

> 该参数为集合类型。当更新被制定时，interactions 的集合会被追踪（例如当 render 或者 setState 被调用时）。
>
> Interactions 能用来识别更新是由什么引起的。

