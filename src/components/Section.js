class Section {
  constructor({ renderer }, templateElement) {
        this._renderer = renderer;
        this._container = document.querySelector(templateElement);
    }

    renderItems(items) {
        items.forEach(item => {
            this._renderer(item);
        });
    }

    addItem(cardElement) {
        this._container.prepend(cardElement);
    }
}

export { Section };