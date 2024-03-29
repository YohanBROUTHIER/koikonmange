import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Proposition from "../../Layout/UXElements/components/Proposition";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa6";

import './Proposal.css';
import { NavLink, useLoaderData, useLocation } from "react-router-dom";
import types from "../../../store/reducers/types";
import { Form } from "react-router-dom";
import { HistoryApi, RecipeApi, UserApi } from "../../../api";


const Proposal = () => {
    const dispatch = useDispatch();
    
    const {isConnected, id} = useSelector((state) => state.session);
    const {recipes} = useSelector((state) => state.proposal);
    const {numberOfProposition, generatedProposal, proposal, historicalPropositions} = useSelector((state) => state.proposal);

    useEffect(() => {
        if (generatedProposal === false) {
            setProposition();
            dispatch({type:types.CLOSE_PROPOSAL})
        }

    }, [generatedProposal])

    const handleClickMinus = () => {
        if (numberOfProposition !== 0) dispatch({type:types.SUBTRACT_NUMBER_OF_PROPOSITION});
    }
    
    const handleClickPlus = () => {
        dispatch({type:types.ADD_NUMBER_OF_PROPOSITION});
    }

    const handleChange = () => {
        //
    }

    const handleSubmit = async (event = null) => {
        event.preventDefault();
        dispatch({type:types.GENERATE_PROPOSAL});
    }

    const setProposition = async () => {
        const proposalsWithValidate = recipes.map(recipe => {
            return { ...recipe, validate: true }; // Crée un nouvel objet avec la propriété validate ajoutée
        });

        const limitedProposal = proposalsWithValidate.slice(0, numberOfProposition)
        
        const objectProposal = {
            id: 1,
            array: limitedProposal
        }
        dispatch({ type: types.SET_PROPOSAL, payload: objectProposal });
    }

    const handleClickValidateChoices = async () => {

        if (proposal.array.length > 0) {
            const findProposal = historicalPropositions.find((e) => e.historic.id === proposal.id);
            if (!findProposal) {
                const createdHistory = await HistoryApi.create({userId:id});
                await Promise.all(proposal.array.map(async (recipe) => await HistoryApi.addRecipeToHistory(createdHistory.id, recipe.id, {validate:recipe.validate}) ));
                
                dispatch({type:types.SET_HISTORIC_PROPOSAL, payload:[... historicalPropositions, {date:new Date().toLocaleString(), historic:proposal}]});
            }
        }
    }
  

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
                                )
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
    )
}

export default Proposal;

