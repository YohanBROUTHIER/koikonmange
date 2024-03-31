import { useLoaderData, Form, Outlet } from 'react-router-dom';

import { FamilyApi, IngredientApi, UnitApi } from '../../services/api';
import store from '../../store';
import types from '../../store/types';

import style from './filterMenu.module.css';

export default function FilterMenu() {
  const loaderData = useLoaderData();
  if (!loaderData) {
    return (
      <h2>Loading...</h2>
    );
  }
  const {families, ingredients, units} = loaderData;

  return(
    <>
      <div className={style.menu}>
        <h3 className={style.title}>Filtre</h3>
        <Form className={style.form}>

        </Form>
      </div>
      <Outlet/>
    </>
  );
}

export async function loader() {

  let {families, ingredients, units} = store.getState();
  if (!families) {
    families = await FamilyApi.getAll();
    store.dispatch({type:types.setFamilies, payload: families});
  }
  if (!ingredients) {
    ingredients = await IngredientApi.getAll();
    store.dispatch({type:types.setIngredients, payload: ingredients});
  }
  if (!units) {
    ingredients = await UnitApi.getAll();
    store.dispatch({type:types.setUnits, payload: ingredients});
  }

  store.dispatch({type:types.addLeftMenu});

  return {families, ingredients, units};
}