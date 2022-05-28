> 只是基本使用。

消息订阅-发布机制

+ 工具库：`PubSubJS`
+ 下载：`npm install pubsub-js --save`

# 使用

> 具体的使用场景会在下一小节中呈现，此处仅仅用于描述消息订阅对应的方法是如何使用的。

## 导入模块

```jsx
import PubSub from 'pubsub-js'
```



## 订阅消息

`subscribe`方法接受两个参数

+ 字符串，消息名称（完全自定义）
+ 回调函数，当第一个参数的消息被`publish`时执行

> 该回调函数必须接收两个参数`message`和`data`，`msg`参数即该回调函数触发时所对应的消息内容，`data`即订阅最后得到的消息内容。

该方法会返回一个`token`，用于指定特定的订阅。

> 此处要注意一个点——应该在何处进行订阅。
>
> 我们当然可以设置单独的事件来进行订阅消息，但是如果是一开始就需要订阅某个消息的情况，我们应该在生命周期钩子`componentDidMount`内订阅消息。

### 取消订阅

`unsubscribe`方法

+ 当参数为一个回调函数时，取消绑定该回调函数的所有订阅。
+ 当参数为一个字符串是时，取消绑定该消息的所有订阅。
+ 当参数为一个`token`时，取消该`token`对应的订阅。

`clearAllSubscriptions`方法，取消所有订阅。



## 发布消息

`publish`方法（异步发布消息），`publishSync`方法（同步发布消息）。

+ 第一个参数为字符串，信息名称。
+ 第二个参数即要发布的消息的数据。

# 兄弟组件之间传递数据

原本的兄弟组件之间是无法直接传递数据的，其中一个解决办法是将数据传递给父组件，父组件再传给另一个兄弟组件。

但是这个方法会造成代码的大量冗长，而使用`PubSubJS`工具库就可以让整个实现变得更加清晰。

假设当前需要在`Tom`组件中发布消息到`Jerry`组件中展示，利用`PubSub`模块可以更加轻松实现。

```jsx
import ...
export default class Tom extends React.Component {
    add = () => {
        const {value} = this.keyWordEle
        PubSub.publish('add', value)
    }
    render() {
        <input ref={c => this.keyWordEle = c} type='text'/>
        <button onClick={this.add}>Add</button>
    }
}
export default class Jerry extends React.Component {
    state = {
        list: []
    }
    componentDidMount() {
        PubSub.subscribe('add', (msg, data) => {
            const {list} = this.state
            list.push(data)
            this.setState({list: list})
        })
    }
    render() {
        const {list} = this.state
        return (
            list.map(value => {
                return <div>value</div>   
            })
        )
    }
}
```

> 实际上，`PubSub`模块不仅仅适用于兄弟组件数据传输，此处专门提出兄弟组件之间传输数据是为了避免上述的麻烦做法。

