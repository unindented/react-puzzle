import {findDOMNode} from 'react-dom'
import {renderIntoDocument} from 'react-addons-test-utils'

import SlidingPuzzle from '../src/sliding/'
import fixture from './image.svg'

describe('SlidingPuzzle', function () {
  beforeEach(function () {
    this.element = findDOMNode(renderIntoDocument(<SlidingPuzzle src={fixture} />))
  })

  it('renders', function () {
    expect(this.element).toHaveTag('div')
  })
})
