import { useRef, useState } from "react";
import store from "../../../../store";
import { useSelector } from "react-redux";
import Select from 'react-select';
import { FaPlus } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa6";
import { MdCancel } from "react-icons/md";


const ModalUpdatingRecipe = ({meal, setUpdateMode}) => {

    const {favorites} = useSelector((state) => state.favorites);
    const hungerBigName = useSelector((state) => state.criterias.criterias[1].name);
    const hungerFewName = useSelector((state) => state.criterias.criterias[2].name);
    const [mealValue, setMealValue] = useState(meal);
    const [steps, setStep] = useState(mealValue.steps);
    const [ingredients, setIngredient] = useState(mealValue.ingredients);
    const selectElement = useRef() 

    const options = [
        {value:hungerBigName, label:hungerBigName},
        {value:hungerFewName, label:hungerFewName},
    ]

    const customStyles = {
        option: (provided, state) => ({
          ...provided,
        //   width: state.isSelected ? 'fit-content' : 'fit-content',
          padding:'0.2rem',
          fontSize:'0.8rem'
          // Autres styles personnalisés ici
        }),
        control: (provided) => ({
            ...provided,
            width:'fit-content',
            fontSize:'0.8rem',
            border: '0.1rem solid', // Bordure de 2px solide bleue pour le conteneur du Select
            borderRadius: '0.3rem', // Coins arrondis avec un rayon de 8px
            boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)', // Ombre légère autour du conteneur
            padding:'0rem',
            margin:'0rem'
          }),
          indicatorsContainer: (provided) => ({
            ...provided,
            color: 'red', // Couleur du texte
            fontSize:"1.2rem",
            padding:'0rem'
            // Autres styles personnalisés selon vos préférences
          }),
          dropdownIndicator: (provided) => ({
            ...provided,
            padding: '0px', // Espacement interne de la div
            // Autres styles personnalisés selon vos préférences
          }),

      };
    
    const handleSubmitUpdate = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const dataForm = {};
        for (const [name, value] of formData.entries()) {
            if (name.startsWith('step')) {
                if (!dataForm.steps) {
                    dataForm.steps = [value];
                } else {
                    dataForm.steps.push(value);
                }
            } else if (name.startsWith('ingredient')) {
                if (!dataForm.ingredients) {
                    dataForm.ingredients = [value];
                } else {
                    dataForm.ingredients.push(value);
                }
            } else {
                dataForm[name] = value;
            }
            
        }
        const favorite = {...dataForm, id:mealValue.id};
        const copyIngegredients = [...ingredients];
        if (favorite.ingredients) {
            favorite.ingredients = copyIngegredients;
        }
        const updatedFavorites = [...favorites];
        const foundFavorite = updatedFavorites.findIndex((element) => element.id === favorite.id)
        updatedFavorites[foundFavorite] = favorite
        store.dispatch({type:"SET_FAVORITES", payload:updatedFavorites})
        cancelCreationRecipe()
    }

    const handleClickAddStepp = () => {
        setStep([...steps, '']);
    }

    const handleClickDeleteStepp = (event) => {
        const textContentStep = event.target.closest("li").outerText;
        const index = parseInt(textContentStep.slice(-1)) - 1;
        const arrayStep = [...steps];
        arrayStep.splice(index, 1);
        setStep(arrayStep);
    }

    const handleClickAddIngredient = () => {
        setIngredient([...ingredients, '']);
    }

    const handleClickDeleteIngredients = (event) => {
        
        const liParentElement = event.target.closest("li");
        const inputIngredientElement = liParentElement.querySelector("input")
        const index = parseInt(inputIngredientElement.name.slice(-1));
        const arrayIngredients = [...ingredients]
        arrayIngredients.splice(index, 1)
        setIngredient(arrayIngredients)
    }

    const cancelCreationRecipe = () => {
        setUpdateMode((current) => !current)
    }

    const handleChangeValue = (event) => {


        const { name, value } = event.target;
        if (!event.target.name.includes("step")) {
            setMealValue(currentMeal => ({...currentMeal, [name]: value }));
         
        } else {
            const index = parseInt(name.slice(-1));
            setStep(prevSteps => {
                    const updatedSteps = [...prevSteps];
                    updatedSteps[index] = value;
                    return updatedSteps;
                })
        }
    }

    const handleChangeValueSelect = (selectedOption) => {
       
        const value = selectedOption.value;
        setMealValue(currentMeal => ({...currentMeal, hunger: value }));
    }
    

    return(
        <div className="backdrop">
            <form className="section__recipe modal" onSubmit={handleSubmitUpdate}>
                    <input className="section-recipe__name" name="name" type="text" value={mealValue.name} onChange={handleChangeValue}/>
                    <div className="section-recipe__top">
                        <div>
                            <div className="section-recipe__field"> <label>Preparation :</label> <input name="preparating_time" type="number" value={mealValue.preparating_time} onChange={handleChangeValue}/> </div>
                            <div className="section-recipe__field">
                                <label>Faim</label> 
                                <Select styles={customStyles} className="section-recipe-field__select" ref={selectElement} options={options} name="hunger" defaultValue={{ label:mealValue.hunger, value: mealValue.hunger}} onChange={handleChangeValueSelect}/>
                            </div>
                        </div>
                        <figure>
                            <img src="/tartiflete.jpg" alt="" />
                            <figcaption>{mealValue.name}</figcaption>
                        </figure>

                    </div>


                        <div className="section-recipe__field"> <p>Etapes :</p> <FaPlus onClick={handleClickAddStepp}/></div>
                        <ul>
                        {steps.map((element, index) => {
                            return(
                                <li key={index}>
                                    {/* <input name={`steps${index}`} type="text" value={steps[index]} onChange={handleChangeValue}/> */}
                                    <div>
                                        <p>Etape {index+1}</p>
                                        <div><MdCancel onClick={handleClickDeleteStepp} size={12}/></div>
                                    </div>

                                    <div>
                                        <textarea name={`steps${index}`} value={steps[index]} onChange={handleChangeValue}/>
                                    </div>
                                </li>
                            )
                        })}      
                        </ul>
                        <div className="section-recipe__field"> <p>Ingredients :</p> <FaPlus onClick={handleClickAddIngredient}/></div>
                        <ul className="section-recipe__field--ingredientsContainer">
                        {ingredients.map((element, index) => {
                            return(
                                <li key={index}>
                                    <div><MdCancel onClick={handleClickDeleteIngredients} size={12}/></div>
                                    <input name={`ingredients${index}`} type="text" value={ingredients[index].name} onChange={handleChangeValue}/>
                                    <img src={ingredients[index].image} alt="" />
                                </li>
                            )
                        })}      
                        </ul>
                        {/* <MdCancel className="test" onClick={cancelCreationRecipe}/> */}
                        <div className="section-recipe__bottom">
                            <button><FaCheck/></button>
                            <div><MdCancel onClick={cancelCreationRecipe}/></div>
                        </div>
                        
                        
                    </form>
        </div>
    )
}

export default ModalUpdatingRecipe;