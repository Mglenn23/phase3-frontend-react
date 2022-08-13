import React from "react";

function ListCard({ id, card_name, card_attack, card_defense, user_id, user_name, type_id, type_name, handlerButtonEdit }) {
  function handlerClickEdit(e) {
    e.preventDefault();
    handlerButtonEdit({ id, card_name, card_attack, card_defense, type_id, user_id, user_name });
  }

  return (
    <>
      <tr>
        <td>{id}</td>
        <td>{card_name}</td>
        <td>{card_attack}</td>
        <td>{card_defense}</td>
        <td>{type_name}</td>
        <td>
          <button className="editButton" onClick={handlerClickEdit}>
            Edit
          </button>
        </td>
      </tr>
    </>
  );
}
export default ListCard;
