import store from "../../../store";
import types from "../../../store/reducers/types";


export function homeLoader(){

    store.dispatch({type:types.SET_IS_ASIDE_FALSE});
    
    return null;
}