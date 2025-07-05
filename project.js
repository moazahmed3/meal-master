async function getRecipes(meal) {
  var req = await fetch(
    "https://forkify-api.herokuapp.com/api/v2/recipes?search=" + meal
  );
  var finalReq = await req.json();
  console.log();
  displayRecipes(finalReq.data.recipes);
}
async function getRecipesId(rid) {
  var req = await fetch(
    "https://forkify-api.herokuapp.com/api/v2/recipes/" + rid
  );
  var finalReq = await req.json();
  console.log(finalReq.data.recipe);
  displayRecipe(finalReq.data.recipe);
}

var containerCards = document.querySelector("#containerCards");
var containerCardDetails = document.querySelector("#containerCardDetails");

function displayRecipe(recipe) {
  var ingredients = "";
  for (let i = 0; i < recipe.ingredients.length; i++) {
    var ingredient = recipe.ingredients[i];
    ingredients += ` <li class='rounded-pill bg-dark text-white p-3'> ${ingredient.quantity}   ${ingredient.unit}  ${ingredient.description}    </li>`;
  }
  var card = `
        <h1 class="text-warning text-capitalize text-center mb-5 ">card Details </h1>
       <div class='row text-dark g-3' >
     <div class="col-md-4">
          <div class="inner">
            <img
            class ="w-100"
              src="${recipe.image_url}"
              alt=""
              
            />
          </div>
        </div>
        <div class="col-md-8">
            <div class="inner">
                <ul class='list-unstyled d-flex flex-wrap gap-2'>
                   ${ingredients}
                </ul>
                <h3 class='text-capitalize mt-3' >publisher :<span class='text-secondary'>${recipe.publisher}</span> </h3>
                <h3 class='text-capitalize' >cooking time :  <span class='text-secondary'>${recipe.cooking_time}</span>:</h3>
                <h3 class='text-capitalize' >title:  <span class='text-secondary'>${recipe.title}</span></h3>

            </div>
        </div>

       </div>
    `;
  containerCards.classList.add("d-none");
  containerCardDetails.classList.remove("d-none");
  containerCardDetails.innerHTML = card;
  console.log(card);

  // containerCardDetails.add('d-block')
}
var lis = document.querySelectorAll("li");

for (let i = 0; i < lis.length; i++) {
  lis[i].addEventListener("click", function () {
    getRecipes(lis[i].innerHTML);
    containerCards.classList.remove("d-none");
    containerCardDetails.classList.add("d-none");
  });
}
getRecipes(lis[0].innerHTML);

function displayRecipes(recipes) {
  var cards = "";
  for (let i = 0; i < recipes.length; i++) {
    cards += `
             <div class="col-md-4">
                <div class="bg-dark p-3 text-white rounded-3 text-center">
                    <img class='w-100 img-fluid mb-4' style='aspect-ratio: 4/3;object-fit:cover' src="${recipes[i].image_url}" alt="">
                    <h3 >${recipes[i].publisher}</h3>
                    <p>${recipes[i].title}</p>
                    <button rid=${recipes[i].id} class="btn btn-success" >buy now</button>
                </div>
            </div>
        
        `;
  }
  document.querySelector(".row").innerHTML = cards;

  var btnsDetails = document.querySelectorAll("button");
  for (let i = 0; i < btnsDetails.length; i++) {
    btnsDetails[i].addEventListener("click", function (e) {
      var rid = btnsDetails[i].getAttribute("rid");
      getRecipesId(rid);
    });
  }
}
