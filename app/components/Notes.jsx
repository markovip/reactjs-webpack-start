import React from "react";
import Editable from "./Editable.jsx";

export default ({notes, onValueClick, onEdit, onDelete}) => {
  return (
    <ul className="notes">{notes.map((note) => {
      return (
        <li className="note" key={note.id}>
          <Editable editing={note.editing} value={note.value} onValueClick={onValueClick.bind(null, note.id)} onEdit={onEdit.bind(null, note.id)} onDelete={onDelete.bind(null, note.id)}/>
        </li>
      );
    })}
    </ul>
  );
}