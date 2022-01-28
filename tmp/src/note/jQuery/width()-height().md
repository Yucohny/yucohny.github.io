设置或者获取高度（不包括内边距、边框、外边距），直接使用`width()`和`height()`方法。

特殊的，想要获取网页的可视区宽高：

```js
$(window).width()
$(window).height()
```

如何获取包括内边距、外边距、边框的高度：

```js
innerWidth()/innerHeight() 返回包含内边距的宽度和高度
outerWidth()/outerHeight() 返回包含内边距和边框的宽度和高度
outerWidth(true)/outerHeight(true) 返回包含内边距外边距和边框的宽度和高度
```

