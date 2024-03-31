import { useState } from "react";

import { iconesPath } from "../../utils/index.js";
import Tag from "./tag";

import style from "./dropDownList.module.css";

export default function DropDownList({itemName, items, choosenItems=[], isOpen, openHandler, closeHandler, toggleItemHandler}) {
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchValue, setsearchValue] = useState();

  if (!isOpen) {
    return (
      <>
        <button className={style.svgButton} type="button" onClick={openHandler}><img src={iconesPath.plus}/></button>
        {choosenItems &&
          <input type="hidden" name={itemName} defaultValue={choosenItems.map((element) => element.id).join("-") }/>
        }
      </>
    );
  }

  function handleChangeSearch(event) {
    setsearchValue(event.target.value.toLocaleLowerCase());
    const newFilteredItems = items.filter((element) => element.name.toLowerCase().includes(event.target.value.toLocaleLowerCase()));
    setFilteredItems(newFilteredItems);
  }
  
  function toggleItem(itemName, id) {
    return (() => toggleItemHandler(itemName, id));
  }

  return (
    <div className={style.container}>
      <button className={style.svgButton} type="button" onClick={closeHandler}><img src={iconesPath.minus}/></button>
      <div className={style.menu} onClick={openHandler}>
        <input type="search" placeholder="Rechercher" value={searchValue} onChange={handleChangeSearch}/>
        {choosenItems &&
          <input type="hidden" name={itemName} defaultValue={choosenItems.map((element) => element.id).join("-") }/>
        }
        <ul className={style.list}>
          {choosenItems.length > 0 && choosenItems.map(item =>(
            <li key={item.id}><Tag itemName={itemName} item={item} removeHandler={toggleItemHandler}/></li>
          ))}
        </ul>
        <ul className={[style.list, style.vertical].join(" ")}>
          {!!searchValue && filteredItems.length === 0 &&
            <li>Aucun élément trouvé.</li>
          }
          {!!searchValue && filteredItems.length !== 0 &&
            filteredItems.map(item =>(
              <li key={`${itemName} ${item.id}`} onClick={toggleItem(itemName, item.id)}>{item.name}</li>
            ))
          }
          {!searchValue &&
            items.map(item =>(
              <li key={`${itemName} ${item.id}`} onClick={toggleItem(itemName, item.id)}>{item.name}</li>
            ))
          }
        </ul>
      </div>
    </div>
  );
}