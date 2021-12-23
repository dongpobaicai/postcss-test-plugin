# postcss-test-plugin

[PostCSS] plugin testdong.

[postcss]: https://github.com/postcss/postcss

```css
body {
  /* Footer will be hidden on iOS Safari because of bottom panel */
  height: 100vh;
}
```

```css
body {
  height: 100vh;
}

/* Avoid Chrome to see Safari hack */
@supports (-webkit-touch-callout: none) {
  body {
    /* The hack for Safari */
    height: -webkit-fill-available;
  }
}
```

## Usage

**Step 1:** Install plugin:

```sh
npm install --save-dev postcss postcss-test-plugin
```

**Step 2:** Check you project for existed PostCSS config: `postcss.config.js`
in the project root, `"postcss"` section in `package.json`
or `postcss` in bundle config.

If you do not use PostCSS, add it according to [official docs]
and set this plugin in settings.

**Step 3:** Add the plugin to plugins list:

```diff
module.exports = {
  plugins: [
+   require('postcss-test-plugin'),
    require('autoprefixer')
  ]
}
```

## 编写 postcss 的全过程

1. 使用 [postcss-plugin-boilerplate] 快速创建一个 postcss 项目，默认生成 postcss8 的项目

```js
npx postcss-plugin-boilerplate <directory>
```

2. 项目结构
   `index.js` 编写插件具体实现
   `index.test.js` 测试用例

3. css ast 结构

- AtRule @media 格式的 rule
- Rule css selector
- Declaration 样式 key: value 数据

4. postcss 插件的发布

```js
npx clean-publish
```

## 参考项目

-[postcss-100vh-fix] 兼容 Safari 上面的 100vh 的 postcss 插件

[official docs]: https://github.com/postcss/postcss#usage
[postcss-plugin-boilerplate]: https://github.com/postcss/postcss-plugin-boilerplate/
[postcss-100vh-fix]: https://github.com/postcss/postcss-100vh-fix
