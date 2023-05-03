import * as module from "./model.js";
import recipeView from "./views/recipeView.js";

import "core-js/stable"; // add support to the old browser, by transferring ES6 features to the old syntax
import "regenerator-runtime/runtime"; // add the support for the async/await, polyfilling

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    recipeView.renderSpinner();

    // 1) loading recipe
    await module.loadRecipe(id);

    // 2) rendering recipe
    recipeView.render(module.state.recipe);
  } catch (err) {
    console.error(err);
  }
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
};

init();
