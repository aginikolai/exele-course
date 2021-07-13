/* eslint-disable require-jsdoc */
import {capitalize} from '@core/utils';

export class DomListener {
  constructor($root, listenres = []) {
    if (!$root) {
      throw new Error(`No $root provided for DomListener!`)
    }
    this.$root = $root
    this.listeners = listenres
  }
  initDOMListener() {
    this.listeners.forEach(listener => {
      const method = getMethodName(listener);
      if (!this[method]) {
        const name = this.name || '';
        throw new Error(`Method not found in ${name}`)
      }
      this.$root.on(listener, this[method].bind(this))
    })
  }
  removeDOMListener() {
    this.listeners.forEach(listener => {
      const method = getMethodName(listener)
      this.$root.off(listener, this[method])
    })
  }
}

function getMethodName(eventName) {
  return 'on' + capitalize(eventName)
}
