import { MdCancel } from "react-icons/md";
import store from "../../../../../store";
import { useDispatch, useSelector } from "react-redux";

// import style '../Aside.module.css';


const OptionChosen = ({choosen,stateName}) => {

  const dispatch = useDispatch()
  const stateBranch = useSelector((state) => state[stateName]);
  const choices = stateBranch[`${stateName}Choices`];
  const handleClickOption = () => {
    const newArray = choices.filter((element) => element !== choosen);
    dispatch({type:`SET_${stateName.toUpperCase()}_CHOICES`, payload:newArray})
  }

    return(
        <li className="optionChosen">
          <p>{choosen[1]}</p>
          <MdCancel className="optionChosen__cancel" size={10} onClick={handleClickOption}/>
        </li>
    )

}

export default OptionChosen;