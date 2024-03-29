import { CiTrash } from "react-icons/ci";
import style from "./index.module.css"

const DeleteTrash = ({handleClick, size}) => {

    return(
        <CiTrash className={`${style.color}`}  onClick={handleClick} size={size}/>
    )
}

export default DeleteTrash;