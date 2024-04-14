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
  const { isAdmin } = session;

  function addRecipe() {
    navigate("/recipe/new");
  }

  return(
    <>
      <h2 className={style.title}>{page}</h2>
      <ul className={style.cardList}>
        {recipes.length > 0 &&
            recipes.map((recipe) => 
              <RecipeCard key={recipe.id} recipe={recipe} session={session} />
            )
        }
      </ul>
      {isAdmin || (page === "Favoris") &&
        <button className={[style.button, style.add].join(" ")} type="button" onClick={addRecipe}><img src={iconesPath.plus}/></button>
      }
    </>
  );
}

function RecipeCard({recipe, session}) {
  const submit = useSubmit();
  
  function deleteRecipe(id) {
    return (event) => {
      event.preventDefault();
      submit(null,{
        method: "DELETE",
        action: `/recipe/${id}`
      });
    };
  }
  function toggleFavorite(id) {
    return (event) => {
      event.preventDefault();
      submit(null,{
        method: recipe.isFavorite ? "DELETE" : "PUT",
        action: `/recipe/${id}/user/${session.id}`
      });
    };
  }

  return (
    <li>
      <Link to={`./${recipe.id}`}>
        <h3>{recipe.name}</h3>
        <ul className={style.ingredientList}>
          {recipe.ingredients?.length > 0 && recipe.ingredients.map(ingredient =>
            <li key={ingredient.id}>{ingredient.name}</li>
          )}
        </ul>
        {session.isAdmin || session.id === recipe.userId ?
          <button className={[style.button, style.delete].join(" ")} type="button" onClick={deleteRecipe(recipe.id)}><img src={iconesPath.delete}/></button>
          :
          <>
            {session.isConnected &&
              <button className={[style.button, style.favorite].join(" ")} type="button" onClick={toggleFavorite(recipe.id)}>{recipe.isFavorite ? "\u2605" : "\u2606"}</button>
            }
          </>
        }
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