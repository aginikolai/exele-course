/* eslint-disable require-jsdoc */
import {ExcelComponent} from '@core/ExcelComponent'
import {createTable} from './tableTemplate'
import {resizeHandler} from './tableResize'
import {isCell, shouldResize, matrix} from './tableFunctions'
import {TableSelection} from './TableSelection'
import {$} from '@core/dom'
export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root) {
    super($root,
        {listeners: ['mousedown']}
    )
  }

  toHTML() {
    return createTable(20)
  }

  // onClick() {
  //   console.log('click')
  // }

  onMousedown(event) {
    if (shouldResize(event)) {
      resizeHandler(this.$root, event)
    } else if (isCell(event)) {
      const $target = $(event.target)
      if (event.shiftKey) {
        // const target = ($target.id(true))
        // const current = (this.selection.current.id(true))

        // const cols = range(current.col, target.col)
        // const rows = range(current.row, target.row)

        // const ids = cols.reduce((acc, col) => {
        //   rows.forEach((row) => acc.push(`${row}:${col}`))
        //   return acc
        // }, [])
        const $cells = matrix($target, this.selection.current)
            .map(id => this.$root.find(`[data-id="${id}"]`))
        this.selection.selectGroup($cells)
      } else {
        this.selection.select($target)
      }
    }
  }

  init() {
    super.init()
    this.selection = new TableSelection()
    const $cell = this.$root.find('[data-id="0:0"]')
    this.selection.select($cell)
  }

  // onMousemove() {
  //   console.log('move')
  // }

  // onMouseup() {
  //   console.log('up')
  // }
}

// function range(start, end) {
//   if (start > end) {
//     [end, start] = [start, end]
//   }
//   return new Array(end - start + 1)
//       .fill('')
//       .map((_, index) => start + index)
// }
