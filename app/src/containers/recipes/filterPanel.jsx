import { useState } from "react";
import { useLoaderData, Form, Outlet } from 'react-router-dom';
import MultiRangeSlider from "multi-range-slider-react";

import { FamilyApi, IngredientApi } from '../../services/api';
import store from '../../store';
import types from '../../store/types';

import style from './filterPanel.module.css';
import DropDownList from './dropDownList';
import Tag from "./tag";
import { iconesPath, minutesToTime, timeToMinutes, useSupportType } from "../../utils";

export default function FilterPanel() {
  const loaderData = useLoaderData();
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [filters, setFilters] = useState(store.getState().filters);
  const [displayPanel, setDisplayPanel] = useState(false);
  const supportType = useSupportType();

  const {families, ingredients, pathname} = loaderData;

  function openMenu(menuName) {
    return () => {
      setSelectedMenu(menuName);
    };
  }
  function closeMenu() {
    setSelectedMenu(null);
  }
  function toggleItem(itemName, id) {
    const isInRecipe = filters[itemName].some(item => item.id === id);
    const newFilters = {};
    if (isInRecipe) {
      newFilters[itemName] = filters[itemName].filter(item => item.id !== id);
    } else {
      const newItem = loaderData[itemName].find(item => item.id === id);
      newFilters[itemName] = [...filters[itemName], newItem];
    }
    setFilters({...filters, ...newFilters});
  }
  function togglePannel() {
    setDisplayPanel(!displayPanel);
  }

  return(
    <>
      {(displayPanel || (supportType === "desktop" || supportType === "large_screen")) &&
        <div className={supportType === "desktop" || supportType === "large_screen" ? [style.panel, style.leftPanel].join(" ") :style.panel}>
          <h3 className={style.title}>Filtre</h3>
          <Form className={style.form} action={pathname}>
            <fieldset>
              <legend>Composition</legend>
              <label>Familles</label>
              <DropDownList itemName={"families"} items={families} choosenItems={filters.families} isOpen={selectedMenu === "families"}
                openHandler={openMenu("families")} closeHandler={closeMenu} toggleItemHandler={toggleItem} />
              <ul className={style.list}>
                {filters.families.length > 0 && filters.families.map(item =>(
                  <li key={item.id}><Tag itemName={"families"} item={item} removeHandler={toggleItem}/></li>
                ))}
              </ul>
              <label>Ingrédients</label>
              <DropDownList itemName={"ingredients"} items={ingredients} choosenItems={filters.ingredients} isOpen={selectedMenu === "ingredients"}
                openHandler={openMenu("ingredients")} closeHandler={closeMenu} toggleItemHandler={toggleItem} />
              <ul className={style.list}>
                {filters.ingredients.length > 0 && filters.ingredients.map(item =>(
                  <li key={item.id}><Tag itemName={"ingredients"} item={item} removeHandler={toggleItem}/></li>
                ))}
              </ul>
            </fieldset>
            <fieldset>
              <legend>Temps</legend>
              <label htmlFor="">Temps de préparation</label>
              <DoubleInputRange itemName={"preparatingTime"} item={filters.preparatingTime} />
              <label htmlFor="">Temps de cuisson</label>
              <DoubleInputRange itemName={"cookingTime"} item={filters.cookingTime} />
            </fieldset>
            <fieldset>
              <legend>Appétit</legend>
              <div>
                <input type="checkbox" name="hunger" id="Copieux" value="Copieux"/>
                <label htmlFor="Copieux">Copieux</label>
              </div>
              <div>
                <input type="checkbox" name="hunger" id="Normal" value="Normal"/>
                <label htmlFor="Normal">Normal</label>
              </div>
              <div>
                <input type="checkbox" name="hunger" id="Leger" value="Léger"/>
                <label htmlFor="Leger">Léger</label>
              </div>
            </fieldset>
            <button className={[style.button, style.submit].join(" ")}>Filtrer</button>
          </Form>
        </div>
      }
      {(supportType === "mobile" || supportType === "tablet") && (displayPanel ?
        <button className={[style.button, style.close].join(" ")} onClick={togglePannel}><img src={iconesPath.cross}/></button>
        :
        <button className={[style.button, style.close].join(" ")} onClick={togglePannel}><img src={iconesPath.filter}/></button>
      )}
      <main className={supportType === "desktop" || supportType === "large_screen" ? [style.main, style.leftPanel].join(" ") :style.main}>
        <Outlet/>
      </main>
    </>
  );
}

function DoubleInputRange({itemName, item}) {
  const [minValue, setMinValue] = useState(timeToMinutes(item.min));
  const [maxValue, setMaxValue] = useState(timeToMinutes(item.max));

  const time ={
    min: minutesToTime(minValue),
    max: minutesToTime(maxValue)
  };

  function timeCHange(event) {
    setMinValue(event.minValue);
    setMaxValue(event.maxValue);
  }
  return (
    <>
      <input type="hidden" name={`${itemName}-min`} value={time.min}/>
      <input type="hidden" name={`${itemName}-max`} value={time.max}/>
      <MultiRangeSlider className={style.slider}
        min={0}
        max={8 * 60}
        minValue={minValue}
        maxValue={maxValue}
        step={5}
        onInput={timeCHange}
        ruler={false}
        label={false}
        preventWheel={false}
      />
      <p className={style.time}><time dateTime={time.min}>{time.min}</time>-<time dateTime={time.max}>{time.max}</time></p>
    </>
  );
}


export async function loader({request}) {
  const url = new URL(request.url);
  const {pathname} = url;
  let {families, ingredients} = store.getState();
  if (!families) {
    families = await FamilyApi.getAll();
    store.dispatch({type:types.setFamilies, payload: families});
  }
  if (!ingredients) {
    ingredients = await IngredientApi.getAll();
    store.dispatch({type:types.setIngredients, payload: ingredients});
  }

  store.dispatch({type:types.addLeftMenu});

  return {families, ingredients, pathname};
}