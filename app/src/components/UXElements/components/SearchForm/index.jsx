import { Form } from "react-router-dom";
import style from './style.module.css'
import { useRef, useState } from "react";



const SearchForm = ({handleChangeSearch}) => {

    const [isChecked, setIsChecked] = useState(false);

    const inputSearchElement = useRef()

    const handleClick = () => {
        setIsChecked(prevChecked => !prevChecked);
        if (!isChecked) {
            inputSearchElement.current.style.border = "none"
        } else {
            inputSearchElement.current.style.borderBottom = "1px black solid"
        }
    };

    return(
        <Form className="section-divForm__Form" action="">
            <fieldset>
                <div className={style.container}>
                    <input onClick={handleClick} defaultChecked={isChecked} className={style.checkbox} type="checkbox" id="searchedRecipes" aria-label="checkbox to open search"/> 
                    
                    <div className={style.mainbox}>
                        <div className={style.iconContainer}>
                            <svg viewBox="0 0 512 512" height="1em" xmlns="http://www.w3.org/2000/svg" className={style.search_icon}><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"></path></svg>
                        </div>
                        <input ref={inputSearchElement} className={style.search_input} placeholder="Rechercher" type="search" onChange={handleChangeSearch} aria-label="search into recipes list"/>
                    </div>
                </div>
            </fieldset>

        </Form>
    )
}

export default SearchForm;