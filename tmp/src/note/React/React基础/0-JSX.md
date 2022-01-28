`jsx`全称`JavaScript XML`。

# `XML`与`JSON`

`XML`早期用于存储和运输数据。

```xml
<student>
	<name>Tom</name>
	<age>19</age>
</studenmt>
```

`JSON`

```json
"{
	"name": "Tom",
	"age": 19
}"
```



# `jsx`语法规则

1.写虚拟`DOM`时，不要写引号。

2.标签中混入`JS`表达式时，要使用花括号`{}`。

3.样式的类名指定不要用`class`，要用`className`。

4.内联样式，要用`style={{key: value}}`的形式去写。

> 此处的第一个`{}`源于规则2，内部的`{}`表明这是一个括号。

5.虚拟`DOM`只能有一个根标签。

6.标签必须闭合。

7.标签首字母

+ 若小写字母开头，则将该标签转为`html`同名元素，若`html`中无该标签中的同名元素，则报错
+ 若大写字母开头，`react`就去渲染对应的组件，若组件没有报错，则报错。

