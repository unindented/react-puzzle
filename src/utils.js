import clone from 'lodash/clone'
import shuffle from 'lodash/shuffle'
import without from 'lodash/without'

// Checks if the puzzle can be solved.
//
// Examples:
//   isSolvable([3, 7, 6, 0, 5, 1, 2, 4, 8], 3, 3) // => false
//   isSolvable([6, 4, 5, 0, 1, 2, 3, 7, 8], 3, 3) // => true
export function isSolvable (numbers, rows, cols) {
  let product = 1
  for (let i = 1, l = rows * cols - 1; i <= l; i++) {
    for (let j = i + 1, m = l + 1; j <= m; j++) {
      product *= (numbers[i - 1] - numbers[j - 1]) / (i - j)
    }
  }
  return Math.round(product) === 1
}

// Checks if the puzzle is solved.
//
// Examples:
//   isSolved([6, 4, 5, 0, 1, 2, 3, 7, 8]) // => false
//   isSolved([0, 1, 2, 3, 4, 5, 6, 7, 8]) // => true
export function isSolved (numbers) {
  for (let i = 0, l = numbers.length; i < l; i++) {
    if (numbers[i] !== i) {
      return false
    }
  }
  return true
}

// Get the row and column from a linear index.
export function getMatrixPosition (index, rows, cols) {
  return {
    row: Math.floor(index / cols),
    col: index % cols
  }
}

// Get the X and Y coordinates from a row and column.
export function getVisualPosition ({row, col}, width, height, margin) {
  return {
    x: (col * width) + margin,
    y: (row * height) + margin
  }
}

// Generates a shuffle that is solvable.
export function shuffleNumbers (numbers, rows, cols, hole) {
  do {
    numbers = shuffle(without(numbers, hole)).concat(hole)
  } while (isSolved(numbers) || !isSolvable(numbers, rows, cols))
  return numbers
}

// Checks if two indices can be swapped because they are adjacent.
export function canSwapNumbers (src, dest, rows, cols) {
  const {row: srcRow, col: srcCol} = getMatrixPosition(src, rows, cols)
  const {row: destRow, col: destCol} = getMatrixPosition(dest, rows, cols)
  return (Math.abs(srcRow - destRow) + Math.abs(srcCol - destCol) === 1)
}

// Swaps two indices.
export function swapNumbers (numbers, src, dest) {
  numbers = clone(numbers);
  [numbers[src], numbers[dest]] = [numbers[dest], numbers[src]]
  return numbers
}
