/* eslint-disable require-jsdoc */
import {DomListener} from '@core/DomListener'

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name || ''
    this.prepare()
    this.emitter = options.emitter
    this.unsubscribers = []
  }
  prepare() {

  }
  // Возвращает шаблон компонента
  toHTML() {
    return ''
  }

  $emit(event, ...args) {
    this.emitter.emit(event, ...args)
  }

  $on(event, fn) {
    const unsub = this.emitter.subscribe(event, fn)
    this.unsubscribers.push(unsub)
  }

  init() {
    this.initDOMListener()
  }
  destroy() {
    this.removeDOMListener()
    this.unsubscribers.forEach(unsub => unsub())
  }
}
