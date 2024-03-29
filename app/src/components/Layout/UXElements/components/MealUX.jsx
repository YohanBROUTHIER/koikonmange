

import { FaPlus } from "react-icons/fa6";
import { MdCancel } from "react-icons/md";
import store from "../../../../store";
import { useSelector } from "react-redux";
import { FaCheck } from "react-icons/fa6";
import { useState } from "react";

import { useRef } from "react";


const Meal = ({meal, hungryState, handleChange, handleClickDelete}) => {

    const [updateMode, setUpdateMode] = useState();
    const inputElement = useRef();

    

    const handleClickUpdate = (event) => {
        inputElement.current.removeAttribute("disabled");
        setUpdateMode(true)
    }

    const handleClickValidate = () => {
        inputElement.current.setAttribute("disabled", "");
        setUpdateMode(false)
    }

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            inputElement.current.setAttribute("disabled", "");
            setUpdateMode(false)
          }
    }

    return(
        <article  className="section__article"> 
            <input ref={inputElement} type="text" value={meal.name} disabled onChange={handleChange} onKeyDown={handleKeyPress}/>
            <div>
                {updateMode?
                    <FaCheck onClick={handleClickValidate}/>
                    :
                    <FaPlus onClick={handleClickUpdate}/> 
                }
                <MdCancel onClick={handleClickDelete}/>
            </div>
        </article>
    )
}

export default Meal;