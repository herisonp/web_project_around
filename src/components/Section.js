export default class Section {
  constructor({ items, renderer, inserMethod }, containerSelector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
    this._inserMethod = inserMethod ?? "append";
  }

  renderItems() {
    //  renderizar cada elemento
    this._renderedItems.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(element) {
    // pega um elemento DOM e adiciona ao contêiner
    switch (this._inserMethod) {
      case "prepend":
        this._container.prepend(element);
        break;

      default:
        this._container.append(element);
        break;
    }
  }
}
