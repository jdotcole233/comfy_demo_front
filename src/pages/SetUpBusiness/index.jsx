/* eslint-disable no-throw-literal */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import { Datatable, Loader, CurrencyValues } from "../../components";
import { useQuery } from "@apollo/client";
import { FETCH_CLASS_OF_BUSINESS } from "../../graphql/queries";
import { columns } from "./columns";
import BusinessButtons from "./components/BusinessButtons";
import CreateBusinessButton from "./components/CreateBusinessButton";

function SetUpBusiness() {
  const { data, loading } = useQuery(FETCH_CLASS_OF_BUSINESS);
  const [classOfBusinesses, setClassOfBusinessData] = useState([]);
  const [overView, setOverView] = useState(null);

  useEffect(() => {
    if (data) {
      setClassOfBusinessData(data.classOfBusinesses);
      setOverView(JSON.parse(data.offerOverview).offer_overview);
    }
  }, [data]);

  const buildRows = (data) => {
    const rows = [];
    data.map((value) => {
      const row = {
        ...value,
        actions: <BusinessButtons value={value} />,
      };
      rows.push(row);
      return value;
    });
    return rows;
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="page-content">
      <div className="col-xl-12 mt-">
        <div className="row">
          <div className="col-md-12">
            <div className="card mini-stats-wid">
              <div className="card-body">
                <div className="media">
                  <div className="media-body">
                    <p className="text-muted font-weight-medium">
                      Total Class of Businesses
                    </p>
                    <h4 className="mb-0">{classOfBusinesses.length}</h4>
                  </div>

                  <div className="mini-stat-icon avatar-sm rounded-circle bg-primary align-self-center">
                    <span className="avatar-title">
                      <i className="bx bx-copy-alt font-size-24"></i>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-12">
            <div className="card mini-stats-wid">
              <div className="card-body">
                <div className="media">
                  <div className="media-body">
                    <p className="text-muted font-weight-medium">
                      Total Facultative Premium{" "}
                    </p>
                    <CurrencyValues data={overView?.total_fac_premium} />
                  </div>

                  <div className="avatar-sm rounded-circle bg-primary align-self-center mini-stat-icon">
                    <span className="avatar-title rounded-circle bg-primary">
                      <i className="bx bx-money  font-size-24"></i>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6">
            <h3>Class of Businesses</h3>
          </div>
          <div
            className="col-md-6"
            style={{ display: "flex", justifyContent: "flex-end" }}
          >
            <CreateBusinessButton />
          </div>
        </div>
      </div>
      <div className="container-fluid mt-2">
        <div className="card">
          <div className="card-body">
            {classOfBusinesses.length ? (
              <Datatable
                columns={columns}
                data={buildRows(classOfBusinesses)}
              />
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SetUpBusiness;
