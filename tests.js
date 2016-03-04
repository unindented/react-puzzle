import jqueryMatchers from 'jasmine-jquery-matchers'

beforeEach(function () {
  jasmine.addMatchers(jqueryMatchers)
})

const testContext = require.context('./test', true, /.*\.js$/)
testContext.keys().forEach(testContext)
