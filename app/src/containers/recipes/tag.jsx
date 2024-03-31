import style from "./tag.module.css";

import { iconesPath } from "../../utils/index.js";

export default function Tag({itemName, item, removeHandler}) {
  function removeItem() {
    removeHandler(itemName, item.id);
  }
  return (
    <button className={style.tag} type="button" onClick={removeItem} >
      {item.name}
      <img src={iconesPath.cross}/>
    </button>
  );
}