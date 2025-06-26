function getRecipes() {
  return JSON.parse(localStorage.getItem("recettes") || "[]");
}

function displayRecipes() {
  const list = document.getElementById("recipe-list");
  const recipes = getRecipes();

  list.innerHTML = "";

  recipes.forEach((r, i) => {
    const div = document.createElement("div");
    div.className = "recipe-card";
    div.onclick = () => window.location.href = `recette.html?id=${r.id}`;

    div.innerHTML = `
      <h2>${r.nom}</h2>
      <p>Note : ${r.note ?? "?"}/10</p>
      <p>Difficulté : ${r.difficulte ?? "?"}/10</p>
      <p>Temps : ${r.temps ?? "?"}</p>
      <p>Saison : ${r.saison ?? "?"}</p>
    `;
    list.appendChild(div);
  });
}

function createNewRecipe() {
  const recipes = getRecipes();
  const newId = Date.now();
  const nom = prompt("Nom de la recette ?");
  if (!nom) return;

  recipes.push({
    id: newId,
    nom,
    note: null,
    difficulte: null,
    temps: null,
    saison: null,
    ingredients: "",
    instructions: "",
    liens: []
  });

  localStorage.setItem("recettes", JSON.stringify(recipes));
  window.location.href = `recette.html?id=${newId}`;
}

document.getElementById("add-recipe-btn").addEventListener("click", createNewRecipe);

if (document.getElementById("recipe-list")) {
  displayRecipes();
}
