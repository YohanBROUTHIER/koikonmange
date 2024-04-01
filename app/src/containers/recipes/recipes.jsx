import { Link, useLoaderData } from "react-router-dom";

import { RecipeApi } from "../../services/api";
import store from "../../store";
import types from "../../store/types";

import { mappingUrlFunction } from "../../utils/httpQueries";

import style from "./recipes.module.css";

export default function Recipes() {
  const loaderData = useLoaderData();

  const { recipes, session } = loaderData;
  const { isAdmin, id } = session;

  return(
    <>
      <h2 className={style.title}>Recettes</h2>
      <ul className={style.cardList}>
        {recipes.length > 0 &&
            recipes.map((recipe) => 
              <RecipeCard key={recipe.id} recipe={recipe}isEditor={isAdmin || id === recipe.userId} />
            )
        }
      </ul>
    </>
  );
}

function RecipeCard({recipe, isEditor}) {
  return (
    <li>
      <Link to={`/recipes/${recipe.id}`}>
        <h3>{recipe.name}</h3>
        <ul className={style.ingredientList}>
          {recipe.ingredients.length > 0 && recipe.ingredients.map(ingredient =>
            <li key={ingredient.id}>{ingredient.name}</li>
          )}
        </ul>
      </Link>
    </li>
  );
}

export async function loader({request}){
  const url = new URL(request.url);
  const query = mappingUrlFunction(url);
  
  const recipes = await RecipeApi.getAll(query);
  store.dispatch({type:types.setRecipes, payload: recipes});

  const {session} = store.getState();
  
  return {recipes, session};
}