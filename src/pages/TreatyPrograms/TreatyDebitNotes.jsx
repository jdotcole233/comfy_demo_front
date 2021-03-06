import React from "react";
import Note from "../Insurers/components/Note";

export const mergeTwoArrays = (limits, surpluses) => {
  const data = [
    ...surpluses.map((el, id) => ({
      ...el,
      ...limits.find((ll) => ll.surpulus_uuid === el.surpulus_uuid)
    })),
  ];
  return data;
};

const TreatyDebitNotes = ({ notes, treaty_id, treaty, isProp }) => {
  return !isProp ? null : (
    <div className="row">
      {notes?.map((note, key) => (
        <Note
          treaty={treaty}
          treaty_id={treaty_id}
          key={key}
          note={note}
          surpluses={mergeTwoArrays(
            JSON.parse(treaty?.layer_limit ?? "[]"),
            note?.treaty_account_deduction
          )}
        />
      ))}
    </div>
  );
};

export default TreatyDebitNotes;
