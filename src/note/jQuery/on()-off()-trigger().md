# `on`注册事件

+ 注册简单事件

  + 绑定事件，由自己触发，不支持动态绑定。

  + ```js
    $(selector).on('click', function() {})
    ```

+ 注册事件委托

  + 绑定代理事件，必须是它内部的`span`元素才能触发这个事件，支持动态绑定

  + ```js
    $(selector).on('click', 'span', function() {})
    ```

  + 如果内部多个元素都可以触发这个事件，那就引号内逗号隔开。



# `off`解绑事件

解绑匹配元素的所有事件

```js
$(selector).off();
```

解绑匹配元素的所有`click`事件

```js
$(selector).off('click');
```



# `trigger`触发事件

`trigger('click')`函数用于触发当前元素的`click`事件，支持自定义事件。