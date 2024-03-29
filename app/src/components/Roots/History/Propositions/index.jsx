import './Proposition.css'

import { FaCheck } from 'react-icons/fa6'
import { MdCancel } from 'react-icons/md'
import { IoCartOutline } from 'react-icons/io5'
import { NavLink } from 'react-router-dom'
import FavoriteStar from '../../../Layout/UXElements/icons/FavoriteStar'
import FavoriteStarOutline from '../../../Layout/UXElements/icons/FavoriteStarOutline'
import { useSelector } from 'react-redux';
import Proposition from '../../../Layout/UXElements/components/Proposition';


const Propositions = ({history}) => {
    const {favorites} = useSelector((state) => state.favorites);

    return(
        <>
            <ul className="ulContainer">
                {history.propositions.map((proposition, index) => {
                    return(
                            <Proposition key={index} history={true} proposition={proposition}/>
                    )
                })}
            </ul>
        </>
    )
}
               

export default Propositions;