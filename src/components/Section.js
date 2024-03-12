export default class Section {
  constructor({ items, renderer, insertMethod }, containerSelector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
    this._insertMethod = insertMethod ?? "append";
  }

  renderItems() {
    this._renderedItems.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(element) {
    switch (this._insertMethod) {
      case "prepend":
        this._container.prepend(element);
        break;

      default:
        this._container.append(element);
        break;
    }
  }
}
