/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Datatable } from "../../components";
import { useAuth } from "../../context/AuthContext";
import { generateList } from "../../utils";

const OfferListing = ({
  setInputOffer,
  recent,
  all,
  columns,
  title,
  handleLoadMore,
  fetching,
  hideTab,
  allTotal,
  entries = 10,
  insurer_id,
  path,
}) => {
  const [_tab, setTab] = useState("recent");
  const { user } = useAuth();
  const [status, setStatus] = useState(() => {
    return "UNPAID";
  });
  const { tab } = useParams();

  useEffect(() => {
    if (typeof tab !== "undefined") {
      // alert(tab)
      setTab(tab);
    }
  }, []);

  const isFinExec = user?.user_role?.position === "Finance Executive";

  return (
    <div className="row">
      <div className="col-md-12">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-6">
              <h3>{title}</h3>
            </div>
            <div
              className="col-md-6"
              style={{ display: "flex", justifyContent: "flex-end" }}
            >
              {setInputOffer && typeof setInputOffer === "function" ? (
                <button
                  onClick={() => {
                    setInputOffer(true);
                  }}
                  className="btn  btn-primary btn-sm w-md"
                >
                  Input offer
                </button>
              ) : null}
            </div>
          </div>
        </div>
        <div className="container-fluid mt-2">
          <div className="card">
            <div className="card-body">
              <div className="row mb-3">
                {!hideTab && (
                  <div className="d-flex w-auto justify-content-between">
                    <ul className="nav nav-tabs nav-tabs-custom kek-nav-items-pointer">
                      <li className="nav-item ">
                        <Link
                          to={{
                            pathname: path + "/recent",
                            state: { insurer_id },
                          }}
                          className={`nav-link ${_tab === "recent" ? "active" : ""
                            }`}
                        >
                          Recent
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                          to={{
                            pathname: path + "/all",
                            state: { insurer_id },
                          }}
                          className={`nav-link ${_tab === "all" ? "active" : ""
                            }`}
                        >
                          All
                        </Link>
                      </li>
                    </ul>
                  </div>
                )}
              </div>

              {isFinExec && (
                <div className="row mb-3">
                  <div
                    className="btn-group"
                    role="group"
                    aria-label="Basic example"
                  >
                    <button
                      onClick={() => setStatus("UNPAID")}
                      type="button"
                      className={`btn btn-${status !== "UNPAID" ? "secondary" : "success"
                        }`}
                    >
                      Unpaid
                    </button>
                    <button
                      onClick={() => setStatus("PARTPAYMENT")}
                      type="button"
                      className={`btn btn-${status !== "PARTPAYMENT" ? "secondary" : "success"
                        }`}
                    >
                      Partpayment
                    </button>
                    <button
                      onClick={() => setStatus("PAID")}
                      type="button"
                      className={`btn btn-${status !== "PAID" ? "secondary" : "success"
                        }`}
                    >
                      Paid
                    </button>
                  </div>
                </div>
              )}

              {tab === "recent" && (
                <div>
                  <Datatable
                    data={generateList(
                      recent,
                      status,
                      user?.user_role?.position
                    )}
                    entries={entries}
                    columns={columns}
                  />
                </div>
              )}
              {tab === "all" && (
                <div>
                  <div className="d-flex w-auto justify-content-end">
                    {all.length < allTotal && (
                      <button
                        className="btn btn-primary btn-sm w-md "
                        onClick={() => handleLoadMore(all.length)}
                      >
                        {fetching ? "Loading more ..." : "Load More"}
                        {fetching}
                      </button>
                    )}
                  </div>
                  <Datatable
                    data={generateList(all, status, user?.user_role?.position)}
                    entries={entries}
                    columns={columns}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfferListing;
