import { HistoryApi } from "../../../api";
import store from "../../../store";
import types from "../../../store/reducers/types";


export async function historyLoader(){

    store.dispatch({type:types.SET_IS_ASIDE_FALSE});
    
    store.dispatch({type:types.SET_HISTORY, payload:await HistoryApi.getAll()})
    
    return null
}