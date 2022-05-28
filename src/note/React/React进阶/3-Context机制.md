`Context` 提供了一个无需为每层组件手动添加 `props` ，就能在组件树间进行数据传递的方法。

# Context 

`Context` 的设计目的是为了共享那些对于一个组件树而言是“全局”的数据。

下面代码中，为了在组件树中共享 theme 属性，需要显式地通过组件树逐层传递 `props` 来达到这个效果。

```jsx
class Parent extends React.Component {
    render() {
        return <Son theme="light"></Son>
    }
}

class Son extends React.Component {
    return() {
        return <GrandSon theme={this.props.theme}></GrandSon>
    }
}

class GrandSon extends React.Component {
    return() {
        return <button theme={this.props.theme}/>
    }
}
```

而使用 `context` ，可以避免通过中间元素传递 `props`。

我们在组件树的外部创建一个 `context` 并指定默认值：

```jsx
const themeContext = React.createContext('light')
```

随后在渲染组件树的根组件时，用你创建的 `context` 的  `Provider` 属性将数据传递下去，如果中途需要修改数据值，指定 `value` 属性即可。此时，中间组件就不再需要往下指明数据的传递。

而当我们需要使用这个数据的时候，可以通过下列方式来向上获取到最近的 `provider` 的 `value` 值：

```jsx
static themeContextType = themeContext
...
this.context
```

完整示例如下：

```jsx
const ThemeContext = React.createContext('light');
class Parent extends React.Component {
    render() {
        return (
            <ThemeContext.Provider value="dark">
                <Son/>
            </ThemeContext.Provider>
        );
    }
}
function Son() {
    return (
        <div>
            <GrandSon />
        </div>
    );
}
class GrandSon extends React.Component {
    static contextType = ThemeContext;
    render() {
        return <button theme={this.context} />;
    }
}
ReactDOM.render(<Parent/>, document.getElementById('test'))
```



# 使用 Context 之前的考虑

`Context` 主要应用场景在于很多不同层级的组件需要访问同样一些相同的数据。请谨慎使用，因为这会使得组件的复用性变差。

其中一种解决方案是将对应组件直接传递下去。但是这种做法也有局限性，此处不谈。

#  API 

##  React.createContext 

创建一个 `Context` 对象。

```jsx
const myContext  = React.createContext(defaultValue)
```

当 React 渲染一个订阅了这个 `Context` 对象的组件，这个组件会从该组件树中向上搜索到最近的那个匹配的 `Provider` 所渲染的 `context` 值。否则将会得到默认值 `defaultValue` 。

> 注意：若把 undefined 传递给 Provider 的 value ，不会生效。

##  Context.Provider 

每个 Context 对象都会返回一个 Provider 组件，它允许消费组件订阅 context 的变化。

Provider 接收一个 value 属性来传递给消费组件。传递方式见上。

当 Provider 的 value 值发送变化时，它内部的所有消费组件都会重新渲染。 Provider 及其内部 consumer 组件都不受制于 shouldComponentUpdate 函数，因此当 consumer 组件在其祖先组件退出更新的情况下也能更新。

