/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Datatable, GroupButtons } from "../../components";

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
  const [status, setStatus] = useState("ACTIVE");
  const { tab } = useParams();

  useEffect(() => {
    if (typeof tab !== "undefined") {
      // alert(tab)
      setTab(tab);
    }
  }, []);

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
                  className="btn btn-rounded btn-primary btn-sm w-md"
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
                          className={`nav-link ${
                            _tab === "recent" ? "active" : ""
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
                          className={`nav-link ${
                            _tab === "all" ? "active" : ""
                          }`}
                        >
                          All
                        </Link>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
              <div>
                <GroupButtons
                  setStatus={setStatus}
                  statues={[
                    { label: "ACTIVE", value: "ACTIVE" },
                    { label: "EXPIRED", value: "EXPIRED" },
                  ]}
                  status={status}
                />
              </div>

              {tab === "recent" && (
                <div>
                  <Datatable
                    data={
                      status
                        ? recent.filter((item) => item.expiry_status === status)
                        : recent
                    }
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
                  <Datatable data={all} entries={entries} columns={columns} />
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
