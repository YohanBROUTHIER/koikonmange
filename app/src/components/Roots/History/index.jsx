import Proposition from "./Propositions";

import './History.css'
import { IoCartOutline } from "react-icons/io5";
import { HistoryApi } from "../../../api";
import DeleteTrash from "../../Layout/UXElements/icons/DeleteTrash";
import { useDispatch, useSelector } from "react-redux";
import types from "../../../store/reducers/types";
import { NavLink } from "react-router-dom";

const History = () => {
    
    const {history} = useSelector((state) => state.history)
    const dispatch = useDispatch();

    const handleDelete = async (event) => {
        
        const liParentElement = event.target.closest("li");
        const historyId = liParentElement.dataset.id;
        await HistoryApi.delete(historyId);
        dispatch({type:types.SET_HISTORY, payload: await HistoryApi.getAll()})
    }


    return (
        <main className="outlet">
            <section className="section">
                <h2>Historique</h2>
                    {history.length > 0?
                        history.map((history, index) => {
                            <ul className="section__ulContainer">
                                    return(
                                        <li data-id={history.historyid} key={index} className="section-ulContainer__li">
                                            <div>
                                                <span>
                                                    <p>{history.date}</p>
                                                    <IoCartOutline className="section-ulContainer-li--cartShopping" size={16}/>
                                                </span>
                                                <DeleteTrash handleClick={handleDelete}/>
                                            </div>
                                            
                                            <Proposition history={history}/>
                                            
                                        </li>
                                    )
                            </ul>
                        })
                    :
                        <p style={{fontFamily: "Poppins, sans-serif"}}>Aucun historique, génère des idées de repas <NavLink style={{color: "var(--colorOrange)", textDecoration:"underline"}}>ici</NavLink>.</p>
                    }
                    
            </section>
        </main>
    )
}

export default History;