import { createReducer } from "@reduxjs/toolkit";
import { createAction } from "@reduxjs/toolkit";
import { UnitApi } from "../../api";
import types from "./types";

const unitDb = await UnitApi.getAll()

const initialState = [
  ...unitDb,
  {id: 0, name: "Sans unité"}
]
		
const unitReducer = createReducer (initialState, (builder) => {		
	builder	
  .addCase(createAction(types.ADD_UNIT), (state, action) => {	
    return state = [...state, action.payload];
	});
})		

export default unitReducer;