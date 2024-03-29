import { MdCancel } from "react-icons/md";

export default function Tag({itemName, item, removeHandler}) {
  return (
    <div className="tagChoosenItem">
      <input name="test" type="hidden"/>
      <span>{item.name}</span>
      <button type="button" onClick={removeHandler} data-item-id={`${itemName}-${item.id}`}><MdCancel size={10} /></button>
    </div>
  );
}