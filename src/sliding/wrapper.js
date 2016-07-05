import React, {Component, PropTypes} from 'react'
import autobind from 'core-decorators/lib/autobind'
import clamp from 'lodash/clamp'
import range from 'lodash/range'

import Tiles from './tiles'
import {canSwapNumbers, swapNumbers, shuffleNumbers, isSolved} from './utils'
import styles from './styles.css'

export default class Wrapper extends Component {
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
    showNumbers: PropTypes.bool,
    showOriginal: PropTypes.bool,
    onLoad: PropTypes.func,
    onMove: PropTypes.func,
    onSolve: PropTypes.func,
    onError: PropTypes.func
  }

  constructor (props) {
    super(props)

    const {rows, cols} = this.props
    this.state = {numbers: range(0, rows * cols), solved: true}
  }

  @autobind
  handleImageRef (image) {
    this._image = image
  }

  @autobind
  handleImageLoad () {
    const {naturalWidth, naturalHeight} = this._image
    const {minWidth, minHeight, maxWidth, maxHeight, onLoad} = this.props
    const clampedWidth = clamp(naturalWidth, minWidth, maxWidth)
    const clampedHeight = clamp(naturalHeight, minHeight, maxHeight)
    const ratioWidth = clampedWidth / naturalWidth
    const ratioHeight = clampedHeight / naturalHeight
    const ratio = Math.min(ratioWidth, ratioHeight)
    const resizedWidth = Math.round(naturalWidth * ratio)
    const resizedHeight = Math.round(naturalHeight * ratio)

    this.setState({width: resizedWidth, height: resizedHeight})

    if (onLoad) {
      onLoad()
    }
  }

  @autobind
  handleTileClick (index) {
    this.swap(index)
  }

  swap (tileIndex) {
    const {rows, cols, hole, onMove, onSolve} = this.props
    const {numbers, solved} = this.state
    const holeIndex = numbers.indexOf(hole)

    if (solved) {
      return
    }

    if (canSwapNumbers(tileIndex, holeIndex, rows, cols)) {
      const newNumbers = swapNumbers(numbers, tileIndex, holeIndex)
      const newSolved = isSolved(newNumbers)
      this.setState({numbers: newNumbers, solved: newSolved})

      if (onMove) {
        onMove()
      }

      if (newSolved && onSolve) {
        onSolve()
      }
    }
  }

  shuffle () {
    const {rows, cols, hole} = this.props
    const {numbers} = this.state
    const shuffledNumbers = shuffleNumbers(numbers, rows, cols, hole)
    this.setState({numbers: shuffledNumbers, solved: false})
  }

  render () {
    const {numbers, width, height} = this.state
    const {rows, cols, hole, minWidth, minHeight, margin} = this.props
    const {src, color, showNumbers, showOriginal, onError} = this.props

    const finalWidth = Math.round((width || minWidth) / cols) * cols
    const finalHeight = Math.round((height || minHeight) / rows) * rows

    const sizeStyle = {
      width: finalWidth,
      height: finalHeight
    }

    return (
      <div className={styles.container} style={sizeStyle}>
        {(!src || (!!width && !!height)) && (
          <Tiles
            numbers={numbers}
            rows={rows}
            cols={cols}
            hole={hole}
            width={finalWidth}
            height={finalHeight}
            margin={margin}
            color={color}
            src={src}
            showNumbers={!!showNumbers}
            showOriginal={!!showOriginal}
            onClick={this.handleTileClick}
          />
        )}
        {!!src && (
          <img className={styles.hidden}
            src={src}
            ref={this.handleImageRef}
            onLoad={this.handleImageLoad}
            onError={onError}
          />
        )}
      </div>
    )
  }
}
