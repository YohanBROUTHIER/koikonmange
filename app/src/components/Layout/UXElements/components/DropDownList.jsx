import { useState } from "react";

import { MdKeyboardArrowDown } from "react-icons/md";
import Tag from "./Tag";

export default function DropDownList({itemName, items, choosenItems=[], isOpen, openHandler, closeHandler, toggleItemHandler}) {
  // itemsName = Ingredients
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchValue, setsearchValue] = useState();

  function handleChangeSearch(event) {
    setsearchValue(event.target.value.toLocaleLowerCase())
    const newFilteredItems = items.filter((element) => element.name.toLowerCase().includes(event.target.value.toLocaleLowerCase()));
    setFilteredItems(newFilteredItems);
  }
  
  return (
    
    <div className="dropDownListContainer" onClick={openHandler}>
      <div className="dropDownListSearchContainer">
      {/* <span>{itemName}</span> */}
        {isOpen ?
          <input className="dropDownListSearch" type="search" placeholder="Rechercher" value={searchValue} onChange={handleChangeSearch}/>
          :
          ""
          // <span>{itemName}</span>
        }
        {choosenItems &&
          <input type="hidden" name={itemName.toLocaleLowerCase()} defaultValue={choosenItems.map((element) => element.id).join("-") }/>
        }
        <button type="button" onClick={closeHandler}><MdKeyboardArrowDown className='arrowSoValue'/></button>

      </div>
      {isOpen && <>
        {choosenItems.length > 0 &&
          <ul className="choosenItemsContainer">
            {choosenItems.map(item =>(
              <li key={item.id}><Tag itemName={itemName} item={item} removeHandler={toggleItemHandler}/></li>
            ))}
          </ul>
        }
        <ul className="itemsListContainer">
          {!!searchValue && filteredItems.length === 0 &&
            <li>Aucun élément trouvé.</li>
          }
          {!!searchValue && filteredItems.length !== 0 &&
            filteredItems.map(item =>(
              <li key={`${itemName} ${item.id}`} data-item-id={`${itemName}-${item.id}`} onClick={toggleItemHandler}>{item.name}</li>
            ))
          }
          {!searchValue &&
            items.map(item =>(
              <li key={`${itemName} ${item.id}`} data-item-id={`${itemName}-${item.id}`} onClick={toggleItemHandler}>{item.name}</li>
            ))
          }
        </ul>
      </>}
    </div>
    
  
  );
}