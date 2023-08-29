class Section {
  constructor({ renderer }, templateElement) {
        this._renderer = renderer;
        this._templateContainer = document.querySelector(templateElement);
    }

    renderItems(items) {
        items.forEach(item => {
            this._renderer(item);
        });
    }

    addItem(cardElement) {
        this._templateContainer.prepend(cardElement);
    }
}

export { Section };