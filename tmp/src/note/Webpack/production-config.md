> 各种配置的整合

当一个文件要被多个 loader 处理时，那么一定要指定 loader 执行的先后顺序。比如此处，需要先执行 eslint，再执行 babel。

我们只需要在先执行的 loader 中加入属性 enforce: 'pre' 即可。

# package.json（新增）

```json
{
  "browserslist": {
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ],
    "production": [
      ">0.001%",
      "not dead",
      "not op_mini all"
    ]
  },
  "eslintConfig": {
    "extends": "airbnb-base"
  }
}
```

# postcss.config.js

```js
module.exports = {
    //css兼容性配置
    plugins: [
        require('postcss-preset-env')()
    ]
}
```

# webpack.config.js

```js
const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')

const path = require("path");

// process.env.NODE_ENV = 'development'

//复用loader
const commonCssLoader = [
    MiniCssExtractPlugin.loader,
    'css-loader',
    {
        //兼容性配置
        //还需要在package.json中定义browserlist
        loader: 'postcss-loader',
    },
]

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'js/built.js',
        path: resolve(__dirname, 'build')
    },
    module: {
        rules: [
            {
                //检查ESLint
                //在package.json中指定airbub规则
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'eslint-loader',
                options: {
                    fix: true
                },
                enforce: 'pre'
            },
            {
                //JS兼容
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: [
                        '@babel/preset-env',
                        {
                            useBuiltIns: 'usage',
                            corejs: {
                                version: 3
                            },
                            targets: {
                                chrome: '60',
                                firefox: '60',
                                ie: '9',
                                safari: '10',
                                edge: '17'
                            }
                        }
                    ]
                }
            },
            {
                //css配置
                test: /\.css$/,
                use: [...commonCssLoader]
            },
            {
                //less配置
                test: /\.less$/,
                use: [...commonCssLoader, 'less-loader']
            },
            {
                //处理css中的图片资源
                test: /\.(jpg|png|gif)$/,
                loader: 'url-loader',
                options: {
                    limit: 8 * 1024,
                    name: '[hash: 10].[ext]',
                    esModule: false
                }
            },
            {
                //处理html中的图片资源
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                //处理其他资源
                exclude: /\.(html|js|css|less|jpg|png|gif)$/,
                loader: "file-loader",
                options: {
                    name: '[hash: 10].[ext]'
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            minify: {
                collapseWhitespace: true,
                removeComments: true
            }
        }),
        new MiniCssExtractPlugin({
            //将css资源提取为单独文件
            filename: 'css/built.css'
        }),
        new OptimizeCssAssetsWebpackPlugin()//压缩css资源
    ],
    mode: 'production'
}
```