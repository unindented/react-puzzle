import {findDOMNode} from 'react-dom'
import {renderIntoDocument} from 'react-addons-test-utils'

import Puzzle from '../src/puzzle'
import fixture from './image.svg'

describe('Puzzle', function () {
  beforeEach(function () {
    this.element = findDOMNode(renderIntoDocument(<Puzzle src={fixture} />))
  })

  it('renders', function () {
    expect(this.element).toHaveTag('div')
  })
})
