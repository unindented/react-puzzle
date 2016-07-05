import React, {Component, PropTypes} from 'react'
import autobind from 'core-decorators/lib/autobind'
import clamp from 'lodash/clamp'

import Wrapper from './wrapper'

export default class SlidingPuzzle extends Component {
  static propTypes = {
    rows: PropTypes.number,
    cols: PropTypes.number,
    hole: PropTypes.number,
    minWidth: PropTypes.number,
    minHeight: PropTypes.number,
    maxWidth: PropTypes.number,
    maxHeight: PropTypes.number,
    margin: PropTypes.number,
    color: PropTypes.string,
    src: PropTypes.string,
    onLoad: PropTypes.func,
    onMove: PropTypes.func,
    onSolve: PropTypes.func,
    onError: PropTypes.func
  }

  static defaultProps = {
    rows: 4,
    cols: 4,
    hole: Infinity,
    minWidth: 0,
    minHeight: 0,
    maxWidth: Infinity,
    maxHeight: Infinity,
    margin: 0,
    color: '#ccc',
    src: null
  }

  @autobind
  handlePuzzleRef (puzzle) {
    this._puzzle = puzzle
  }

  shuffle () {
    this._puzzle.shuffle()
  }

  render () {
    const {rows, cols, hole} = this.props
    const clampedRows = clamp(rows, 3, 9)
    const clampedCols = clamp(cols, 3, 9)
    const clampedHole = clamp(hole, 0, rows * cols - 1)

    return (
      <Wrapper {...this.props}
        rows={clampedRows}
        cols={clampedCols}
        hole={clampedHole}
        ref={this.handlePuzzleRef}
      />
    )
  }
}
