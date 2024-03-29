
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import EditPen from "../../../Layout/UXElements/icons/EditPen";
import DeleteCruse from "../../../Layout/UXElements/icons/DeleteCruse";
import { NavLink, useSubmit } from "react-router-dom";


import RecipeUX from "../../../Layout/UXElements/components/RecipeUX";
import { RecipeApi, UserApi } from "../../../../api";
import store from "../../../../store";
import types from "../../../../store/reducers/types";

const Meal = ({meal}) => {

    const dispatch = useDispatch()
    const {id} = useSelector((state) => state.session)
    const {favorites} = useSelector((state) => state.favorites);
    const [recipeDetails, setRecipeDetails] = useState()
    const [updateMode, setUpdateMode] = useState();
    
    const handleClickDelete = async () => {
    await UserApi.removeRecipeToUser(id, meal.id);
    dispatch({type:types.REMOVE_RECIPE_FROM_FAVORITES, payload:meal.id});
    
    }

    const handleClickUpdate = async () => {
        const recipe = await RecipeApi.get(meal.id);
        setRecipeDetails(recipe);
        setUpdateMode(true)
    }
    

    return(
        <li  className="section__li">
                <div className="section-li__container--boxLegend">
                    <NavLink to={`/recipes/${meal.id}`}>{meal.name}</NavLink>
                </div>

                <div className="section-li__container--options">
                    {updateMode&&
                        <div className="backdrop">
                            <RecipeUX modal={"modal"} formMethod={"PATCH"} cancelHandler={() => setUpdateMode(false)} recipe={recipeDetails}/>
                        </div>
                        }
                    
                    {(meal.userId === id) &&
                        <button onClick={handleClickUpdate}>
                        <EditPen />
                        </button>
                    }

                    <button onClick={handleClickDelete}>
                    <DeleteCruse/>
                    </button>
                </div>
        </li>
    )
}

export default Meal;