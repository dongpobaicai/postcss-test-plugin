/**
 * @type {import('postcss').PluginCreator}
 * 针对100vh  兼容Safari的处理
 * 
 */


/**
 * decl  当前类似{ xxx: yyy }的对象
 */

/*
'@media (max-width: 600px) { body { height: 100vh } }'
'@media (max-width: 600px) { 
  body { height: 100vh } 
  @supports (-webkit-touch-callout: none) {
    body { height: -webkit-fill-available }
  }
'

'.min { min-height: 100vh }'
'.min { min-height: 100vh }
 @supports (-webkit-touch-callout: none) {
   .min { min-height: -webkit-fill-available } }
 }
'
*/

function process(decl, { AtRule, Rule }) {
  // 样式值非100vh直接不处理
  if (decl.value !== '100vh') return
  console.log(decl)
  // 组装样式
  // 上层结构不变
  let rule = decl.parent

  // atRule  结构 @xxx {}
  let media = new AtRule({
    name: 'supports',
    params: '(-webkit-touch-callout: none)',
    source: decl.source
  })
  rule.after(media)

  // Rule  .xxx #xxx
  let clonedRule = new Rule({
    selector: rule.selector,
    source: rule.source
  })
  media.append(clonedRule)

  // Declaration
  clonedRule.append({
    prop: decl.prop,
    value: '-webkit-fill-available',
    source: decl.source
  })
}


module.exports = (opts = {}) => {
  // Work with options here
  return {
    // 插件的名称
    postcssPlugin: 'postcss-test-plugin',
    // 样式的处理
    Declaration: {
      // 指定某些样式名进行处理   min-height  max-height  height 会被处理
      'min-height': process,
      'max-height': process,
      'height': process
    },

    /*
    Declaration: {
      color: (decl, postcss) {
        // The fastest way find Declaration node if you know property name
      }
    }
    */
  }
}

module.exports.postcss = true
