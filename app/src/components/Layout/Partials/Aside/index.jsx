import store from '../../../../store'
import { useDispatch, useSelector } from 'react-redux';
import Options from './Option/Option';
import OptionChosen from './OptionChosen/OptionChosen';
import { MdKeyboardArrowDown } from "react-icons/md";


// import './Aside.scss'
import { NavLink, useLocation, useSubmit } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

import style from './Aside.module.css'
import { Form } from 'react-router-dom';
import types from '../../../../store/reducers/types';
import DoubleInputRange from '../../UXElements/components/DoubleRange';
import BurgerMenu from '../../UXElements/components/BurgerMenu';



const Aside = () => {
    
    const dispatch = useDispatch()
    const filterButton = useRef();
    const submit = useSubmit();

    const [activeSelectorFilter, setActiveSelectorFilter] = useState(null)
    const location = useLocation();
    const currentPath = location.pathname;
    const btnFooter = currentPath !== "/proposal" ? "Nouvelle proposition" : "C'est parti !";
    const [menuOpen, setMenuOpen] = useState(false);

    const {hunger, favoritesRecipes} = useSelector((state) => state.filters.filters)

    const {ingredients, ingredientsChoices} = useSelector((state) => state.ingredients);
    const [ingredientsCopy, setIngredientsCopy] = useState(ingredients);
    
    const {families, familiesChoices} = useSelector((state) => state.families);
    const [familiesCopy, setFamiliesCopy] = useState(families);
    
    const {generatedProposal, proposal} = useSelector((state) => state.proposal);
    
    const allFamilies = {families,familiesChoices,familiesCopy}
    const allIngredients = {ingredients, ingredientsChoices, ingredientsCopy}
    
    const [isRotatedFamilyIngredientSelect, setIsRotatedFamilyIngredient] = useState(false)
    const [isRotatedIngredientSelect, setIsRotatedIngredient] = useState(false)

    
    useEffect(() => {
        if (generatedProposal) {
            submit(filterButton.current);
        }
        
    }, [generatedProposal])


    const handleChangeHungerBigFilter = () => {
        dispatch({type:types.SET_HUNGER_BIG});
    }

    const handleChangeHungerNormalFilter = () => {
        dispatch({type:types.SET_HUNGER_NORMAL});
    }

    const handleChangeHungerFewFilter = () => {
        dispatch({type:types.SET_HUNGER_FEW});
    }

    const handleChangeFavoritesRecipes = () => {
        dispatch({type:types.SET_FAVORITES_RECIPES})
    }

    const handleClickSelect = (selected) => {
        const current = selected;
        let other = "";
        if (current === "ingredients") other = "families";
        if (current === "families") other = "ingredients";

        // si le select choisi n'est pas ouvert
        if (activeSelectorFilter !== current) {
            // on l'ouvre
            setActiveSelectorFilter(current);
            // si l'autre select est déjà ouvert, on met la flèche vers le bas.
            if (activeSelectorFilter === other) {
                if (other === "families") setIsRotatedFamilyIngredient(false)
                if (other === "ingredients") setIsRotatedIngredient(false)
            }
        } else {
            // si le select choisi est déjà ouvert, on le ferme.
            setActiveSelectorFilter(null)
        }
        // on inverse la rotation la flèche du select choisi à chaque click.
        if (current === "ingredients") setIsRotatedIngredient(!isRotatedIngredientSelect);
        if (current === "families") setIsRotatedFamilyIngredient(!isRotatedFamilyIngredientSelect); 

    }

    const handleChangeSearch = (event, selected) => {
        const filteredResearch = ingredients.filter((element) => element.name.toLowerCase().startsWith(event.target.value.toLocaleLowerCase()));
        if (selected === "ingredients") setIngredientsCopy(filteredResearch)
        if (selected === "families") setFamiliesCopy(filteredResearch)
    }

    const handleClickStarterButton = () => {
        if (currentPath === "/proposal") dispatch({type:types.GENERATE_PROPOSAL})
    }

    const handleClickBurgerMenu = () => {
        setMenuOpen(!menuOpen)
    }

    return(
    <>
    <aside id="aside" className={style.aside}>
            <BurgerMenu handleClick={handleClickBurgerMenu} color={{background:"var(--colorbg1)"}}/>

        <div className={menuOpen?'':`${style.hideAside}`}>
            {/* mettre le mot "Filter" dans la classe du Form */}
            <Form  className={style.aside__formFilter} method="get" action={currentPath}>
                <fieldset>
                    <legend>Faim</legend>
                        <div className={style.asideFormFilter__hungerContainer}>
                            <div className={style.boxContainer}>
                                <input className={style.checkboxAside} id="hungerBigFilter" name="hunger" value="Copieux" type="checkbox" onChange={handleChangeHungerBigFilter} checked={hunger[0].state?true:false}/>
                                <label htmlFor="hungerBigFilter" >{hunger[0].name}</label>
                            </div>

                            <div className={style.boxContainer}>
                                <input className={style.checkboxAside} id="hungerNormalFilter" name="hunger" value="Normal" type="checkbox" onChange={handleChangeHungerNormalFilter} checked={hunger[1].state?true:false}/>
                                <label htmlFor="hungerNormalFilter" >{hunger[1].name}</label>
                            </div>

                            <div className={style.boxContainer}>
                                <input className={style.checkboxAside} id="hungerFewFilter" name="hunger" value="Léger" type="checkbox" onChange={handleChangeHungerFewFilter} checked={hunger[2].state?true:false}/>
                                <label htmlFor="hungerFewFilter" >{hunger[2].name}</label>
                            </div>


                        </div>
                </fieldset>

                <fieldset>
                    <legend>Temps</legend>
                    <div className={style.asideformFilter__inputTimeContainer}>
                    
                        <div className={style.boxContainer}>
                            <DoubleInputRange label={"Préparation"} name={"preparatingTime"}/>
                        </div>

                        <div className={style.boxContainer}>
                            <DoubleInputRange label={"Cuisson"} name={"cookingTime"}/>
                        </div>
                    </div>
                </fieldset>
                
                <div className={style.asideFormFilter__foodContainer}>
                    <fieldset>
                        <legend>Ingredients</legend>
                            {/* select ingredient */}
                            <div className={style.selectBox}>
                                {/* nom du select spécifié dans un button pour ouvrir et fermer le select*/}
                                <div className={style.selectOption} onClick={() => handleClickSelect("ingredients")}>
                                    <button type="button">Ingrédients  </button><MdKeyboardArrowDown className={style.arrowSoValue} style={{transform: isRotatedIngredientSelect ? "rotate(180deg)" : "rotate(0)"}}/> 
                                </div>
                                
                                {/* input de type hidden */}
                                <input id="ingredients" name="ingredients" type="hidden"  defaultValue={ingredientsChoices.map((ingredient) => ingredient[0]).join("-") } />
                                

                                {activeSelectorFilter === "ingredients" &&

                                    // div content apparaissant a l'ouverture du select 
                                    <div className={style.content}>

                                        {/* input search */}
                                        <div className={style.search}>
                                            <input type="search" id="optionSearchIngredient" placeholder="Rechercher" name="" onChange={() => handleChangeSearch(event, "ingredients")}/>
                                        </div>

                                        {/* ul affichant les listes des options et des options sélectionnés */}
                                        <ul className={style.options} >
                                            {ingredientsChoices.map((ingredient, index) => {
                                                // composant OptionChosen
                                                return (<OptionChosen key={index} choosen={ingredient} stateName="ingredients" />)
                                            })}
                                            {allIngredients[ingredientsCopy.length > 0 ? "ingredientsCopy" : "ingredients"].map((ingredient, index) => (
                                                // composant Options
                                                <Options key={index} ingredient={ingredient} >{ingredient.name}</Options>
                                            ))}
                                        </ul>
                                    </div>
                                }
                            </div> 
                            {/* select catégorie d'ingredient */}
                            <div className={style.selectBox}>
                                <div className={style.selectOption} onClick={() => handleClickSelect("families")}>
                                    <button type="button">Catégories</button><MdKeyboardArrowDown className={style.arrowSoValue} style={{transform: isRotatedFamilyIngredientSelect ? "rotate(180deg)" : "rotate(0)"}}/> 
                                </div>
                                <input id="families" name="families" type="hidden"  defaultValue={familiesChoices.map((family) => family[0]).join("-") } />
                                {activeSelectorFilter === "families" && 
                                    <div className={style.content}>

                                        <div className={style.search}>
                                            <input type="search" id="optionSearchFamilyIngredient" placeholder="Rechercher" name="" onChange={() => handleChangeSearch(event, "families")}/>
                                        </div>
                                        <ul className={style.options} >
                                        {familiesChoices.map((family, index) => (
                                            <OptionChosen key={index} choosen={family} stateName="families" />
                                        ))}
                                        {allFamilies[familiesCopy.length > 0 ? "familiesCopy" : "families"].map((family, index) => (
                                            <Options key={index} family={family} >{family.name}</Options>
                                        ))}


                                        </ul>
                                    </div>}
                                
                            </div>

                    </fieldset> 
                </div>


                <footer>
                    <div>
                        <input className={style.checkboxAside} id="favoritesRecipes" name="favoritesRecipes" value={favoritesRecipes.state} type="checkbox" onChange={handleChangeFavoritesRecipes} checked={favoritesRecipes.state?true:false}/>
                        <label htmlFor="favoritesRecipes" >{favoritesRecipes.name}</label>
                    </div>
               
                    <button ref={filterButton} className={style.buttonElement}>Filtrer</button>
                </footer>        

            </Form>
        </div>

        
            
                
        
        <NavLink className={`${style.asideA} ${style.hideAside} asideA`} to={currentPath === "/proposal"?"/proposal":"/proposal"} onClick={handleClickStarterButton}>
            <p>{btnFooter}</p>
            <label className={style.container} htmlFor="goingProposal">
                <input defaultChecked={proposal.lenght > 0?"true":""} type="checkbox" id="goingProposal" aria-label="going to proposal"/>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="50px" width="50px" className={style.like}>
                    <path d="M8 10V20M8 10L4 9.99998V20L8 20M8 10L13.1956 3.93847C13.6886 3.3633 14.4642 3.11604 15.1992 3.29977L15.2467 3.31166C16.5885 3.64711 17.1929 5.21057 16.4258 6.36135L14 9.99998H18.5604C19.8225 9.99998 20.7691 11.1546 20.5216 12.3922L19.3216 18.3922C19.1346 19.3271 18.3138 20 17.3604 20L8 20"></path>
                </svg>
                <svg width="50" height="50" xmlns="http://www.w3.org/2000/svg" className={style.celebrate}>
                    <polygon points="0,0 10,10"></polygon>
                    <polygon points="0,25 10,25"></polygon>
                    <polygon points="0,50 10,40"></polygon>
                    <polygon points="50,0 40,10"></polygon>
                    <polygon points="50,25 40,25"></polygon>
                    <polygon points="50,50 40,40"></polygon>
                </svg>
            </label> 
        </NavLink>
    </aside>
    </>
    )
};

export default Aside;