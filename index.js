const searchBox=document.querySelector('.searchBox')
const searchBtn=document.querySelector('.searchBtn')
const recipeContainer=document.querySelector('.recipe-container')
const recipeDetailsContent=document.querySelector('.recipe-details-content')
const recipeCloseBtn=document.querySelector('.recipe-close-btn');

const fetchRecipes=async (query)=>{
    recipeContainer.innerHTML="<h2>Fetching recipes......</h2>";
    try {
        const data=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
        const reponse=await data.json();
        recipeContainer.innerHTML="";
        reponse.meals.forEach(meals=>{
        const recepiDiv=document.createElement("div")
        recepiDiv.classList.add("recipe")
        recepiDiv.innerHTML=`
        <img src="${meals.strMealThumb}">
        <h3>${meals.strMeal}</h3>
        <p><span>${meals.strArea}</span> Dish</p>
        <p>Belongs to <span>${meals.strCategory}</span> Category</p>
        `
        const button=document.createElement("button");
        button.textContent="View Recipe";
        recepiDiv.appendChild(button);

        button.addEventListener("click",()=>{
            openRecipePopup(meals);
        })

        recipeContainer.appendChild(recepiDiv)
    })
        
    } 
    catch (error) {
        recipeContainer.innerHTML="<h2>Oops! Sorry Recipe is Not available</h2>";
    }    
}

const fetchIngredients=(meals)=>{
    let ingredientList="";
    for(let i=1;i<=20;i++){
        const ingredient=meals[`strIngredient${i}`]
        if(ingredient){
            const measure=meals[`strMeasure${i}`];
            ingredientList +=`<li>${measure} ${ingredient}</li>`
        }
        else{
            break;
        }
    }
    return ingredientList;
}

const openRecipePopup=(meals)=>{
    recipeDetailsContent.innerHTML=`
    <h2 class="recipeName">${meals.strMeal}</h2>
    <h3>Ingredents:</h3>
    <ul class="ingredientList">${fetchIngredients(meals)}</ul>
    <div class="recipeInstructions">
        <h3>Instructions:</h3>
        <p>${meals.strInstructions}</p>
    </div>
    `
    recipeDetailsContent.parentElement.style.display="block"
}

recipeCloseBtn.addEventListener("click",()=>{
    recipeDetailsContent.parentElement.style.display="none";
})

searchBtn.addEventListener("click",(event)=>{
    event.preventDefault()
    const serchInput=searchBox.value.trim()
    if(!serchInput){
        recipeContainer.innerHTML="<h2>Type the meal in the search box</h2>"
        return;
    }
    fetchRecipes(serchInput);
})

