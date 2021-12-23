const postcss = require('postcss')

const plugin = require('./')

async function run (input, output, opts = { }) {
  let result = await postcss([plugin(opts)]).process(input, { from: undefined })
  expect(result.css).toEqual(output)
  expect(result.warnings()).toHaveLength(0)
}

/* Write tests here */

it('adds -webkit-fill-available', async () => {
  run(
    '@media (max-width: 600px) { body { height: 100vh } }',
    '@media (max-width: 600px) { body { height: 100vh } ' +
      '@supports (-webkit-touch-callout: none) { ' +
      'body { height: -webkit-fill-available } } }'
  )
})


it('supports min-height', async () => {
    run(
    '.min { min-height: 100vh }',
    '.min { min-height: 100vh }\n' +
      '@supports (-webkit-touch-callout: none) {\n' +
      ' .min { min-height: -webkit-fill-available } }'
  )
})


it('supports max-height', () => {
  run(
    '.max { max-height: 100vh }',
    '.max { max-height: 100vh }\n' +
      '@supports (-webkit-touch-callout: none) {\n' +
      ' .max { max-height: -webkit-fill-available } }'
  )
})

it('ignores non-100vh height', () => {
  run('body { max-height: 100% }', 'body { max-height: 100% }')
})

it('ignores small 100vh height', () => {
  run('body { max-height: 80vh }', 'body { max-height: 80vh }')
})
