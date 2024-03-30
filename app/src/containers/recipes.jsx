import { useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import Meal from "../components/meal2";
import { FaSquareMinus } from "react-icons/fa6";
import AddPlus from '../components/UXElements/icons/AddPlus';

import './recipe.css';

import RecipeUX from "../components/UXElements/components/RecipeUX";
import OrderByComponent from "../components/UXElements/components/OrderByComponent";
import SearchForm from "../components/UXElements/components/SearchForm";

import { FamilyApi, IngredientApi, RecipeApi, UserApi } from "../services/api";
import { mappingUrlFunction } from "../utils/httpQueries";
import store from "../store";
import types from "../store/reducers/types";

export default function Recipes() {

  const {recipes} = useSelector((state) => state.recipes);
  const [recipesCopy, setCopy] = useState(recipes);
  const [openModeCreator, setCreatorMode] = useState(false);
  const [isAdmin, setAdmin] = useState(true);

  useEffect(() => {
    setCopy(recipes);
  }, [recipes]);

  const handleChangeSearch = (event) => {
    if (event.target.value.length === 0) setCopy(recipes);
    const searchedRecipes = recipes.filter((recipe) => recipe.name.toLowerCase().startsWith(event.target.value));
    setCopy(searchedRecipes);
  };

  const handleClickAddRecipe = () => {
    setCreatorMode((current) => !current); 
  };

    

  return(
    <main className="main outlet" style={{ gridColumn: '2 / -1', overflowY:"scroll", overflowX:"hidden"}}>
        
      <section className="section">
        <div className="section__divForm">
          <h2>Recettes</h2>

          <div>
            <SearchForm handleChangeSearch={handleChangeSearch}/>
            <OrderByComponent />
          </div>

        </div>

        {openModeCreator&&
          <div className="backdrop">
            <RecipeUX modal={"modal"} formMethod={"POST"} cancelHandler={() => setCreatorMode(false)}/>
          </div>
        }
            
        <div className="section__addRecipe"> 
          {isAdmin?
            !openModeCreator?
              <AddPlus handleClick={handleClickAddRecipe} />
              :
              <FaSquareMinus onClick={handleClickAddRecipe}/>
            :
            ""}</div>
        <ul className="section__ulContainerRecipes">

          {recipesCopy.length > 0&&
            recipesCopy.map((meal, index) => {
              return(<Meal key={index} meal={meal} isAdmin={isAdmin} setAdmin={setAdmin}/>);
            })
          }

        </ul>
      </section>
    </main>
  );
};

export async function loader({request}){
  const {session} = store.getState();
  
  const url = new URL(request.url);
  
  const urlClient = url;
  // , {recipe : [["userId","is","null"]]}
  const query = mappingUrlFunction(urlClient);
  
  async function fetchDataRecipesApi() {
    const recipes = await RecipeApi.getAll(query);
    store.dispatch({type:types.SET_RECIPES, payload: recipes});
    return recipes;
  }
    
  async function fetchDataFavoritesRecipesApi() {
    const favorites = await UserApi.getRecipeToUser(null, session.id);
    store.dispatch({type:types.SET_FAVORITES, payload: favorites});
    return favorites;
  }
  if (session.isConnected) {
    await fetchDataFavoritesRecipesApi();
  }
    
  async function fetchDataFamilyApi() {
    const families = await FamilyApi.getAll();
    store.dispatch({type:types.SET_FAMILIES, payload: families});
    return families; 
  }
  await fetchDataFamilyApi();
  
  async function fetchDataIngredientApi() {
    const ingredients = await IngredientApi.getAll();
    store.dispatch({type:types.SET_INGREDIENTS, payload: ingredients});
    return ingredients;
  }
  await fetchDataIngredientApi();
    
  return fetchDataRecipesApi();
}