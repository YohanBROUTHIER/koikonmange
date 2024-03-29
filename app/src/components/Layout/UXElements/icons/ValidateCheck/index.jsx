import { CiCircleCheck } from "react-icons/ci";
import { IoCheckmarkCircle } from "react-icons/io5";


import style from "./index.module.css"

const ValidateCheck = ({handleClick, size}) => {

    return(
        <CiCircleCheck className={`${style.color} ${style.size}`} onClick={handleClick} size={size}/>
    )
}

export default ValidateCheck;