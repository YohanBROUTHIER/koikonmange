import { useRef, useState } from "react";
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

  const [inChange, setInChange] = useState(false);
  const [steps, setSteps] = useState(recipe.steps || []);
  const [newIngredients, setNewIngredients] = useState(recipe.ingredients || []);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const selectElement = useRef();

  function  changeRecipe() {
    setInChange(!inChange);
  }

  if (!inChange) {
    return (
      <>
        <h2 className={style.title}>{recipe.name}</h2>
        <section className={style.section}>
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
            {recipe.ingredients && recipe.ingredients.map(ingredient => (
              <li key={ingredient.id}>
                <p>{ingredient.quantity && ingredient.quantity + " "}{ingredient.unit && ingredient.unit + " "}{ingredient.name}</p>
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
          <button className={[style.bouton, style.edit].join(" ")} type="button"><img src={iconesPath.update}/></button>
        }
      </>
    );
  }

  function closeAllMenu() {
    if (selectedMenu !== "ingredients") return;
    setSelectedMenu(null);
  }
  function openIngredientMenu() {
    if (selectedMenu === "ingredients") return;
    setSelectedMenu("ingredients");
  }
  function toggleItem(itemName, id) {
    if (itemName === "Ingredients") {
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

  function stepUpdate(event) {
    const id = parseInt(event.target.dataset.itemId.split("-")[1]);
    const newSteps = [...steps];
    newSteps[id] = event.target.value;
    setSteps(newSteps);
  }
  

  return(
    <Form className={style} method={formMethod}>
      <input type="hidden" name="id" value={recipe.id} />
      <input className={style.title} name="name" type="text" defaultValue={recipe.name} style={{ width: '20rem' }} required/>
      <fieldset>
        <label>Preparation :</label>
        <input name="preparatingTime" type="time" defaultValue={recipe.preparatingTime} required />
        <label>Cuisson :</label>
        <input name="cookingTime" type="time" defaultValue={recipe.cookingTime} required />
        <label>Nombre de convive :</label>
        <input name="person" type="number" min="1" defaultValue={recipe.person} />
        <label>Faim :</label>
        <select className={`${style.sectionRecipeFieldSelect}`} ref={selectElement} name="hunger" defaultValue={recipe.hunger}>
          {!!hungers && hungers.map(({ name }, index) => (
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
        <DropDownList itemName={"Ingredients"} items={ingredients} choosenItems={newIngredients} isOpen={selectedMenu === "ingredients"} openHandler={openIngredientMenu} closeHandler={closeAllMenu} toggleItemHandler={toggleItem} />
        <ul className={`${style.ingredientList}`}>
          {newIngredients && newIngredients.map(ingredient => (
            <li key={ingredient.id}>
              <p>{ingredient.quantity && ingredient.quantity + " "}{ingredient.unit && ingredient.unit + " "}{ingredient.name}</p>
              <input type="number" min="0" name={`quantity-${ingredient.id}`} defaultValue={ingredient.quantity} size="2"/>
              <select name={`unit-${ingredient.id}`} defaultValue={ingredient.unit || 0}>
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
        <button type="button" onClick={addStepp}><img src={iconesPath.plus}/></button>
        <ul className={style.sectionRecipeFieldStepsContainer}>
          {steps &&
            <input type="hidden" name="steps" defaultValue={steps.map((element) => element).join('"')} />}
          {steps && steps.map((step, index) => (
            <li key={index} >
              <p>Etape {index + 1}</p>
              <textarea name={`steps${index}`} value={step} data-item-id={`steps-${index}`} onChange={stepUpdate}/>
              <button className={style.BtnDeleteStep} type="button" data-item-id={`steps-${index}`} onClick={toggleItem}><img src={iconesPath.delete}/></button>
            </li>
          ))}
        </ul>
      </fieldset>
      <div className={`${style.toolbox}`}>
        <button type="submit"><img src={iconesPath.update}/></button>
        <button type="button" onClick={changeRecipe}><img src={iconesPath.minus}/></button>
      </div>
    </Form>
  );
}



export async function loader({params}) {
  let {recipes, session, ingredients, units} = store.getState();

  let recipe;
  if (recipes) {
    recipe = recipes.find(recipe => recipe.id === parseInt(params.id));
  }
  if (!recipe) {
    recipe = await RecipeApi.get(params.id);
  }

  if (!ingredients) {
    ingredients = await IngredientApi.getAll();
    store.dispatch({type:types.setIngredients, payload: ingredients});
  }
  if (!units) {
    units = await UnitApi.getAll();
    store.dispatch({type:types.setUnits, payload: units});
  }

  return {recipe, session, ingredients, units};
}