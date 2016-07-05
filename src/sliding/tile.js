import React, {Component, PropTypes} from 'react'
import {Motion, spring} from 'react-motion'
import autobind from 'core-decorators/lib/autobind'
import {getMatrixPosition, getVisualPosition} from './utils'

import styles from './styles.css'

export default class Tile extends Component {
  static propTypes = {
    index: PropTypes.number.isRequired,
    number: PropTypes.number.isRequired,
    rows: PropTypes.number.isRequired,
    cols: PropTypes.number.isRequired,
    hole: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    margin: PropTypes.number.isRequired,
    color: PropTypes.string,
    src: PropTypes.string,
    onClick: PropTypes.func.isRequired
  }

  @autobind
  handleClick () {
    const {index, onClick} = this.props
    onClick(index)
  }

  render () {
    const {index, number, rows, cols, hole, width, height, margin, color, src} = this.props
    const tileWidth = Math.round(width / cols)
    const tileHeight = Math.round(height / rows)
    const numberMatrixPos = getMatrixPosition(number, rows, cols)
    const numberVisualPos = getVisualPosition(numberMatrixPos, tileWidth, tileHeight, margin)
    const indexMatrixPos = getMatrixPosition(index, rows, cols)
    const indexVisualPos = getVisualPosition(indexMatrixPos, tileWidth, tileHeight, margin)

    const motionStyle = {
      translateX: spring(indexVisualPos.x),
      translateY: spring(indexVisualPos.y)
    }
    const sizeStyle = {
      width: tileWidth - (margin * 2),
      height: tileHeight - (margin * 2),
      fontSize: Math.min(tileWidth, tileHeight) / 4,
      padding: Math.min(tileWidth, tileHeight) / 8,
      backgroundColor: color,
      backgroundImage: !!src && `url(${src})`,
      backgroundSize: !!src && `${width}px ${height}px`,
      backgroundPosition: !!src && `${-numberVisualPos.x}px ${-numberVisualPos.y}px`
    }

    return (
      <Motion style={motionStyle}>
        {({translateX, translateY}) => (
          <li className={styles[number === hole ? 'tileWithHole' : 'tile']}
            style={{...sizeStyle, transform: `translate3d(${translateX}px, ${translateY}px, 0)`}}
            onClick={this.handleClick}
          >
            {number + 1}
          </li>
        )}
      </Motion>
    )
  }
}
