

import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import EditPen from "../../../Layout/UXElements/icons/EditPen";
import DeleteCruse from "../../../Layout/UXElements/icons/DeleteCruse";
import FavoriteStar from "../../../Layout/UXElements/icons/FavoriteStar";
import FavoriteStarOutline from "../../../Layout/UXElements/icons/FavoriteStarOutline";
import { RecipeApi, UserApi } from "../../../../api";
import types from "../../../../store/reducers/types";
import RecipeUX from "../../../Layout/UXElements/components/RecipeUX";


const Meal = ({meal}) => {

    const dispatch = useDispatch()
    const {id, isConnected, isAdmin} = useSelector((state) => state.session)
    const {favorites} = useSelector((state) => state.favorites);
    const [recipeDetails, setRecipeDetails] = useState()
    const [updateMode, setUpdateMode] = useState(false);
    
    const handleClickDelete = async () => {
        await RecipeApi.delete(meal.id);
        dispatch({type:types.SET_RECIPES, payload:await RecipeApi.getAll()});
    }

    const handleClickUpdate = async () => {
        const recipe = await RecipeApi.get(meal.id);
        setRecipeDetails(recipe);
        setUpdateMode(true)
    }

    const handleClickAddFavorites = async () => {
        await UserApi.addRecipeToUser(id, meal.id);
        dispatch({type:types.SET_FAVORITES, payload:[...favorites, meal] })

    }

    const handleClickDeleteFavorites = async () => {
        await UserApi.removeRecipeToUser(id, meal.id);
        dispatch({type:types.SET_FAVORITES, payload: await UserApi.getRecipeToUser(null, id) })
    }


    return(
        <li  className="section__li">
                <div className="section-li__container--boxLegend">
                    <NavLink to={`/recipes/${meal.id}`}>{meal.name}</NavLink>
                </div>
                <div className="section-li__container--options">
                    {isAdmin?
                        <>  
                        <button onClick={handleClickUpdate}>
                            <EditPen />

                        </button>
                            <button onClick={handleClickDelete}>
                                <DeleteCruse/>
                            </button>
                        </>
                        :
                        isConnected?
                        favorites.find((element) => element.id === meal.id)?
                            <FavoriteStar handleClick={handleClickDeleteFavorites}/>
                            :
                            <FavoriteStarOutline handleClick={handleClickAddFavorites}/>
                            :
                            ""
                    }
                    {updateMode&&
                    <>
                    <div className="backdrop">
                        <RecipeUX recipe={recipeDetails} modal={"modal"} cancelHandler={() => setUpdateMode(false)} formMethod={"PATCH"}/>
                    </div>
                    </>
                    }
                </div>
                
        </li>
    )
}

export default Meal;