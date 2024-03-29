import {$} from '@core/dom'
/* eslint-disable require-jsdoc */

export function resizeHandler($root, event) {
  const $resizer = $(event.target)
  const $parent = $resizer.closest('[data-type="resizable"]')
  const coords = $parent.getCoords()
  const type = $resizer.data.resize


  const cells = $root.findAll(`[data-col="${$parent.data.col}"]`)


  document.onmousemove = e => {
    if (type === 'col') {
      const delta = e.pageX - coords.right
      const value = coords.width + delta;
      $parent.css({width: value + 'px'})

      cells.forEach(el => el.style.width = value + 'px')
    } else {
      const delta = e.pageY - coords.bottom
      const value = coords.height + delta
      $parent.css({height: value + 'px'})
    }
  }

  document.onmouseup = () => {
    document.onmousemove = null
    document.onmouseup = null
  }
}
