
import { IoStarOutline } from "react-icons/io5";


const FavoriteStarOutline = ({handleClick}) => {

    return(
        <IoStarOutline className="starFavorite" onClick={handleClick}/>
    )
}

export default FavoriteStarOutline;