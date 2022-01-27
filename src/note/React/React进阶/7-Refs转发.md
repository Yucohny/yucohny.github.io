Ref 转发是一项将 ref 自动地通过组件传递到其一子组件的技巧。对于大多数应用的组件来说，这通常不是必须的。但是其对于某些组件，尤其是可重用的组件库是很有用的。

# 转发 refs 到 DOM 组件

考虑下面这个渲染原生 DOM button 的 FancyButton 组件：

```jsx
function FancyButton(props) {
    return (
    	<button className="FancyButton">
        	{props.children}
		</button>
    )
}
```

其他调用这个封装好的 FancyButton 组件通常不需要获取内部的 DOM 元素 button 的 ref。这可以防止组件过度依赖其他组件的 DOM 结构。

这样的封装对于应用级组件是理想的，但是对于 FancyButton 这样的高可复用“叶”组件来说可能是不方便的。因为这些组件倾向于在整个应用中以一种类似常规 DOM button 和 input 的方式被使用，并且访问其 DOM 节点队管理焦点，选中或动画来说是不可避免的。

# Ref 转发是一个可选特性，其允许某些组件接收 ref，并将其向下传递给子组件

在下面的示例中，FancyButton 使用 React.forwardRef 来获取传递给它的 ref，然后转发到它渲染的 DOM button：

```jsx
const FancyButton = React.forwardRef((props, ref) => {
    <button ref={ref} className="FanctButton">
        {props.children}
    </button>
})
```

```jsx
const ref = React.createRef()
<FancyButton ref={ref}>Click me!</FancyButton>
```

这样，使用 FancyButton 的组件可以获取底层 DOM button 的 ref，并在必要时访问，就像其直接使用 DOM button 一样。

以下是对上述发生情况的逐步解释：

1. 我们通过调用 React.forwardRef 创建了一个 React ref 并将其赋值给 ref 变量。
2. 我么通过指定 ref 为 JSX 属性，并将其向下传递给 <FancyButton ref={ref}>

3. React 传递 ref 给 forwardRef 内函数 (props, ref) => ...，作为其第二个参数。
4. 我们向下转发该 ref 参数到 <button ref={ref}>，将其指定为 JSX 属性。
5. 当 ref 挂载完成，ref.current 将指向 <button> DOM 节点。

> 注意：
>
> 1. ref 参数只在 React.forwardRef 定义组件时存在，常规函数和 class 组件不接受 ref 参数，且 props 属性中也不存在。
> 2. Ref 转发不局限于 DOM 组件，也可以转发到 class 组件。

# 在高阶组件中转发 refs

这个技巧对高阶组件特别有用，看看下面这个例子：

```jsx
function logProps(WrappedComponent) {
  class LogProps extends React.Component {
    componentDidUpdate(prevProps) {
      console.log('old props:', prevProps);
      console.log('new props:', this.props);
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  return LogProps;
}
```

我们发现，logProps 将所有的 props 直接传递到（透传）其包裹的组件 LogProps 中，所以渲染结果和直接渲染 LogProps 是相同的。如：

```jsx
class FancyButton extends React.Component {
  focus() {
    // ...
  }

  // ...
}

// 我们导出 LogProps，而不是 FancyButton。
// 虽然它也会渲染一个 FancyButton。
export default logProps(FancyButton);
```

> 要注意的是，refs 将不会被透传下去，这是因为 ref 被 React 做了特殊处理。
>
> 如果直接指定 ref 属性，那么 ref 将引用最外层的容器组件，而不是被包裹的组件。

但是现在可以使用 React.forwardRef 方法将 ref 传入内部组件：

```jsx
function logProps(Component) {
  class LogProps extends React.Component {
    componentDidUpdate(prevProps) {
      console.log('old props:', prevProps);
      console.log('new props:', this.props);
    }

    render() {
      const {forwardedRef, ...rest} = this.props;
      // 将自定义的 prop 属性 “forwardedRef” 定义为 ref
      return <Component ref={forwardedRef} {...rest} />;    }
  }

  // 注意 React.forwardRef 回调的第二个参数 “ref”。
  // 我们可以将其作为常规 prop 属性传递给 LogProps，例如 “forwardedRef”
  // 然后它就可以被挂载到被 LogProps 包裹的子组件上。
  return React.forwardRef((props, ref) => {    return <LogProps {...props} forwardedRef={ref} />;  });}
```

# 在 DevTools 中显示自定义名称

React.forwardRef 接受一个渲染函数。React DevTools 使用该函数来决定为 ref 转发组件显示的内容。

例如，以下组件将在 DevTools 中显示为 “*ForwardRef*”：



```jsx
const WrappedComponent = React.forwardRef((props, ref) => {
  return <LogProps {...props} forwardedRef={ref} />;
});
```



如果你命名了渲染函数，DevTools 也将包含其名称（例如 “*ForwardRef(myFunction)*”）：



```jsx
const WrappedComponent = React.forwardRef(
  function myFunction(props, ref) {
    return <LogProps {...props} forwardedRef={ref} />;
  }
);
```



你甚至可以设置函数的 displayName 属性来包含被包裹组件的名称：



```jsx
function logProps(Component) {
  class LogProps extends React.Component {
    // ...
  }

  function forwardRef(props, ref) {
    return <LogProps {...props} forwardedRef={ref} />;
  }

  // 在 DevTools 中为该组件提供一个更有用的显示名。
  // 例如 “ForwardRef(logProps(MyComponent))”
  const name = Component.displayName || Component.name;  forwardRef.displayName = `logProps(${name})`;
  return React.forwardRef(forwardRef);
}
```
