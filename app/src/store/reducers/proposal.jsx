import { createReducer } from "@reduxjs/toolkit";						
import { createAction } from "@reduxjs/toolkit";						
import types from "./types";
						
const initialState = {
	numberOfProposition:0,						
	proposal:{array:[]},
	starter:0,
	historicalPropositions:[],	
	generatedProposal:null,
	recipes:null					
}						
						
const proposalReducer = createReducer (initialState, (builder) => {						
	builder
	.addCase(createAction(types.ADD_NUMBER_OF_PROPOSITION), (state) => {					
		state.numberOfProposition = state.numberOfProposition + 1	
	})
    .addCase(createAction(types.SUBTRACT_NUMBER_OF_PROPOSITION), (state) => {					
		state.numberOfProposition = state.numberOfProposition - 1	
	})					
	.addCase(createAction(types.SET_PROPOSAL), (state, action) => {					
		state.proposal = action.payload				
	})
	.addCase(createAction(types.SET_STARTER), (state) => {					
		state.starter = state.starter + 1			
	})
	.addCase(createAction(types.GENERATE_PROPOSAL), (state) => {					
		state.generatedProposal = true
	})
	.addCase(createAction(types.GENERATED_PROPOSAL), (state) => {					
		state.generatedProposal = false
	})
	.addCase(createAction(types.CLOSE_PROPOSAL), (state) => {					
		state.generatedProposal = null
	})
	builder					
	.addCase(createAction(types.SET_HISTORIC_PROPOSAL), (state, action) => {					
		state.historicalPropositions = action.payload				
	})
	.addCase(createAction(types.SET_RECIPES_PROPOSAL), (state, action) => {					
		state.recipes = action.payload				
	})		
})						
						
export default proposalReducer;