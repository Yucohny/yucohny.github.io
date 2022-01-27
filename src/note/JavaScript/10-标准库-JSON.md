# JSON 格式

JSON：JavaScript Object Notation 是一种用于数据交换的文本格式，目的是取代繁琐笨重的 XML 格式。

相比于 XML 格式，JSON 格式有两个显著有点：

+ 书写简单，一目了然
+ 符合 JS 原生语法，可以有解释引擎直接处理，不用另外添加解析代码。

每个 JSON 对象就是一个值，可能是一个数组或对象，也可能是一个原始类型的值。总之，只能是一个值，不能是两个或者多个值。

JSON 中值的类型和格式有下列规定：

1. 复合类型的值只能是数组或对象，不能是函数、正则表达式对象、日期对象。
2. 原始类型的值只有四种：字符串、数值（必须以十进制表示）、布尔值和 null（不能使用 NaN, Infinity, -Infinity 和 undefined）。
3. 字符串必须使用双引号表示，不能使用单引号。
4. 对象的键名必须放在双引号里面。
5. 数组或对象最后一个成员的后面，不能加逗号。

# JSON 对象

JSON 对象是 JavaScript 的原生对象，用来处理 JSON 格式数据。

有下面两个静态方法：

+ JSON.stringify()
+ JSON.parse()

# JSON.stringify()

## 基本用法

JSON.stringify() 方法用于将一个值转为 JSON 字符串。该字符串符合 JSON 格式，并且可以被 JSON.parse() 方法还原。

要注意的是，对于原始类型的字符串，转化结果会带双引号：

```js
JSON.stringify('foo') === "\"foo\""// true
```

这是因为在将来还原的时候，内层双引号可以让 JS 引擎知道，这是一个字符串，而不是其他类型的值。

其他方面：

+ 如果对象的属性值是 undefined，函数或者 XML 对象，该属性会被 JSON.stringify() 过滤。

+ 如果数组的成员是上述三者，则这些值会被转化为 null。

+ 如果是正则对象会被转化为空对象。
+ 如果对象的属性是不可遍历 enumerable: false，则忽略。

## 第二个参数

该方法接收第二个参数，该参数可以为一个数组，指定了参数对象的哪些属性需要转成字符串。

```js
var obj = {
  'prop1': 'value1',
  'prop2': 'value2',
  'prop3': 'value3'
};

var selectedProperties = ['prop1', 'prop2'];

JSON.stringify(obj, selectedProperties)
// "{"prop1":"value1","prop2":"value2"}"
```

这个参数只对对象的属性有效，对数组无效。

第二个参数也可以是一个函数，用来更改 JSON.stringify() 的返回值。

该函数接收两个参数 key，value，分别表示被转换对象的键名和键值。

要注意的是函数的处理顺序：首先将整个对象作为值传入进去，然后递归处理返回值，当返回值不为对象的时候停止递归，继续处理下面的属性值。参考下面代码和输出进行理解：

```js
var obj = {a: {b: 1, c: 3}, d: {e: 3}};

function f(key, value) {
  console.log("["+ key +"]:" + value);
  return value;
}

JSON.stringify(obj, f)
// []:[object Object]
// [a]:[object Object]
// [b]:1
// [c]:3
// [d]:[object Object]
// [e]:3
```

```js
var obj = {a: 1};

function f(key, value) {
  if (typeof value === 'object') {
    return {b: 2};
  }
  return value * 2;
}

JSON.stringify(obj, f)
// "{"b": 4}"
```

另外要注意的是，如果该返回值为 undefined 或者没有返回值，则该属性会被忽略。

## 第三个参数

该方法还接收第三个参数，用于增加返回的 JSON 字符串的可读性。

默认返回的字符串是单行字符串，但是对于大型的 JSON 对象，这样的返回值可读性非常差。第三个参数使得每个属性单独占据一行，并且将每个属性前面添加不超过 10 个字符的前缀。

如果第三个参数是制表符 \t，则制表符形式显示结果；

如果第三个参数是数字，则表示每个属性前面添加若干个空格。

## 参数对象的 toJSON() 方法

如果参数对象有自定义的 toJSON() 方法，那么 JSON.stringify() 会使用这个方法的返回值作为参数，而忽略原对象的其他属性。

```js
var user = {
  firstName: '三',
  lastName: '张',

  toJSON: function () {
    return {
      name: this.lastName + this.firstName
    };
  }
};

JSON.stringify(user)
// "{"name":"张三"}"
```

toJSON() 方法的一个应用是，将正则对象自动转为字符串。因为 JSON.stringify() 默认不能转换正则对象，但是设置了 toJSON() 方法以后，就可以转换正则对象了。

```js
var obj = {
  reg: /foo/
};

// 不设置 toJSON 方法时
JSON.stringify(obj) // "{"reg":{}}"

// 设置 toJSON 方法时
RegExp.prototype.toJSON = RegExp.prototype.toString;
JSON.stringify(/foo/) // ""/foo/""
```

# JSON.parse()

JSON.parse() 方法用于将 JSON 字符串转换成对应的值。

如果传入的字符串不是有效的 JSON 格式，JSON.parse() 方法将报错。

如：

```js
JSON.parse("'String'") // illegal single quotes
// SyntaxError: Unexpected token ILLEGAL
```

上面代码中，双引号字符串中是一个单引号字符串，因为单引号字符串不符合 JSON 格式，所以报错。

为了处理解析错误，可以将 JSON.parse() 方法放在 try...catch 代码块中。

JSON.parse() 方法可以接收一个函数作为第二个参数，用法与上面类似。
