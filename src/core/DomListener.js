export class DomListener {
  constructor($root) {
    if (!$root) {
      throw new Error('Error!!')
    }
    this.$root = $root
  }
}