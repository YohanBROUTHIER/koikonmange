import { useLoaderData } from "react-router-dom";

import { RecipeApi } from "../../services/api";
import store from "../../store";
import types from "../../store/types";

import { mappingUrlFunction } from "../../utils/httpQueries";

export default function Recipes() {
  const loaderData = useLoaderData();
  if (!loaderData) {
    return (
      <h2>Loading...</h2>
    );
  }
  const { recipes, session } = loaderData;
  const { isAdmin, id } = session;

  return(
    <>
      <h2>Recettes</h2>
      <ul className="section__ulContainerRecipes">

        {recipes.length > 0 &&
            recipes.map((recipe) => 
              <RecipeCard key={recipe.id} recipe={recipe} isEditor={isAdmin || id === recipe.userId} />
            )
        }
      </ul>
    </>
  );
}

function RecipeCard({recipe, isEditor}) {
  return (
    <li>
      <h3>{recipe.name}</h3>
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