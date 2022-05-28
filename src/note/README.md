## 欢迎来到「一名前端攻城师的个人修养」

[![GitHub watchers](https://img.shields.io/github/watchers/yucohny/yucohny.github.io)](https://github.com/yucohny/yucohny.github.io)[![GitHub stars](https://img.shields.io/github/stars/yucohny/yucohny.github.io)](https://github.com/Yucohny/yucohny.github.io)

本网站旨在不断学习过程中，完善前端入门相关的知识笔记，同时展现笔者自己的一些笔试与面试经历。

受到 [Mock](http://mockjs.com/) 描述的启发，命名为「前端攻城师」。

## 关于本网站

在学习过程中，自己一直有记录学习笔记。久之，笔记文件也有许多，再结合中学学习算法竞赛时写 [题解](https://yucohny.blog.csdn.net/) 的习惯，便萌生出将这些笔记展示在网页上的想法，因而有了现在你所看到的界面。

最初想要基于 Hexo 搭建，但是稍觉繁琐，许多配置以及主题样式更改又要再加学习。虽有学习之力，但无学习之心，故最终决定自己从零开始搭建这个网页。

搭建思路很简单，既然是基于 Github Pages 搭建，那自然就是一个简单的静态页面，将 React 静态项目打包后上传即可。

故直接使用 `create-react-app` 创建脚手架，然后基于 `React-Router v6` 配置路由，再使用 Ant Design 搭配组件，最后基于 `React-Markdown` 第三方库渲染 markdown 文件。

本项目尚且称之为一个 React 项目的实践，但是内容单薄，且又只是简单的静态页面，因此网站大体框架实际花费的开发时间约莫也就是一两天。不过后续在慢慢修改一些基本样式。

## Doing

+ 由于之前学习 Webpack 时笔记内容杂乱，且许多 plugin 与 loader 都已经更新，因此准备重新学习一遍 Webpack 的基础使用，并力求在新的笔记中加入自己更多的理解。
+ 优化笔记右侧链接。
+ 解决 LaTex 显示错误问题。

## 其他

+ 当前 React-Router 是 v6 之前版本的笔记，之后重新学习后将替换为 v6 向上笔记
+ 之前一个项目中需要学习 Dva，故学习得比较匆忙，没有怎么记笔记，之后会记录下来并上传笔记
+ 当初学习 Mock 后，一直想要录制相关的视频发到 b 站，但是始终觉得效果一般，就没有上传。后来想要分集录制的时候，又没有太多时间了，之后再看看时间吧。
+ 目前的代码块高亮仍然是使用三方库中内置风格，但是始终没有找到比较钟意的。之后有时间的话，自己写一份代码高亮吧。

## 暂存

+ 找时间写一下红黑树完整原理与代码实现
+ 解决图片引入错误问题
+ 复习媒体查询并补充笔记，添加移动端屏幕自适应
