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

function getRecipeById(id) {
  return getRecipes().find(r => r.id == id);
}

function saveRecipe(updatedRecipe) {
  const recipes = getRecipes().map(r => r.id == updatedRecipe.id ? updatedRecipe : r);
  localStorage.setItem("recettes", JSON.stringify(recipes));
}

function loadRecipePage() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  if (!id) return;

  const recipe = getRecipeById(id);
  if (!recipe) {
    alert("Recette introuvable");
    return window.location = "index.html";
  }

  document.getElementById("recipe-title").textContent = recipe.nom;

  // Remplir les champs
  document.getElementById("liens").value = recipe.liens?.join(", ") || "";
  document.getElementById("temps").value = recipe.temps || "";
  document.getElementById("saison").value = recipe.saison || "";
  document.getElementById("ingredients").value = recipe.ingredients || "";
  document.getElementById("instructions").value = recipe.instructions || "";

  // étoiles
  const starsContainer = document.getElementById("stars");
  starsContainer.innerHTML = "";
  for (let i = 1; i <= 5; i++) {
    const star = document.createElement("span");
    star.innerHTML = "★";
    star.className = (recipe.difficulte >= i) ? "selected" : "";
    star.addEventListener("click", () => {
      recipe.difficulte = i;
      saveRecipe(recipe);
      loadRecipePage(); // reload pour mettre à jour l’affichage
    });
    starsContainer.appendChild(star);
  }
  
    // Note sur 10
  const noteContainer = document.getElementById("note-container");
  noteContainer.innerHTML = "";
  for (let i = 1; i <= 10; i++) {
    const noteBtn = document.createElement("span");
    noteBtn.textContent = i;
    noteBtn.className = (recipe.note == i) ? "selected" : "";
    noteBtn.addEventListener("click", () => {
      recipe.note = i;
      saveRecipe(recipe);
      loadRecipePage(); // recharge pour afficher
    });
    noteContainer.appendChild(noteBtn);
  }


  // Sauvegarde live à la saisie
  document.getElementById("liens").oninput = (e) => {
    recipe.liens = e.target.value.split(",").map(l => l.trim());
    saveRecipe(recipe);
  };
  document.getElementById("temps").oninput = (e) => {
    recipe.temps = e.target.value;
    saveRecipe(recipe);
  };
  document.getElementById("saison").onchange = (e) => {
    recipe.saison = e.target.value;
    saveRecipe(recipe);
  };
  document.getElementById("ingredients").oninput = (e) => {
    recipe.ingredients = e.target.value;
    saveRecipe(recipe);
  };
  document.getElementById("instructions").oninput = (e) => {
    recipe.instructions = e.target.value;
    saveRecipe(recipe);
  };
}

if (window.location.pathname.includes("recette.html")) {
  loadRecipePage();

  const deleteBtn = document.getElementById("delete-btn");
  deleteBtn.onclick = () => {
    if (confirm("Supprimer cette recette ?")) {
      const updated = getRecipes().filter(r => r.id != recipe.id);
      localStorage.setItem("recettes", JSON.stringify(updated));
      window.location = "index.html";
    }
  };

}
