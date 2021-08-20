/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import { Datatable, Drawer } from "../../../components";
import { reinsurersColumns } from "../columns";
import UpdateDeductions from "./UpdateDeductions";
import _ from "lodash";
import PortfolioStatment from "./PortfolioStatment";
import UpdatePortfolioStatment from "./UpdatePortfolioStatment";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";

function EffectedWithListing({
  activeLayer,
  setLayer,
  treaty = {},
  remainingPercentage = [],
  reinsurers = [],
  layers = [],
}) {
  const [showDeductionDrawer, setShowDeductionDrawer] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(1);
  const toggle = () => setShowDeductionDrawer((prev) => !prev);
  const isNonProp = treaty?.treaty_program?.treaty_type === "NONPROPORTIONAL";

  const data = _.mapValues(_.groupBy(reinsurers, "layer_number"), (list) =>
    list.map((item) => _.omit(item, "layer_number"))
  );

  const actualLayers = Object.keys(data);

  /**
   *
   * display by tabs if the treaty is nonproportioanl
   * but just display the list if the type is proportional
   */

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
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <h4 className="card-title mb-4">Effected with(Reinsurers)</h4>
                <div className="">
                  {!isNonProp && (
                    <PortfolioStatment
                      id={
                        treaty?.treaty_proportional_detail
                          ?.treaty_proportional_detail_id
                      }
                      size={treaty?.treaty_accounts?.length}
                    />
                  )}
                  <button
                    disabled={!treaty?.treaty_participants?.length}
                    onClick={toggle}
                    className="btn btn-sm w-md ml-2 btn-warning"
                    title="This button allows you to specify deductions specific to reinsurers participating on this treaty"
                  >
                    Modify Deductions
                  </button>
                </div>
              </div>
              {treaty?.treaty_accounts?.length > 3 && (
                <div className="border mb-3">
                  <div className="alert alert-success">
                    <span>
                      Found Portfolio statement for{" "}
                      {new Date(
                        treaty?.treaty_proportional_detail?.created_at
                      ).toDateString()}{" "}
                      below
                    </span>
                  </div>
                  <table className="table tab">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Overall Gross Premium</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          {new Date(
                            treaty?.treaty_proportional_detail?.created_at
                          ).toDateString()}
                        </td>
                        <td>
                          {
                            treaty?.treaty_proportional_detail
                              ?.overall_gross_premium
                          }
                        </td>
                        <td>
                          <UpdatePortfolioStatment
                            detail={treaty?.treaty_proportional_detail}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
              <div className="d-flex flex-row align-items-center mb-2 justify-content-between">
                <h5
                  style={{
                    fontSize: 12,
                    color:
                      remainingPercentage[currentIndex] > 0
                        ? "#DB5461"
                        : "#F46A6A",
                  }}
                >
                  Current Quota: {remainingPercentage[currentIndex]}%
                </h5>
                <div style={{ width: 80, height: 80 }}>
                  <CircularProgressbarWithChildren
                    value={remainingPercentage[currentIndex]}
                    strokeWidth={10}
                    maxValue={100}
                    // text={`${showingFacOffer.toFixed(5)}%`}
                    styles={buildStyles({
                      // Rotation of path and trail, in number of turns (0-1)
                      rotation: 0.25,

                      // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                      strokeLinecap: "butt",

                      // Text size
                      textSize: "16px",

                      // How long animation takes to go from one percentage to another, in seconds
                      pathTransitionDuration: 0.5,

                      // Can specify path transition in more detail, or remove it entirely
                      // pathTransition: 'none',

                      // Colors
                      pathColor:
                        remainingPercentage[currentIndex] > 0
                          ? "#DB5461"
                          : "#F46A6A",
                      textColor: "#F46A6A",
                      trailColor: "#d6d6d6",
                      backgroundColor: "#3e98c7",
                    })}
                  >
                    <div
                      style={{
                        fontSize: 12,
                        marginTop: -5,
                        color:
                          remainingPercentage[currentIndex] > 0
                            ? "#DB5461"
                            : "#F46A6A",
                      }}
                    >
                      <strong>Quota</strong>
                    </div>
                  </CircularProgressbarWithChildren>
                </div>
              </div>
              <ul className="nav nav-tabs nav-tabs-custom">
                {isNonProp &&
                  actualLayers.map((_, key) => (
                    <li
                      key={key}
                      onClick={() => changeLayer(parseInt(_))}
                      className="nav-item btn"
                    >
                      <div
                        className={`nav-link ${
                          parseInt(_) === currentIndex ? "active" : ""
                        }`}
                        href="#"
                      >{`Layer ${_}`}</div>
                    </li>
                  ))}
              </ul>
              <div className="mt-4">
                <Datatable
                  columns={reinsurersColumns}
                  data={isNonProp ? data[`${currentIndex}`] : reinsurers}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Drawer isvisible={showDeductionDrawer} toggle={toggle} width="50%">
        <UpdateDeductions
          reinsurers={isNonProp ? data[`${currentIndex}`] : reinsurers}
          treaty_accounts={treaty?.treaty_accounts}
          type={treaty?.treaty_program?.treaty_type}
          deductions={treaty?.treaty_deduction}
          treaty_id={treaty?.treaty_id}
          layer_number={isNonProp ? currentIndex : 0}
          setShow={setShowDeductionDrawer}
          layer={JSON.stringify(layers[currentIndex - 1])}
        />
      </Drawer>
    </>
  );
}

export default EffectedWithListing;
