import React, {Component, PropTypes} from 'react'
import autobind from 'core-decorators/lib/autobind'

import Tile from './tile'
import styles from './styles.css'

export default class Tiles extends Component {
  static propTypes = {
    numbers: PropTypes.arrayOf(PropTypes.number).isRequired,
    rows: PropTypes.number.isRequired,
    cols: PropTypes.number.isRequired,
    hole: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    margin: PropTypes.number.isRequired,
    color: PropTypes.string,
    src: PropTypes.string,
    showNumbers: PropTypes.bool,
    showOriginal: PropTypes.bool,
    onClick: PropTypes.func
  }

  @autobind
  handleTileClick (index) {
    const {onClick} = this.props

    if (onClick) {
      onClick(index)
    }
  }

  render () {
    const {numbers, width, height, src, showNumbers, showOriginal} = this.props

    const sizeStyle = {
      width,
      height
    }

    return (
      <div className={styles.container} style={sizeStyle}>
        <ul className={styles[showNumbers ? 'tilesWithNumbers' : 'tiles']} style={sizeStyle}>
          {numbers.map((number, index) => (
            <Tile {...this.props}
              key={number}
              number={number}
              index={index}
              onClick={this.handleTileClick}
            />
          ))}
        </ul>
        {!!src && (
          <img className={styles[showOriginal ? 'backgroundWithOriginal' : 'background']}
            style={sizeStyle}
            src={src}
          />
        )}
      </div>
    )
  }
}
