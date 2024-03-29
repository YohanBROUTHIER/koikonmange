import { useRef, useState } from "react";
import store from "../../../../store";
import { useSelector } from "react-redux";
import Select from 'react-select';
import { FaPlus } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa6";
import { MdCancel } from "react-icons/md";
import types from "../../../../store/reducers/types";



const ModalCreatingRecipe = ({setModeCreator}) => {

    const {favorites} = useSelector((state) => state.favorites);
    const {hunger} = useSelector((state) => state.filters.filters);
    const [steps, setStep] = useState(['']);
    const [ingredients, setIngredient] = useState(['']);
    const inputImageElement = useRef()

    const options = [
        {value:hunger[0].name, label:hunger[0].name},
        {value:hunger[2].name, label:hunger[2].name},
    ]
    
    const handleSubmitCreation = (event) => {
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
            } else {
                dataForm[name] = value;
            }
        }
        const length = favorites.length;
        const favorite = {...dataForm, id:length +1}
        store.dispatch({type:types.SET_FAVORITES, payload:[...favorites, favorite]})
    }

    const handleClickAddStep = () => {
        setStep([...steps, '']);
    }

    const handleClickDeleteStep = (event) => {
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
        setModeCreator((current) => !current) 
    }

    const handleClickAddImage = () => (
        inputImageElement.current.click()
    )

    
    return(
        <div className="backdrop">
            <form className="section__recipe modal" onSubmit={handleSubmitCreation}>
                <input className="section-recipe__name" name="name" type="text" placeholder="Name"/>
                    <div className="section-recipe__top">
                        <div>
                            <div className="section-recipe__field"> <label>Preparation :</label> <input name="preparating_time" type="number"/> </div>
                            <div className="section-recipe__field">
                                <label>Faim</label> 
                                <Select className="section-recipe-field__select" options={options} name="hunger"/>
                            </div>
                        </div>
                        
                            <figure  method="" action="" className="section-recipe__figure" onClick={handleClickAddImage}>
                                <figcaption></figcaption>
                                    <input ref={(inputImageElement)} className="file" type="file" accept=".txt, .csv" hidden />
                            </figure>
                    </div>

                    <div className="section-recipe__field"> Etapes: <FaPlus onClick={handleClickAddStep}/></div>
                    <ul>
                        {steps.map((element, index) => {
                            return(
                                <li key={index}>
                                    <div>
                                        <p>Etape : {index+1}</p>
                                        <div><MdCancel  size={12} onClick={handleClickDeleteStep}/></div>
                                    </div>
                                    <div>
                                        <textarea name={`step${index}`} />
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
                                <div><MdCancel  size={12} onClick={handleClickDeleteIngredients}/></div>
                                <input name={`ingredients${index}`} type="text" />
                                
                            </li>
                        )
                    })}      
                </ul>

                <div className="section-recipe__bottom">
                    <button><FaCheck/></button>
                    <MdCancel onClick={cancelCreationRecipe}/>
                </div>


                </form>
        </div>
    )
}

export default ModalCreatingRecipe;