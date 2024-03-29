import { useDispatch, useSelector } from "react-redux"
import store from "../../../../../store"
import types from "../../../../../store/reducers/types";

const Options = ({family, ingredient}) => {

    const {familiesChoices} = useSelector((state) => state.families);
    const {ingredientsChoices} = useSelector((state) => state.ingredients);
    const dispatch = useDispatch();
    const handleClickOption = () => {
        // si c'est une option famille d'ingredient
        if (family) {
            // si i n'y a pas encore d'options de choisie, on ajoute l'option au tableau
            if (familiesChoices.length <= 0) {
                const array = [family.id, family.name]
                dispatch({type:types.ADD_ONE_FAMILY_CHOICES, payload:array})
            } else {
                // sinon on vérifie que l'option n'y soit pas avant de l'ajouter
                const foundFamilyIngredient = familiesChoices.find((element) => element[1] === family.name);
                if (!foundFamilyIngredient) {
                    const array = [family.id, family.name];
                    dispatch({type:types.ADD_ONE_FAMILY_CHOICES, payload:array})
                }
            }
        }
        // si c'est une option ingrédient
        if (ingredient) {

            // si i n'y a pas encore d'options ingrédients de choisie, on ajoute l'option au tableau
            if (ingredientsChoices.length <= 0) {
                const array = [ingredient.id, ingredient.name]
                dispatch({type:types.ADD_ONE_INGREDIENT_CHOICES, payload:array})
            } else {
                // sinon on vérifie que l'option n'y soit pas avant de l'ajouter
                const foundIngredient = ingredientsChoices.find((element) => element[1] === ingredient.name);
                if (!foundIngredient) {
                    const array = [ingredient.id, ingredient.name]
                    dispatch({type:types.ADD_ONE_INGREDIENT_CHOICES, payload:array})
                }
            }
        }
     
    }

    return(
        <>
            {family&&
                <li className="liOptions" onClick={(handleClickOption)}>
                    <p>{family.name}</p>
                </li>
            }
            {ingredient&&
                <li className="liOptions" onClick={(handleClickOption)}>
                    <p>{ingredient.name}</p>
                </li>
            }
        </>
    )

}

export default Options;