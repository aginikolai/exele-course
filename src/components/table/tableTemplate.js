/* eslint-disable require-jsdoc */
const CODES = {
  A: 65,
  Z: 90
}

function createRow(index, content) {
  const resize = index ? '<div class="row-resize" data-resize="row"></div>' : ''
  return `
    <div class="row" data-type="resizable">
      <div class="row-info">
        ${index ? index : ''}
        ${resize}
      </div>
      <div class="row-data">${content}</div>
    </div>
  `
}

function createCol(col, index) {
  return `
    <div class="column" data-type="resizable" data-col=${index}>
      ${col}
      <div class="col-resize" data-resize="col"></div>
    </div>
  `
}

// function createCell(row, col) {
//   return `
//     <div class="cell" contenteditable data-col=${col} data-row=${row}></div>
//   `
// }

function toCell(row) {
  return function(_, col) {
    return `
      <div 
      class="cell" 
      contenteditable 
      data-col=${col} 
      data-row=${row} 
      data-type="cell"
      data-id="${row}:${col}"
      ></div>
   `
  }
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index)
}

export function createTable(rowsCount = 15) {
  const colsCount = CODES.Z - CODES.A + 1;

  const cols = new Array(colsCount).fill('').map(toChar).map(createCol).join('')


  const rows = []
  rows.push(createRow(null, cols))

  for (let i = 0; i < rowsCount; i++) {
    const cells = new Array(colsCount)
        .fill('')
        // .map((_, col) => createCell(i, col))
        .map(toCell(i))
        .join('')
    rows.push(createRow(i + 1, cells))
  }

  return rows.join('')
}
