# 含义

async 函数本质上就是 Generator 函数的语法糖。在使用上，async 函数就是将 Generator 函数的星号 替换成 async，将 yield 替换成 await。

而 async 函数对 Generator 函数的改进体现在下面四点：

1. 内置执行器

   Generator 函数的执行必须依靠执行器，所以才有了 co 模块，而 async 函数自带执行器。

2. 更好的语义

3. 更广的适用性

   co 模块约定，yield 命令后面只能是 Thunk 函数或者 Promise 对象，而 async 函数的 await 表示紧跟在后面的表达式需要等待结果。

4. 返回值是 Promise

   async 函数的返回值是 Promise 对象，这比 Generator 函数的返回值是 Iterator 对象方便了许多。

# 用法

