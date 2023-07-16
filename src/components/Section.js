export default class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._selector = containerSelector;
  }

  renderItems(items) {
    items.forEach(el => {
      this._renderer(el);
    });
  }

  addItem(item) {
    this._selector.prepend(item);
  }
}
