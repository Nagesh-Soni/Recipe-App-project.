const search = document.querySelector(".search");
const recipe_container = document.querySelector(".recipe-container");
const RecipeDetails = document.querySelector(".recipe_details");
const RecipeDetailsContaint  = document.querySelector(".recipe_details_containt");
const RemoveBtn = document.querySelector(".cancel_btn")


const make_food = async (food) => {

    try {

        recipe_container.innerHTML = "<h2>Loading Recipes... 🍽️</h2>";

        const data = await fetch(
            `https://www.themealdb.com/api/json/v1/1/search.php?s=${food.slice(0,4)}`
        );

        const response = await data.json();

        if (!response.meals) {
            recipe_container.innerHTML = `
                <h2>No Recipe Found 😔</h2>
            `;
            return;
        }

        recipe_container.innerHTML = "";

        response.meals.forEach((meal) => {

            const Meal_div = document.createElement("div");

            Meal_div.classList.add("recipe_card");

            Meal_div.innerHTML = `
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}">

                <div class="recipe_content">
                    <h3>${meal.strMeal}</h3>

                    <p>🍽️ ${meal.strArea}</p>

                    <button class="view-btn">
                        View Recipe
                    </button>
                </div>
            `;
                const button = Meal_div.querySelector(".view-btn");
                button.addEventListener("click", () => {
                open_recipe(meal);  
            });

            recipe_container.appendChild(Meal_div);
        });

        recipe_container.scrollIntoView({
            behavior: "smooth"
        });

    } catch (error) {

        recipe_container.innerHTML = `
            <h2>Something went wrong 😔</h2>
        `;

        console.log(error);
    }
};


const open_recipe = (meal) => {

    let ingredients = "";

    for(let i = 1; i <= 20; i++){

        if(meal[`strIngredient${i}`]){

            ingredients += `
                <li>
                    ${meal[`strMeasure${i}`]}
                    ${meal[`strIngredient${i}`]}
                </li>
            `;
        }
    }

    RecipeDetailsContaint.innerHTML = `
        <h2>${meal.strMeal}</h2>

        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">

        <h3>Category : ${meal.strCategory}</h3>

        <h3>Ingredients</h3>

        <ul>
            ${ingredients}
        </ul>

        <h3>Instructions</h3>

        <p>
            ${meal.strInstructions}
        </p>
    `;

    RecipeDetails.style.display = "block";
};

RemoveBtn.addEventListener("click", () => {
    RecipeDetails.style.display = "none";
});



search.addEventListener("click", (e) => {

    e.preventDefault();

    const food_input =
        document.querySelector(".food").value.trim();

    if (food_input === "") {
        alert("Please enter a food name");
        return;
    }

    make_food(food_input);
}); 