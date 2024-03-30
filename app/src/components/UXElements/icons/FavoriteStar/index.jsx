import { IoStarSharp } from "react-icons/io5";
import { IoStarOutline } from "react-icons/io5";


const FavoriteStar = ({handleClick}) => {

    return(
        <IoStarSharp className="starFavorite" onClick={handleClick}/>
    )
}

export default FavoriteStar;