import icons from "url:../../img/icons.svg";

export default class View {
  _data;

  /**
   * Render the received object to the DOM
   * @param {Object | Object[]} data The data to be rendered (e.g. recipe)
   * @param {boolean} [render = true] If false, create markup string instead of rendering to the DOM
   * @returns {undefined | string} A markup string is returned if render = false
   * @this {Object} View instance
   * @author Ken Atopos
   * @todo Finish the implementation
   */
  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    const markup = this._generateMarkup();

    if (!render) return markup;

    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();

    const newDOM = document.createRange().createContextualFragment(newMarkup); // it will create a new dom node object based on the string pass, namely newMarkup in this case;
    const newElements = Array.from(newDOM.querySelectorAll("*"));
    const currentElements = Array.from(
      this._parentElement.querySelectorAll("*")
    );

    newElements.forEach((newEle, i) => {
      const curEle = currentElements[i];

      // update changed text
      if (
        !newEle.isEqualNode(curEle) &&
        newEle.firstChild?.nodeValue.trim() !== ""
      ) {
        curEle.textContent = newEle.textContent;
      }

      // update changed attributes
      if (!newEle.isEqualNode(curEle)) {
        Array.from(newEle.attributes).forEach((attribute) =>
          curEle.setAttribute(attribute.name, attribute.value)
        );
      }
    });
  }

  _clear() {
    this._parentElement.innerHTML = "";
  }

  renderSpinner() {
    const spinner = `
    <div class="spinner">
      <svg>
        <use href="${icons}#icon-loader"></use>
      </svg>
    </div>
  `;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", spinner);
  }

  renderError(message = this._errorMessage) {
    const errorPrompt = `
      <div class="error">
        <div>
          <svg>
            <use href="${icons}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", errorPrompt);
  }

  renderMessage(message = this._message) {
    const errorPrompt = `
      <div class="message">
        <div>
          <svg>
            <use href="${icons}#icon-smile"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", errorPrompt);
  }
}
