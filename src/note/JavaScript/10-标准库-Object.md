# 概述

JS 的所有其他对象都继承自 `Object` 对象。

`Object` 对象的原生方法分为两类：`Object` 本身的方法与 `Object` 的实例方法。

1. `Object` 的静态方法

即直接定义在 `Object` 对象的方法：

```js
Object.print = function(x) {
    console.log(x)
}
```

2. `Object` 的实例方法

即定义在 `Object` 原型对象 `Object.prototype` 上的方法，它可以被 `Object` 实例直接使用。

```js
Object.prototype.print = function() {
    console.log(this)
}
```

# Object()

`Object` 本身是一个函数，可以当作工具方法使用，将任意值转为对象。这个方法常用于保证某个值一定是对象。

如果参数为空（或者为 `undefined` 和 `null`），`Object()` 返回一个空对象。

如果参数是原始类型的值，`Object` 方法将其转为对应的包装对象的实例。

如果 `Object` 方法的参数是一个对象，它总是返回该对象。

因此可以利用 `Object()` 来判断变量是否为对象：

```js
function isObject(x) {
    return x === Object(x)
}
```

# Object 构造函数

可以在 `Object()` 前使用 `new` 命令将其当作构造函数使用。

`Object` 构造函数的首要用途，是直接通过它来生成新对象。

> 通过 `new Object()` 生成的新对象，与字面量写法 `{}` 直接生成对象，是等价的。

`Object `构造函数的用法与 `Object` 方法很相似，几乎一模一样。但是 `Object(value)` 与 `new Object(value)` 两者的语义是不同的，`Object(value)` 表示将 `value` 转成一个对象，`new Object(value)` 则表示新生成一个对象，它的值是 `value`。

# Object 的静态方法

## Object.keys()

## Object.getOwnPropertyNames()

`Object.keys` 方法和 `Object.getOwnPropertyNames` 方法都用来遍历对象的属性。

`Object.keys` 方法和 `Object.getOwnPropertyNames` 方法的参数都是一个对象，并且返回一个数组。该数组的成员都是该对象自身的（而不是继承的）所有属性名。

对于一般的对象来说，`Object.keys()` 和 `Object.getOwnPropertyNames()` 返回的结果是一样的。只有涉及不可枚举属性时，才会有不一样的结果。`Object.keys` 方法只返回可枚举的属性，`Object.getOwnPropertyNames` 方法还返回不可枚举的属性名。

`for ... in ...` 也可以获取对象的属性，不过将会通过原型链不断迭代获取所有的属性，而 `Object.keys` 方法和 `Object.getOwnPropertyNames` 方法都只会获取当前对象自身的属性：

```js
const obj = {
    name: 'Yucohny',
    age: 19,
    home: 'CQ'
}

Object.prototype.demo = "test"

for (let o in obj) {
    console.log(o)
}

// name
// age
// home
// demo

console.log(Object.keys(obj))
// [ 'name', 'age', 'home' ]
console.log(Object.getOwnPropertyNames(obj))
// [ 'name', 'age', 'home' ]
```

## 其他方法

> 这里后续详细补充。

**（1）对象属性模型的相关方法**

- `Object.getOwnPropertyDescriptor()`：获取某个属性的描述对象。
- `Object.defineProperty()`：通过描述对象，定义某个属性。
- `Object.defineProperties()`：通过描述对象，定义多个属性。

**（2）控制对象状态的方法**

- `Object.preventExtensions()`：防止对象扩展。
- `Object.isExtensible()`：判断对象是否可扩展。
- `Object.seal()`：禁止对象配置。
- `Object.isSealed()`：判断一个对象是否可配置。
- `Object.freeze()`：冻结一个对象。
- `Object.isFrozen()`：判断一个对象是否被冻结。

**（3）原型链相关方法**

- `Object.create()`：该方法可以指定原型对象和属性，返回一个新的对象。
- `Object.getPrototypeOf()`：获取对象的`Prototype`对象。

# Object 的实例方法

## Object.prototype.valueOf()

`valueOf` 方法的作用是返回一个对象的“值”，默认情况下返回对象本身。

`valueOf` 方法的主要用途是，JavaScript 自动类型转换时会默认调用这个方法。

```js
var obj = new Object();
1 + obj // "1[object Object]"
```

因此，如果自定义 `valueOf` 方法，就可以得到一些其他的结果。

```js
var obj = new Object();
obj.valueOf = function () {
  return 2;
};

1 + obj // 3
```

## Object.prototype.toString()

`toString ` 方法的作用是返回一个对象的类型字符串。

对一个普通对象调用 `toString` 方法，会返回字符串 `[object Object]`，该字符串说明对象的类型。

因此通过自定义 `toString` 方法，可以让对象在自动类型转换时，得到想要的字符串形式。

```js
var obj = new Object();

obj.toString = function () {
  return 'hello';
};

obj + ' ' + 'world' // "hello world"
```

不过要注意的是，数组、字符串、函数、Date 对象都分别部署了自定义的 `toString` 方法，覆盖了 `Object.prototype.toString` 方法。

### toString() 的应用：判断数据类型

`Object.prototype.toString` 方法返回对象的类型字符串，因此可以用来判断一个值的类型。

```js
var obj = {};
obj.toString() // "[object Object]"
```

上面第二个 `Object` 表示该值的构造函数。这是一个十分有用的判断数据类型的方法。

由于实例对象可能会自定义 `toString` 方法，覆盖掉 `Object.prototype.toString` 方法，所以为了得到类型字符串，可以直接使用 `Object.prototype.toString` 方法。然后再通过函数的 `call` 方法，实现在任意值上调用来帮助我们判断这个值的类型：

```
Object.prototype.toString.call(value)
```

不同数据类型的 `Object.prototype.toString` 方法返回值如下。

- 数值：返回 `[object Number]`。
- 字符串：返回 `[object String]`。
- 布尔值：返回 `[object Boolean]`。
- undefined：返回 `[object Undefined]`。
- null：返回 `[object Null]`。
- 数组：返回 `[object Array]`。
- arguments 对象：返回 `[object Arguments]`。
- 函数：返回 `[object Function]`。
- Error 对象：返回 `[object Error]`。
- Date 对象：返回 `[object Date]`。
- RegExp 对象：返回 `[object RegExp]`。
- 其他对象：返回 `[object Object]`。

利用这个特性，可以写出一个比 `typeof` 运算符更准确的类型判断函数。

```js
var type = function (o){
  var s = Object.prototype.toString.call(o);
  return s.match(/\[object (.*?)\]/)[1].toLowerCase();
};
```

## Object.prototype.toLocaleString()

`Object.prototype.toLocaleString `方法与 `toString` 的返回结果相同，也是返回一个值的字符串形式。

```js
var obj = {};
obj.toString(obj) // "[object Object]"
obj.toLocaleString(obj) // "[object Object]"
```

这个方法的主要作用是留出一个接口，让各种不同的对象实现自己版本的 `toLocaleString`，用来返回针对某些地域的特定的值。

目前，主要有三个对象自定义了 `toLocaleString` 方法。

- `Array.prototype.toLocaleString()`
- `Number.prototype.toLocaleString()`
- `Date.prototype.toLocaleString()`

## Object.prototype.hasOwnProperty()

`Object.prototype.hasOwnProperty `方法接受一个字符串作为参数，返回一个布尔值，表示该实例 **对象自身** 是否具有该属性。

```js
var obj = {
  p: 123
};

obj.hasOwnProperty('p') // true
obj.hasOwnProperty('toString') // false
```

## 其他方法

之后来补一下……
