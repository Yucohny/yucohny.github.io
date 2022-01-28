# 字符的 Unicode 表示法

将字符对应的码点用大括号括起来即可正确解读字符，而不用考虑原生的 JS 对码点位数的限制：

```js
console.log('\u{20BB7}', '\u{41}')
```

# codePointAt()

JS 内部字符以 UTF-16 的格式储存，每个字符固定为 2 个字节。对于那些需要 4 个字节储存的字符（即Unicode 码点大于 0xFFFF 的字符），JS会认为它是 2 个字符。

对于这类字符，JS 不能正确处理，比如字符长度会误判为 2，且 charAt 方法无法读取整个字符，charCodeAt 方法只能分别返回前 2 个字节和后 2 个字节的值。

针对这个问题，ES6 提供了 codePointAt 方法，用于返回一个字符的码点（十进制），若需要十六进制的表示结果，则转换即可：

```js
var s = '𠮷a'
s.codePointAt(0).toString(16) // "20bb7"
s.codePointAt(2).toString(16) // "61"
```

由上述代码可以看到，codePointAt 方法的参数是字符在字符串中的位置。但是可以注意到，参数的含义仍然是不正确的：上面的代码仍然将 '𠮷' 当作了 2 个长度的字符进行处理，而并不是应该的字符的序号。解决该问题的一个方法是使用 for ... of 循环，这个方式可以正确识别 32 位的 UTF-16 字符。

```js
var s = '𠮷a'
for (let ch of s) {
    console.log(ch.codePointAt(0).toString(16))
}
```

同时 codePointAt 方法可以很轻松测试一个字符是 2 个字节还是 4 个字节组成的最简单方法：

```js
function is32Bit(ch) {
    return c.codePointAt(0) > 0xFFFF
}
```

# String.fromCodePoint()

fromCodePoint 方法用于将码点转化为对应的字符，可以识别 32 位的 UTF-16 字符（弥补了 ES5 中 String.fromCharCode 方法的不足）。唯一要注意的是，如果有多个参数，则会将对应的字符连接为一个字符串进行返回。

# 字符串的遍历器接口

见 codePointAt() 的例子。

# at()

ES5 的 charAt 方法无法识别码点大于 0xFFFF 的字符，at 方法弥补了这个不足。

# normalize()

ES6 为字符串示例提供了 normalize 方法，用来将字符的不同表示方法统一为同样的形式，这称为 Unicode 的正规化。

normalize 方法可以接受一个参数来指定 normalize 的方式，如下：

+ NFC
  + 默认参数，表示“标准等价合成”（Normalization Form Canonical Composition），返回多个简单字符的合成字符。所谓的“标准等价”指的就是视觉和语义上的等价。
+ NFD
  + 表示“标准等价分解”（Normalization Form Canonical Decomposition），即在标准等价的前提下，返回合成字符分解出的多个简单字符。
+ NFKC
  + 表示“兼容等价合成”（Normalization Form Compatibility Composition），返回合成字符。所谓的“兼容等价”指的是语义上等价，但是视觉上不等价。
+ NFKD
  + 表示“兼容等价分解”（Normalization Form Compatibility Decomposition），即在兼容等价的前提下，返回合成字符分解出的多个简单字符。

唯一要注意的是，normalize 方法目前不能识别 3 个或 3 个以上字符的合成。这种情况下，仍然只能使用正则表达式，通过 Unicode 编号判断区间。

# includes()、startsWith()、endsWith()

ES6 提供了 3 种新方法来确定一个字符串是否包含在另一个字符串中：

+ includes()
  + 返回布尔值，表示是否找到了参数字符串
+ startsWith()
  + 返回布尔值，表示参数字符串是否在源字符串的头部。
+ endsWith()
  + 尾部

可以接受第二个参数表示开始搜索的位置：前两个方法表示从 n 开始搜索，最后一个方法表示搜索到 n 结束。

# repeat()

repeat 方法返回一个新字符串，表示将原字符串重复 n 次。

参数如果是小数，则会向下取整。

参数如果是 < -1.0 的参数或者 Infinity，则会报错。

参数如果是 >= -1.0 的负数，则等同于 0。

参数如果是 NaN，则等同于 0。

参数如果是字符串，则会先转化为数字。

