import { useEffect } from 'react';
import { FaSquareMinus } from 'react-icons/fa6';
import { useSelector } from 'react-redux';

import '../favorites.css';
import Meal from '../../components/meal2';
import AddPlus from '../../components/UXElements/icons/AddPlus';
import { useState } from 'react';
import RecipeUX from '../../components/UXElements/components/RecipeUX';
import OrderByComponent from '../../components/UXElements/components/OrderByComponent';
import SearchForm from '../../components/UXElements/components/SearchForm';

import { FamilyApi, IngredientApi, RecipeApi, UserApi } from "../../services/api";
import { mappingUrlFunction } from "../../utils/httpQueries";
import store from "../../store";
import types from "../../store/types";

export default function Favorites () {

  // const favorites = useLoaderData();
  const {favorites} = useSelector((state) => state.favorites);
    
  const [favoritesCopy, setCopy] = useState(favorites);
  const [openModeCreator, setCreatorMode] = useState(false);
    

  useEffect(() => {
    setCopy(favorites);
  }, [favorites]);

  const handleChangeSearch = (event) => {
    if (event.target.value.length === 0) setCopy(favorites);
    const searchedRecipes = favorites.filter((recipe) => recipe.name.toLowerCase().startsWith(event.target.value));
    setCopy(searchedRecipes);
  };


  const handleClickAddRecipe = () => {
    setCreatorMode((current) => !current); 
  };

    
  return(
    <main className="main outlet" style={{ gridColumn: '2 / -1', overflowY:"scroll", overflowX:"hidden"}}>
      <section className="section">
        <div className="section__divForm">
          <h2>Favoris</h2>
          <div>
            <SearchForm handleChangeSearch={handleChangeSearch}/>
            <OrderByComponent />
          </div>
        </div>

        <div className="section__addRecipe">
          {!openModeCreator?
            <AddPlus handleClick={handleClickAddRecipe}/>
            :
            <FaSquareMinus onClick={handleClickAddRecipe}/>
          }
        </div>

        {openModeCreator&&
          <div className="backdrop">
            <RecipeUX modal={"modal"} formMethod={"POST"} cancelHandler={() => setCreatorMode(false)} favorite={true}/>
          </div>
        }

        {favoritesCopy.length > 0 &&
          favoritesCopy.map((meal, index) => {
            return(
              <Meal key={index} meal={meal}/>
            );
          }) 
        }

      </section>
    </main>
  );
}

export async function loader({request}){
  const {session} = store.getState();

  const url = new URL(request.url);

  const urlClient = url;
  // ,{recipe : [["userId","=",session.id]]}
  const query = mappingUrlFunction(urlClient); 

  async function fetchDataRecipesApi() {
    const recipes = await RecipeApi.getAll(query);
    store.dispatch({type:types.SET_RECIPES, payload: recipes});
    return recipes;
  }
  await fetchDataRecipesApi();

  async function fetchDataFavoritesRecipesApi() {
    const favorites = await UserApi.getRecipeToUser(query, session.id);
    store.dispatch({type:types.SET_FAVORITES, payload: favorites});
    return favorites;
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

  return fetchDataFavoritesRecipesApi();
}