import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Proposition from "../components/UXElements/components/Proposition";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa6";

import './proposal.css';
import { NavLink } from "react-router-dom";
import types from "../store/types";
import { Form } from "react-router-dom";
import { HistoryApi, RecipeApi, UserApi, FamilyApi, IngredientApi } from "../services/api";

import { mappingUrlFunction } from "../utils/httpQueries";
import store from "../store";


export default function Proposal() {
  const dispatch = useDispatch();
    
  const {isConnected, id} = useSelector((state) => state.session);
  const {recipes} = useSelector((state) => state.proposal);
  const {numberOfProposition, generatedProposal, proposal, historicalPropositions} = useSelector((state) => state.proposal);

  useEffect(() => {
    if (generatedProposal === false) {
      setProposition();
      dispatch({type:types.CLOSE_PROPOSAL});
    }

  }, [generatedProposal]);

  const handleClickMinus = () => {
    if (numberOfProposition !== 0) dispatch({type:types.SUBTRACT_NUMBER_OF_PROPOSITION});
  };
    
  const handleClickPlus = () => {
    dispatch({type:types.ADD_NUMBER_OF_PROPOSITION});
  };

  const handleChange = () => {
    //
  };

  const handleSubmit = async (event = null) => {
    event.preventDefault();
    dispatch({type:types.GENERATE_PROPOSAL});
  };

  const setProposition = async () => {
    const proposalsWithValidate = recipes.map(recipe => {
      return { ...recipe, validate: true }; // Crée un nouvel objet avec la propriété validate ajoutée
    });

    const limitedProposal = proposalsWithValidate.slice(0, numberOfProposition);
        
    const objectProposal = {
      id: 1,
      array: limitedProposal
    };
    dispatch({ type: types.SET_PROPOSAL, payload: objectProposal });
  };

  const handleClickValidateChoices = async () => {

    if (proposal.array.length > 0) {
      const findProposal = historicalPropositions.find((e) => e.historic.id === proposal.id);
      if (!findProposal) {
        const createdHistory = await HistoryApi.create({userId:id});
        await Promise.all(proposal.array.map(async (recipe) => await HistoryApi.addRecipeToHistory(createdHistory.id, recipe.id, {validate:recipe.validate}) ));
                
        dispatch({type:types.SET_HISTORIC_PROPOSAL, payload:[... historicalPropositions, {date:new Date().toLocaleString(), historic:proposal}]});
      }
    }
  };
  

  return(
    <main className="outlet" style={{ gridColumn: '2 / -1' }}>
      <section className="section">
                
        <Form className="section__start" action="/proposal">
          <div>
            <FaMinus onClick={handleClickMinus} id="minus" style={{color:"var(--colorOrange)"}} size={20}/>
            <input type="number" value={numberOfProposition} onChange={handleChange} id="starter"/>
            <FaPlus onClick={handleClickPlus} id="plus" style={{color:"var(--colorOrange)"}} size={20}/>
          </div>
  
          <button onClick={handleSubmit} className="buttonStarter" id="starterButton">C'est parti !</button>
        </Form>
      </section>

      <section className="section">
        {proposal.array.length > 0?
          <>
            <ul className="section__ulContainerProposal">
              {proposal.array.map((element, index) => {
                return(
                  <Proposition proposition={element} key={index}/>
                );
              })}
            </ul>
            {isConnected?
              <div className="section__btnValidate">
                <button className="btnValidate" role="button" onClick={handleClickValidateChoices}>Valider mes choix</button>
              </div>
              :
              <div className="section__btnValidate">
                <p>Connecte toi <NavLink to={"/signin"}>ici</NavLink> pour valider tes choix</p>
              </div>
            }
                    
          </>
          :
          <p className="section__pNoResults">Aucuns résultats. Précise tes critères</p>
        }
      </section>
    </main>
  );
}

export async function loader({request}){
  const state = store.getState();
  const {session} = state;

  const urlClient = new URL(request.url);
  const query = mappingUrlFunction(urlClient);

  // store.dispatch({type:types.SET_RECIPES, payload: await RecipeApi.getAll(query)});
  // if (state.proposal.generatedProposal) store.dispatch({type:types.GENERATED_PROPOSAL});
  store.dispatch({type:types.SET_FAMILIES, payload: await FamilyApi.getAll()});
  store.dispatch({type:types.SET_INGREDIENTS, payload:await IngredientApi.getAll()});
  if (session.isConnected) {
    const favorites = await UserApi.getRecipeToUser(null, session.id);
    store.dispatch({type:types.SET_FAVORITES, payload: favorites});
  }

  const params = new URLSearchParams(urlClient.search);
  const favoriteParam = params.get('favoritesRecipes');

  // /!\ faire le dispatch recipesProposal avant le dispatch generatedProposal
  // pas de useLoaderData() pour cette raison
  if (favoriteParam) {
    store.dispatch({type:types.SET_RECIPES_PROPOSAL, payload: await UserApi.getRecipeToUser(query, session.id)});
    if (state.proposal.generatedProposal) store.dispatch({type:types.GENERATED_PROPOSAL});
  } else {
    store.dispatch({type:types.SET_RECIPES_PROPOSAL, payload: await RecipeApi.getAll(query)});
    if (state.proposal.generatedProposal) store.dispatch({type:types.GENERATED_PROPOSAL});
  }

  return null;
}
