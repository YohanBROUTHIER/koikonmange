import { CiSquarePlus } from "react-icons/ci";
import { FaPlusSquare } from "react-icons/fa";
import style from './index.module.css'

const AddPlus = ({handleClick}) => {

    return(
        <FaPlusSquare className={`${style.color}`} size={25} onClick={handleClick}/>
    )
}

export default AddPlus;