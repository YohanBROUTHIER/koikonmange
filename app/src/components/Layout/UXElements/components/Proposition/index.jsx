
import ValidateCheck from "../../icons/ValidateCheck";
import DeleteCruse from "../../icons/DeleteCruse";
import { IoCartOutline } from "react-icons/io5";

import FavoriteStar from "../../icons/FavoriteStar";
import FavoriteStarOutline from "../../icons/FavoriteStarOutline";
import { NavLink } from "react-router-dom";

import './Proposition.css'
import { useDispatch, useSelector } from "react-redux";
import store from "../../../../../store";
import types from "../../../../../store/reducers/types";



const Proposition = ({proposition, history}) => {

    const {isConnected} = useSelector((state) => state.session);
    const {proposal} = useSelector((state) => state.proposal)
    const {favorites} = useSelector((state) => state.favorites);
    const dispatch = useDispatch()

    const handleClickDeleteProposition = (event) => {
        
        const foundIndexRecipe = proposal.array.findIndex((recipe) => recipe.id === proposition.id);
        const copyProposal = {...proposal}
        const updatedProposalArray = [...proposal.array];
        updatedProposalArray[foundIndexRecipe] = {...updatedProposalArray[foundIndexRecipe], validate:false}
        copyProposal.array = updatedProposalArray
        dispatch({type:types.SET_PROPOSAL, payload:copyProposal});
        event.target.closest("li").style.backgroundColor = "#fafafa";
        event.target.closest("li").style.filter = "grayscale(70%)"
    };

    const handleClickValidateProposition = () => {
        const foundIndexRecipe = proposal.array.findIndex((recipe) => recipe.id === proposition.id);
        const copyProposal = {...proposal}
        const updatedProposalArray = [...proposal.array];
        updatedProposalArray[foundIndexRecipe] = {...updatedProposalArray[foundIndexRecipe], validate:true}
        copyProposal.array = updatedProposalArray
        dispatch({type:types.SET_PROPOSAL, payload:copyProposal});
        event.target.closest("li").style.backgroundColor = "white",
        event.target.closest("li").style.filter= "grayscale(0%)"
    }

    return(
        <li className={proposition.validate? "liProposotion validate":"liProposotion unvalidate"}>
            <div className="liProposotion__imgContainer">
                <img src={proposition.image === null?"/default-img.jpg":proposition.image} alt={`${proposition.name}`} />
            </div>
            <div className="liProposotion__legendContainer">
                <p className="liProposotion__p--name">
                    {proposition.name}
                </p>
                <div>
                    <NavLink to={`/recipes/${proposition.id}`}>Voir la recette</NavLink>
                    {isConnected?
                    favorites.find((recipe) => recipe.id === proposition.id)?
                        <FavoriteStar />
                        :
                        <FavoriteStarOutline />
                        :
                        ""
                        }
                </div>
            </div>

            {history?
                <div className="liProposotion__choiceBox">        
                    <IoCartOutline />
                </div>
            :
            <div className="liProposotion__choiceBox">
                    <ValidateCheck handleClick={handleClickValidateProposition}/>
                    <DeleteCruse handleClick={handleClickDeleteProposition} />
            </div>
            }

        </li>

    )
}

export default Proposition;