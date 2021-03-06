/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { Datatable } from "../../../components";
import { associatesColumns } from "../columns";
import _ from "lodash";

const EffectedWithListingAssociates = ({
  activeLayer,
  setLayer,
  treaty = {},
  layers = [],
  associates = [],
}) => {
  const [toggle, setToggle] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(1);
  const data = _.mapValues(_.groupBy(associates, "layer_number"), (list) =>
    list.map((item) => _.omit(item, "layer_number"))
  );
  const actualLayers = Object.keys(data);
  useEffect(() => {
    if (activeLayer) {
      setCurrentIndex(activeLayer);
    }
  }, [activeLayer]);

  const changeLayer = (key) => {
    setCurrentIndex(key);
    setLayer && setLayer(key);
  };

  return (
    <>
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="col-md-12 d-flex justify-content-between card-body">
              <span className="card-title">
                Effected with (Reinsurer Associates)
              </span>
              <button
                onClick={() => setToggle((prev) => !prev)}
                className="btn"
              >
                {toggle ? "Collapse" : "Expand"}
              </button>
            </div>
            {toggle && (
              <div className="card-body">
                <ul className="nav nav-tabs nav-tabs-custom">
                  {treaty?.treaty_program?.treaty_type === "NONPROPORTIONAL" &&
                    actualLayers.map((_, key) => (
                      <li
                        key={key}
                        onClick={() => changeLayer(parseInt(_))}
                        className="nav-item btn"
                      >
                        <div
                          className={`nav-link ${parseInt(_) === currentIndex ? "active" : ""
                            }`}
                          href="#"
                        >{`Layer ${_}`}</div>
                      </li>
                    ))}
                </ul>

                <div className="mt-4">
                  <Datatable
                    columns={associatesColumns}
                    data={
                      treaty?.treaty_program?.treaty_type === "NONPROPORTIONAL"
                        ? data[`${currentIndex}`]
                        : associates
                    }
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default EffectedWithListingAssociates;
