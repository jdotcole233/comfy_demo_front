import React, { useState, useEffect, Fragment } from "react";
import {} from "../../../components";
import SingleFunctionality from "./SingleFunctionality";

const SettingsCard = ({
  active,
  name,
  functionalities,
  icon = "bx bx-home",
  setPrivileges,
}) => {
  const [state, setState] = useState(false);
  const [showFunctionalities, setShowFunctionalities] = useState(false);
  //   const [selectedFuntions, setSelectedFuntions] = useState([]);

  useEffect(() => {
    if (active) {
      setState(active);
    }
  }, [active]);

  // const handleOnChange = (func) => {
  // const _a = selectedFuntions
  // const funcs = Array.from(new Set([...selectedFuntions, func]));
  // alert(JSON.stringify(funcs))
  // setSelectedFuntions(funcs);
  // };

  //   const handleRemove = (func) => {
  //     // const _a = selectedFuntions
  //     const funcs = Array.from(
  //       new Set([...selectedFuntions.filter((el) => el !== func)])
  //     );

  //     // alert(JSON.stringify(funcs))
  //     setSelectedFuntions(funcs);
  //   };

  const chooseThis = () => {
    setPrivileges && setPrivileges((prev) => [...prev, name]);
    setState(true);
  };

  const unChooseThis = () => {
    setPrivileges && setPrivileges((prev) => prev.filter((el) => el !== name));
    setState(false);
  };

  return (
    <Fragment>
      <div
        style={{
          width: "100%",
          padding: 10,
          border: "0.5px solid #4E5283",
          //   borderRadius: 12,
          // display: "flex",
          margin: 10,
        }}
      >
        <div className="row">
          <div className="col-md-10  d-flex align-items-center">
            <div className="col-md-2">
              <span
                style={{ fontSize: 40, margin: 10 }}
                className={`${icon}`}
              ></span>
            </div>
            <div className="col-md-10">
              <h3 className="font-size-16">{name}</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa
                quaerat iste repudiandae autem magnam illo quo animi labore
                voluptates hic nulla pariatur ullam quidem, ut alias inventore,
                voluptate vitae sint.
              </p>
            </div>
          </div>
          <div
            className="col-md-2 d-flex row align-items-center justify-content-end"
            onClick={state ? unChooseThis : chooseThis}
          >
            {state && (
              <span
                style={{ fontSize: 30 }}
                className="bx bxs-check-circle text-primary"
              ></span>
            )}
            {!state && (
              <span
                style={{ fontSize: 30 }}
                className="bx bx-radio-circle text-primary"
              ></span>
            )}
          </div>
        </div>
        <div style={{ padding: 10 }} className="container-fluid">
          <div className="row d-flex justify-content-between align-items-center pl-3 pr-3">
            <h3 className="font-size-14">Functionalities</h3>
            <span
              onClick={() => setShowFunctionalities((c) => !c)}
              style={{ fontSize: 16 }}
              className={`bx bx-caret-${
                showFunctionalities ? "up" : "down"
              } pointer`}
            ></span>
          </div>
          {showFunctionalities && (
            <div>
              {functionalities.map((func, id) => (
                <SingleFunctionality selected={true} name={func} key={id} />
              ))}
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default SettingsCard;
