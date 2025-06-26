// Récupère les recettes depuis localStorage
function getRecipes() {
  return JSON.parse(localStorage.getItem("recettes") || "[]");
}

// Affiche les recettes
function displayRecipes() {
  const recipes = getRecipes();
  const container = document.getElementById("recipe-list");
  container.innerHTML = "";

  recipes.forEach((recipe, index) => {
    const div = document.createElement("div");
    div.innerHTML = `
      <h3>${recipe.nom}</h3>
      <p><strong>Ingrédients :</strong> ${recipe.ingredients}</p>
      <p><strong>Instructions :</strong> ${recipe.instructions}</p>
      <button onclick="deleteRecipe(${index})">🗑 Supprimer</button>
      <hr/>
    `;
    container.appendChild(div);
  });
}

function deleteRecipe(index) {
  const recipes = getRecipes();
  recipes.splice(index, 1);
  localStorage.setItem("recettes", JSON.stringify(recipes));
  displayRecipes();
}

// Pour index.html uniquement
if (document.getElementById("recipe-list")) {
  displayRecipes();
}
