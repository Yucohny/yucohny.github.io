有一类属性比如`checked`，写在元素身上表示选中，没有写表示没有选中。

原生`js`通过给该属性设置`true`或者`false`表示是否选中。

而`jQuery`中通过用`attr()`方法始终都返回`undefined`，是因为在后续的`jQuery`中，`checked`这一类`Boolean`属性需要用`prop`方法来操作。

`prop`使用方法与`attr`类似。