# `state`

## 在构造器中初始化`state`

```jsx
class Weather extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isHappy: true
        }
    }
    render() {
        const {isHappy} = this.state
        return <h2>I’m {isHappy ? 'happy' : 'sad'} today.</h2>
    }
}
// 渲染组件
ReactDOM.render(<Weather/>, document.getElementById('test'))
```

## `setState()`

状态`state`不可直接更改，应该使用内置`API`，`setState()`进行更新，且此更新属于合并性质，不是直接替换。

```jsx
class Weather extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isHappy: true
        }
        this.changeMood = this.changeMood.bind(this)
    }
    render() {
        const {isHappy} = this.state
        return <h2 onClick={this.changeMood}>I’m {isHappy ? 'happy' : 'sad'} today.</h2>
    }
    changeMood() {
        const {isHappy} = this.state
        this.setState({
            isHappy: !isHappy
        })
    }
}
ReactDOM.render(<Weather/>, document.getElementById('test'))
```

由于箭头函数`()=>{}`中的`this`是没有指向的，会自动指向箭头函数外层的`this`，故我们可以将上面的代码简化如下：

```jsx
class Weather extends React.Component {
    state = {
        isHappy: true
    }
    render() {
        const {isHappy} = this.state
        return <h2 onClick={this.changeMood}>I’m {isHappy ? 'happy' : 'sad'} today.</h2>
    }
    changeMood = () => {
        const {isHappy} = this.state
        this.setState({
            isHappy: !isHappy
        })
    }
}
ReactDOM.render(<Weather/>, document.getElementById('test'))
```

由于这种书写方式更加简洁明了，因此常用这一种书写方式。



# `props`

> 注意：`props`是只读的，不可修改

## 基本使用

在渲染组件时，`react`会自动把标签内的属性以对象的形式传到组件属性`props`中：

```jsx
class Info extends React.Component {
    render() {
        const {name, age, sex} = this.props
        return (
            <ul>
                <li>{name}</li>
                <li>{age}</li>
                <li>{sex}</li>
            </ul>
        )
    }
}
ReactDOM.render(<Info name="小红" age="18" sex="女"/>, document.getElementById('test1'))
ReactDOM.render(<Info name="小蓝" age="18" sex="男"/>, document.getElementById('test2'))
```

## 利用展开运算符简写

需要注意的是，展开运算符并不能直接展开对象的可遍历属性，此处可以如此书写是因为经过了`babel`与`react`编译后得到的语法糖：

```jsx
class Info extends React.Component {
    render() {
        const {name, age, sex} = this.props
        return (
            <ul>
                <li>{name}</li>
                <li>{age}</li>
                <li>{sex}</li>
            </ul>
        )
    }
}
let obj1 = {name: "小红", age: "18", sex: "女"}
let obj2 = {name: "小蓝", age: "18", sex: "男"}
ReactDOM.render(<Info {...obj1}/>, document.getElementById('test1'))
ReactDOM.render(<Info {...obj2}/>, document.getElementById('test2'))
```

## 对`props`属性进行限制

在对组件标签属性进行限制，首先需要引入`prop-types.js`包。

随后在组件属性`propTypes`与`defaultProps`中对各项属性进行限制

### 限制属性数据类型

```jsx
Demo.propTypes = {
    name: PropTypes.string
}
```

> 注意：当限制属性为某个数据类型时，必须要将该数据类型首字母小写，如上；而如果限制属性为函数，应该书写为`func`

### 限制属性必要性

```jsx
Demo.propTypes = {
    name: PropTypes.isRequired
}
```

### 限制属性初始值

```jsx
Demo.defaultProps = {
    name: '你没有名字'
}
```

### 简写方式

我们可以将`propTypes`与`defaultProps`属性放入组件类中定义，并且声明为`static`属性，这样就可以避免在组件类的外部单独进行限制。

## 构造器中的`props`

在`React`中，构造函数仅用于以下两种情况：

+ 通过给`this.state`赋值对象来初始化内部`state`
+ 为事件处理函数绑定实例。

在`React`组件挂载之前，会调用它的构造函数。在为`React.Component`子类实现构造函数时，应在其他语句之前调用`super(props)`。否则，`this.props`在构造函数中可能会出现未定义的`bug`。

构造器是否接受`props`，是否传递给`super`，取决于是否希望在构造器中通过`this`访问`props`

## 函数式组件中的`props`

函数中接受的参数`props`即为标签内部属性。

```jsx
function Demo(props) {
    console.log(props)
    return (
        <li>{props.name}</li>
        <li>{props.age}</li>
    )
}
```



# `refs`

组件内的标签可以定义`ref`属性来标识自己。

其中`ref`属性的值作为`key`，当前标签的所有信息作为`value`放入对象`refs`中。

## 字符串形式的`ref`

直接将`ref`属性设置为字符串即可，但是这种方式已经用得很少了。

```jsx
class Demo extends React.Component {
    render() {
        return (
            <div ref="div">Test</div>
        )
    }
}
ReactDOM.render(<Demo/>, document.getElementById('test'))
```

## 回调函数形式的`ref`

在回调函数中进行赋值

```jsx
class Demo extends React.Component {
    render() {
        return (
            <div ref={curNode => this.div = curNode}>Test</div>
        )
    }
}
ReactDOM.render(<Demo/>, document.getElementById('test'))
```

### 回调`refs`的说明

> 下面一段话直接摘自官方文档

如果 `ref` 回调函数是以内联函数的方式定义的，在更新过程中它会被执行两次，第一次传入参数 `null`，然后第二次会传入参数`DOM`元素。这是因为在每次渲染时会创建一个新的函数实例，所以`React`清空旧的`ref`并且设置新的。通过将`ref`的回调函数定义成`class`的绑定函数的方式可以避免上述问题，但是大多数情况下它是无关紧要的。

## `createRef`形式的`ref`

`createRef`调用后可以返回一个容器，该容器可以存储被`ref`所标识的节点，且生成的这个容器只能存储一个值。（如果需要存储多个，就生成多个这个值）
