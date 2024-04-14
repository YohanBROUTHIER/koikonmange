import { useState } from "react";
import { Form, useLoaderData } from "react-router-dom";

import { IngredientApi, RecipeApi, UnitApi } from "../../services/api";
import DropDownList from "./dropDownList";
import { iconesPath } from "../../utils";
import store from "../../store";
import types from "../../store/types";

import style from './recipe.module.css';

export default function Recipe({formMethod}) {
  const loaderData = useLoaderData() || {};
  const hungers = ["Copieux", "Normal", "Léger"];
  const {recipe, session, ingredients, units} = loaderData;

  const [inChange, setInChange] = useState(formMethod === "PATCH" ? false : true);
  const [steps, setSteps] = useState(recipe?.steps || []);
  const [newIngredients, setNewIngredients] = useState(recipe?.ingredients || []);
  const [selectedMenu, setSelectedMenu] = useState(null);

  function  changeRecipe() {
    setInChange(!inChange);
  }

  if (!inChange) {
    return (
      <>
        <h2 className={style.title}>{recipe.name || ""}</h2>
        <section className={[style.section, style.row].join(" ")}>
          <h4>Preparation :</h4>
          <time dateTime={recipe.preparatingTime}>{recipe.preparatingTime}</time>
          <h4>Cuisson :</h4>
          <time dateTime={recipe.cookingTime}>{recipe.cookingTime}</time>
          <h4>Nombre de convive :</h4>
          <span>{recipe.person}</span>
          <h4>Faim :</h4>
          <span>{recipe.hunger}</span>
          {recipe.image && 
            <figure>
              <img src={recipe.image} alt={recipe.name} />
            </figure>
          }
        </section>

        <section className={style.section}>
          <h3>Ingredients</h3>
          <ul className={`${style.ingredientList}`}>
            {recipe.ingredients?.length > 0 && recipe.ingredients.map(ingredient => (
              <li key={ingredient.id}>
                <span>{ingredient.quantity && ingredient.quantity + " "}{ingredient.unit && ingredient.unit.name + " "}{ingredient.name}</span>
                {ingredient.image &&
                  <figure>
                    <img src={ingredient.image} alt={ingredient.name} />
                  </figure>
                }
              </li>
            ))}
          </ul>
        </section>
        <section className={style.section}>
          <h3>Etapes</h3>
          <ul className={style.stepList}>
            {recipe.steps && recipe.steps.map((step, index) => (
              <li key={index} className={`${style.liSteps}`}>
                <h4 className={`${style.sectionRecipeFieldH4}`}>Etape {index + 1}</h4>
                <p>{step}</p>
              </li>
            ))}
          </ul>
        </section>
        { (session.isAdmin || session.id === recipe.userId) &&
          <button className={[style.button, style.edit].join(" ")} type="button" onClick={changeRecipe}><img src={iconesPath.update}/></button>
        }
      </>
    );
  }

  function closeAllMenu() {
    setSelectedMenu(null);
  }
  function openMenu(name) {
    return () => {
      setSelectedMenu(name);
    };
  }
  function toggleItem(itemName, id) {
    if (itemName === "ingredients") {
      const isInRecipe = newIngredients.some(ingredient => ingredient.id === id);
      if (isInRecipe) {
        setNewIngredients(newIngredients.filter(ingredient => ingredient.id !== id));
      } else {
        const addedIngredient = ingredients.find(ingredient => ingredient.id === id);
        setNewIngredients([...newIngredients, addedIngredient]);
      }
    }
    if (itemName === "steps") {
      const newSteps = [...steps];
      newSteps.splice(id,1);
      setSteps(() => newSteps);
    }
  }

  function addStepp() {
    setSteps([...steps, '']);
  }

  function stepUpdate(index) {
    return (event) => {
      const newSteps = [...steps];
      newSteps[index] = event.target.value;
      setSteps(newSteps);
    };
  }

  return(
    <Form className={style.form} method={formMethod} action={recipe.id ? `/recipe/${recipe.id}` : "/recipe"}>
      {recipe.id &&
        <input type="hidden" name="id" value={recipe.id} placeholder="Nom de la recette" />
      }
      <input className={style.title} name="name" type="text" defaultValue={recipe.name} required/>
      <fieldset className={style.row}>
        <label>Preparation :</label>
        <input name="preparatingTime" type="time" defaultValue={recipe.preparatingTime || "00:00"} required />
        <label>Cuisson :</label>
        <input name="cookingTime" type="time" defaultValue={recipe.cookingTime || "00:00"} required />
        <label>Nombre de convive :</label>
        <input name="person" type="number" min="1" defaultValue={recipe.person || 4} />
        <label>Faim :</label>
        <select name="hunger" defaultValue={recipe.hunger || "Normal"}>
          {!!hungers && hungers.map((name, index) => (
            <option key={index} value={name}>{name}</option>
          ))}
        </select>
        {recipe.image && 
          <figure>
            <img src={recipe.image} alt={recipe.name} />
          </figure>
        }
      </fieldset>
      <fieldset >
        <legend>Ingredients</legend>
        <DropDownList  className={style.add} itemName={"ingredients"} items={ingredients} choosenItems={newIngredients} isOpen={selectedMenu === "ingredients"} openHandler={openMenu("ingredients")} closeHandler={closeAllMenu} toggleItemHandler={toggleItem} />
        <ul className={`${style.ingredientList}`}>
          {newIngredients.length > 0 && newIngredients.map(ingredient => (
            <li key={ingredient.id}>
              <span>{ingredient.name}</span>
              <input type="number" min="0" name={`ingredients-quantity-${ingredient.id}`} defaultValue={ingredient.quantity} size="2"/>
              <select name={`ingredients-unitId-${ingredient.id}`} defaultValue={ingredient.unit?.id || ""} >
                <option value={""}>--Sans unité--</option>
                {units && units.map(unit =>
                  <option key={unit.id} value={unit.id}>{unit.name}</option>
                )}
              </select>
              {ingredient.image &&
                <figure>
                  <img src={ingredient.image} alt={ingredient.name} />
                </figure>
              }
              <button className={[style.button, style.delete].join(" ")} type="button" data-item-id={`Ingredients-${ingredient.id}`} onClick={toggleItem} ><img src={iconesPath.delete}/></button>
            </li>
          ))}
        </ul>
      </fieldset>
      <fieldset>
        <legend>Etapes</legend>
        <button className={[style.button, style.add].join(" ")} type="button" onClick={addStepp}><img src={iconesPath.plus}/></button>
        <ul className={style.stepList}>
          {steps &&
            <input type="hidden" name="steps" defaultValue={steps.map((element) => element).join("-")} />}
          {steps && steps.map((step, index) => (
            <li key={index} >
              <p>Etape {index + 1}</p>
              <textarea value={step} onChange={stepUpdate(index)}/>
              <button className={[style.button, style.deleteStep].join(" ")} type="button" data-item-id={`steps-${index}`} onClick={toggleItem}><img src={iconesPath.delete}/></button>
            </li>
          ))}
        </ul>
      </fieldset>
      <div className={`${style.toolbox}`}>
        <button className={[style.button, style.edit].join(" ")} type="submit"><img src={iconesPath.update}/></button>
        {formMethod !== "POST" &&
          <button className={[style.button, style.return].join(" ")} type="button" onClick={changeRecipe}><img src={iconesPath.minus}/></button>
        }
      </div>
    </Form>
  );
}

export function loader(isNew) {
  return async ({params}) => {
    let {recipes, session, ingredients, units} = store.getState();
    let recipe = {};

    const getRecipe = new Promise ((resolve) => {
      if (isNew) return resolve();
      if (recipes) {
        recipe = recipes.find(recipe => recipe.id === parseInt(params.id));
        return resolve();
      }
      resolve(RecipeApi.get(params.id));
    }).then((result) => {
      if (!result) return;
      recipe = result;
      store.dispatch({type:types.addRecipe, payload: recipe});
      return;
    });

    const getUnits = new Promise((resolve) => {
      if (!units) {
        return resolve(UnitApi.getAll());
      }
      resolve();
    }).then((result) => {
      if (!result) return;
      units = result;
      store.dispatch({type:types.setUnits, payload: units});
      return;
    });

    const getIngredients = new Promise((resolve) => {
      if (!ingredients) {
        return resolve(IngredientApi.getAll());
      }
      resolve();
    }).then((result) => {
      if (!result) return;
      ingredients = result;
      store.dispatch({type:types.setIngredients, payload: ingredients});
      return;
    });

    await Promise.all([
      getRecipe,
      getUnits,
      getIngredients
    ]);

    return {recipe, session, ingredients, units};
  };
}