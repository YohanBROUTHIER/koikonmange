import { CiCircleRemove } from "react-icons/ci";
import style from "./index.module.css"

const DeleteCruse = ({handleClick, size}) => {

    return(
        <CiCircleRemove className={`${style.color}`}  onClick={handleClick} size={size}/>
    )
}

export default DeleteCruse;