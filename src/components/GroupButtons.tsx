import React from "react";

type Status = {
  label: string;
  value: string;
};

interface Props {
  status: string;
  setStatus: (status: string) => void;
  statues: Status[];
}

const GroupButtons = ({ statues, setStatus, status }: Props) => {
  return (
    <>
      <div className="row mb-3">
        <div className="btn-group" role="group" aria-label="Basic example">
          {statues.map((item, key) => (
            <button
              key={key}
              onClick={() => setStatus(item.value)}
              type="button"
              className={`btn btn-${
                status !== item.value ? "secondary" : "success"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default GroupButtons;
