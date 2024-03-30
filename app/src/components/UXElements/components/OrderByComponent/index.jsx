import { useRef, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaArrowsRotate } from "react-icons/fa6";
import { Form, useSearchParams } from "react-router-dom";
import './OrderBy.css';

import { useNavigate } from 'react-router-dom';


const OrderByComponent = () => {
    
    const [searchParams, setSearchParams] = useSearchParams();

    const [isVisible, setIsVisible] = useState(false)
    const fieldsetOrderByUl = useRef();
    const navigate = useNavigate();

    const [varOrderBy, setVarOrderBy] = useState([
        { position: 1, title: "name", label: "Nom", ascState: true, selected:false },
        { position: 2, title: "time", label: "Temps", ascState: true, selected:false },
        { position: 3, title: "hunger", label: "Faim", ascState: true, selected:false }
    ]);

    const handleClickOrderBy = () => {
        setIsVisible(!isVisible)
        if (!isVisible) {
            fieldsetOrderByUl.current.style.transform = `translateX(-150%)`;
        } else {
            fieldsetOrderByUl.current.style.transform = `translateX(+150%)`;
        }
    }

    
    const handleClickOrderByChoice = (event) => {
        const liParentElement = event.target.closest("li");
        const dataset = liParentElement.dataset.label;
      
        liParentElement.classList.toggle("selectedOrderBy")

        const findObjectClicked = varOrderBy.find((object) => object.label === dataset);
        
        if (findObjectClicked) {
                const foundIndex = varOrderBy.findIndex((option) => (option.label === findObjectClicked.label))
                const updatedpArrayVar = [...varOrderBy];
                updatedpArrayVar[foundIndex] = {...updatedpArrayVar[foundIndex], selected:!updatedpArrayVar[foundIndex].selected}
                setVarOrderBy(updatedpArrayVar);
            }
    }
 
    const setAscFunction = (event) => {
        const liParentElement = event.target.closest("li");
        const dataset = liParentElement.dataset.label;
        const foundOption = varOrderBy.find((option) => option.label === dataset);
        if (foundOption) {
                const foundIndex = varOrderBy.findIndex((option) => (option.label === foundOption.label))
                const updatedpArrayVar = [...varOrderBy];
                updatedpArrayVar[foundIndex] = {...updatedpArrayVar[foundIndex], ascState:!updatedpArrayVar[foundIndex].ascState}
                setVarOrderBy(updatedpArrayVar);
        }
        
    }


    const handleSubmitSort = (event) => {
        event.preventDefault();
        // on crée une copie des params de l'url actuelle
        const params = new URLSearchParams(searchParams.toString());

        const paramsToDelete = [];

        // on ajoute dans le array à supprimer les params de l'url commençant par orderBy
        for (const key of params.keys()) {
            if (key.startsWith("orderBy")) {
                paramsToDelete.push(key);
            }
        }

        // on supprime les paramètres ajoutés
        for (const key of paramsToDelete) {
            params.delete(key);
        }

        // on récupère les nouvelles données du form
        const formData = new FormData(event.target);
        // on les ré insère dans l'url
        for (const [key, value] of formData.entries()) {
            params.set(key, value);
        }
        // on met à jour l'url
        setSearchParams(params.toString());
        // on navigue sur vers la nouvelle url avec les params à jour
        navigate(`?${params.toString()}`, { replace: true });
       
    }



    const draggItem = useRef();
    const draggOverItem = useRef();

    const handleSort = () => {
        let orderByItems = [...varOrderBy];
        const draggedItemContent = orderByItems.splice(draggItem.current, 1)[0];
        orderByItems.splice(draggOverItem.current, 0, draggedItemContent);
        draggItem.current = null
        draggItem.current = null
        setVarOrderBy(orderByItems);
    }

    
    

    return(
        <Form  onSubmit={handleSubmitSort}>
            <fieldset className="fieldsetOrderBy">

                <ul>
                    {varOrderBy.map((option, index) => {
                        if (option.selected) {
                            return(
                                <input key={index} name={`orderBy${option.title}`} value={option.ascState?"ASC":"DESC"} type="hidden"/>
                            )
                        } else {
                            return null
                        }
                    })}
                </ul>

                <legend>
                    <button className="buttonOrderBy" type="button" aria-label="Open and close button to sort recipes">
                        
                        <label className="hamburger" htmlFor="humburgerOrderBy">
                            <input type="checkbox" id="humburgerOrderBy"/>
                            <svg viewBox="0 0 32 32" onClick={handleClickOrderBy}>
                                <path className="line line-top-bottom" d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"></path>
                                <path className="line" d="M7 16 27 16"></path>
                            </svg>
                            </label>
                    </button>
                </legend>
                
                    <ul ref={fieldsetOrderByUl} className='fieldsetOrderBy__ulContainer'>
                        {varOrderBy.map((element, index) => {
                            return(
                                    <li data-label={element.label} key={index} className={element.label} draggable 
                                    onDragStart={() => draggItem.current=index}
                                    onDragEnter={() => draggOverItem.current= index}
                                    onDragEnd={handleSort}
                                    onDragOver={(e) => e.preventDefault() }
                                    >
                                        <RxHamburgerMenu size={15}/>
                                        <div className={element.label} onClick={handleClickOrderByChoice}>
                                            <p className="tag">{element.label}</p> <p className="ascOrderBy"> {element.ascState?"Croissant":"Décroissant"}</p>
                                        </div>
                                        <FaArrowsRotate className="sizeIconsOrderBy" onClick={setAscFunction}/>
                                        
                                    </li> 

                            )
                            
                        })}
                        <button className="btnValidate" aria-label="button to sort">Trier</button>
                    </ul> 
              
            </fieldset>    
        </Form>  
    )
}

export default OrderByComponent;