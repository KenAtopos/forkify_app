import View from "./View.js";
import previewView from "./previewView.js";

class BookmarkView extends View {
  _parentElement = document.querySelector(".bookmarks__list");
  _errorMessage = "No bookmark yet, find a good recipe and bookmark it.";
  _message;

  _generateMarkup() {
    return this._data
      .map((bookmark) => previewView.render(bookmark, false))
      .join("");
  }
}

export default new BookmarkView();
