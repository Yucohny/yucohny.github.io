# Generator 基础

## 简介

### 基本概念

对于 Generator 函数有多种理解角度。从语法上，可以把它理解成一个状态机，封装了多个内部状态。

执行 Generator 函数会返回一个遍历器对象。也就是说，Generator 函数除了是状态机，还是一个遍历器对象生成函数。返回的遍历器对象可以一次遍历 Generator 函数内部的每一个状态。

形式上，Generator 函数是一个普通函数，但是有两个特征：一是 function 命令与函数名之间有一个 * 号，二是函数内部使用 yield 语句定义不同的内部状态。

ES6 没有规定 function 关键字与函数名之间的 * 号写在哪个位置，因此下面的写法都能通过。

```js
function * foo (x, y) {}
function *foo (x, y) {}
function* foo (x, y) {}
function*foo (x, y) {}
```

Generator 函数的调用方法与普通函数意义，不同的是，调用 Generator 函数后，该函数并不执行，返回的也不是 return 内容，而是一个指向内部状态的指针对象。

我们可以调用遍历器对象的 next 方法，使得指针移向下一个状态。每次移动后会返回一个对象，该对象有两个属性 value 和 done，value 表示当前的状态/值是什么，done 表示是否已经遍历结束。

如果在遍历至 return 语句后仍然执行 next 方法，会始终返回 {value: undefined, done: true} 对象。

### yield 表达式

由于只有调用 next 方法且内部指针指向该语句时才会执行 yield 语句后面的表达式，因此等于为 JS 提供了手动的惰性求值 Lazy Evaluation 的语法功能。

Generator 函数可以不使用 yield，这时就变成了一个单纯的暂缓执行函数。

另外需要注意，yield 表达式只能用在 Generator 函数里面，用在其他地方都会报错。

yield 表达式如果用在了另一个表达式当中，则必须放在原括号内部。而当 yield 表达式用作函数参数或者放在赋值表达式右边时，可以不加括号。

## next 方法的参数

yield 语句本身没有返回值，或者说总是返回 undefined。next 方法可以带有一个参数，该参数会被当作上一条 yield 语句的返回值。

这个功能有很重要的语法意义，Generator 函数从暂停状态到恢复运行，其上下文状态是不变的。通过 next 方法的参数就有办法在 Generator 函数开始运行后继续向函数体内部注入值。也就是说，可以在 Generator 函数运行的不同阶段从外部向内部注入不同的值，从而调整函数行为。

由于 next 方法的参数表示上一条 yield 语句的返回值，所以第一次使用 next 方法时传递参数是无效的。从语义上来讲，第一个 next 方法用来启动遍历器对象，所以本身不用带有参数。

## for...of 循环

for...of 循环可以自动遍历 Generator 函数生成的 Iterator 对象，且此时不再需要调用 next 方法。

一旦 next 方法的返回对象的 done 属性为 true，则 for...of 循环会终止，且不会返回当前状态。因此 return 语句的返回值不会包含在里面。

除了 for...of 循环，扩展运算符、解构赋值和 Array.from 方法内部调用的都是遍历器接口。这意味着，他们都可以将 Generator 函数返回的 Iterator 对象作为参数。

## Generator.prototype.throw()

略。

## Generator.prototype.return()

Generator 函数返回的遍历器对象具有一个 return 方法，可以返回给定值，并且终结 Generator 函数的遍历。

如果 return 方法调用时不提供参数，则返回值的 value 属性为 undefined。

如果 Generator 函数内部有 try...finally 代码块，那么 return 方法会推迟到 finally 代码块执行完再继续执行。

## yield* 表达式

如果在 Generator 函数内部调用另一个 Generator 函数，默认情况下是没有效果的。这时就需要使用 yield* 语句，用来在一个 Generator 函数里面执行另一个 Generator 函数。

从语法角度上看，如果 yield 命令后面跟的是一个遍历器对象，那么需要在 yield 命令后面加上星号，表明返回的是一个遍历器对象。

在没有 return 语句时，yield* 后面的 Generator 函数不过是 for...of 的一种简写邢师。

如果 yield* 后面跟着一个数组，由于数组原生支持遍历器，因此就会遍历数组成员。任何数据结构只要有 Iterator 接口，就可以使用 yield* 遍历。

## 作为对象属性的 Generator 函数



```js
let obj = {
    * myGeneratorMethod() {
        
    }
}
```

或者

```js
let obj = {
    myGeneratorMethod: function* () {
        
    }
}
```

## Generator 函数的 this

Generator 函数返回的是遍历器对象，而不是 this 对象。Generator 函数也不能跟着 new 命令一起使用，否则会报错。

如果想让 Generator 函数返回一个正常的对象实例，既可以使用 next 方法，又可以获得正常的 this，可以使用变通的方法：

首先生成一个空对象，使用 call 方法绑定 Generator 函数内部的 this。

## 含义

### Generator 与状态机

### Generator 与协程

## 应用

### 异步操作的同步化表达

### 控制流管理

### 部署 Iterator 接口

### 作为数据结构

# Generator 的异步应用

## 传统方法

+ 回调函数
+ 事件监听
+ 发布/订阅
+ Promise 对象

## 基本概念

### 异步

略

### 回调函数

略

### Promise

Promise 的写法只是回调函数的改进，使用 then 方法后，异步任务的执行变得更加清楚而已。

Promise 最大的问题是代码荣誉，原来的任务被 Promise 包装之后，无论是什么操作，都是许多 then 的堆积，原本的语义变得不清楚。

## Generator 函数

### 协程

传统的编程语言有一种叫做 携程 coroutine ，意思是多个线程互相协作，完成异步任务。

协程优点像函数，又有点像线程。它的运行流程大致如下。

1. 协程 A 开始执行
2. 协程 A 执行到一般，进入暂停状态，执行权转移到协程 B 中。
3. （一段时间后）协程 B 交换执行权。
4. 协程 A 恢复执行。

上面流程的协程 A 就是异步任务，因为它分成两段（或多端）执行。

举例来说，读取文件的协程写法如下：

```js
functio* asyncJob() {
    //...
    var f = yield readFile(fileA)
    //...
}
```

上面代码的函数 asyncJob 是一个协程，它的奥妙在于其中的 yield 命令。它表示执行到此处时，执行权将交给其他协程。也就是说，yield 命令是异步两个阶段的分界线。

协程遇到 yield 命令就暂停，等到执行权返回，再从暂停的地方继续往后执行。它的最大优点是，代码的写作非常像同步操作。

### 协程的 Generator 函数实现

Generator 函数是协程在 ES6 中的实现，最大的特点就是可以交出函数的执行权（即暂停执行）。

整个 Generator 函数就是一个封装的异步任务，或者说是异步任务的容器。异步操作需要暂停的地方都用 yield 语句注明。Generator 函数的执行方法如下：

```js
function* gen(x) {
    var y = yield x + 1
    return y
}

var g = gen(1)
g.next() // {value: 3, done: false}
g.next() // {value: undefined, done: true}
```

### Generator 函数的数据交换和错误处理

Generator 函数可以暂停执行和恢复执行，这是它能封装异步任务的根本原因。除此之外，还有两个特性使得它可以作为异步编程的完整解决方案：函数体内外的数据交换和错误处理机制。

数据交换：next 的返回值是向外传输的数据，而 next 接收的参数是向 Generator 函数体内部输入数据。

错误处理：Generator 函数内还可以部署错误处理代码，捕获函数体外抛出的错误。

### 异步任务的封装

略。

## Thunk 函数

Thunk 函数是自动执行 Generator 函数的一种方法。

