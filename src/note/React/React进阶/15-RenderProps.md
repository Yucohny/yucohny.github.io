React 组件中有一个属性 render，接收一个函数作为参数。如果指定了 render 属性，那么就调用该函数，该函数将返回一个React 元素；并且不再实现该 React 组件原本的渲染逻辑。

React Router 就使用了 render prop 属性。
