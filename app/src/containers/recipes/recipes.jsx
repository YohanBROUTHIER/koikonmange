import { Link, useLoaderData, useNavigate, useSubmit } from "react-router-dom";

import { RecipeApi } from "../../services/api";
import store from "../../store";
import types from "../../store/types";

import { mappingUrlFunction } from "../../utils/httpQueries";

import style from "./recipes.module.css";
import { iconesPath } from "../../utils";

export default function Recipes() {
  const loaderData = useLoaderData();
  const navigate = useNavigate();

  const { recipes, session, page } = loaderData;
  const { isAdmin, id } = session;

  function addRecipe() {
    navigate("/recipes/new");
  }

  return(
    <>
      <h2 className={style.title}>{page}</h2>
      <ul className={style.cardList}>
        {recipes.length > 0 &&
            recipes.map((recipe) => 
              <RecipeCard key={recipe.id} recipe={recipe} isEditor={isAdmin || id === recipe.userId} />
            )
        }
      </ul>
      {isAdmin || (page === "Favoris") &&
        <button className={[style.button, style.add].join(" ")} type="button" onClick={addRecipe}><img src={iconesPath.plus}/></button>
      }
    </>
  );
}

function RecipeCard({recipe, isEditor}) {
  const submit = useSubmit();
  
  function deleteRecipe(id) {
    return (event) => {
      event.preventDefault();
      submit(null,{
        method: "DELETE",
        action: `/recipes/${id}`
      });
    };
  }

  return (
    <li>
      <Link to={`/recipes/${recipe.id}`}>
        <h3>{recipe.name}</h3>
        <ul className={style.ingredientList}>
          {recipe.ingredients?.length > 0 && recipe.ingredients.map(ingredient =>
            <li key={ingredient.id}>{ingredient.name}</li>
          )}
          {isEditor &&
            <button className={[style.button, style.delete].join(" ")} type="button" onClick={deleteRecipe(recipe.id)}><img src={iconesPath.delete}/></button>
          }
        </ul>
      </Link>
    </li>
  );
}

export function loader(isFavorites){
  const {session} = store.getState();

  return async ({request}) => {
    const url = new URL(request.url);
    const query = mappingUrlFunction(url, {recipe : [["userId", !isFavorites ? "is" : "=", !isFavorites ? "null" : session.id]]});

    const recipes = await RecipeApi.getAll(query);
    store.dispatch({type:types.setRecipes, payload: recipes});
    
    return {recipes, session, page : (!isFavorites ? "Recettes" : "Favoris")};
  };
}