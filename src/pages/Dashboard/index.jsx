/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Fragment, useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";
import {
  CurrencyValues,
  Datatable,
  generateNewCulumns,
  Loader,
  OverViewCard,
  ReinsuredComponent,
} from "../../components";
import { useQuery } from "@apollo/client";
import { DASHBOARD } from "../../graphql/queries";
import { columns } from "./columns";
import { AuthContext } from "../../context/AuthContext";
import OfferButtons from "./components/OfferButtons";
import ChartDisplay from "./components/ChartDisplay";

const Dashboard = () => {
  const { state } = useContext(AuthContext);
  const [businessStats] = useState([]);
  const [variables] = useState({
    year: new Date().getFullYear(),
    month: "",
  });
  const { data, called } = useQuery(DASHBOARD, {
    variables,
    fetchPolicy: "network-only",
    // pollInterval: 1000
  });
  const [openMoreBusinessesModal, setOpenMoreBusinessesModal] = useState(false);
  const [offerListing, setOfferListing] = useState([]);

  const [overView, setOverView] = useState(null);

  useEffect(() => {
    if (data) {
      const list = [];
      [...data.offers.offers].map((offer) => {
        const row = {
          policy_number: offer.offer_detail.policy_number,
          insured: offer.offer_detail.insured_by,
          sum_insured:
            offer.offer_detail.currency +
            " " +
            offer.sum_insured.toLocaleString(undefined, {
              maximumFractionDigits: 2,
            }),
          insurance_company: offer?.offer_retrocedent ? (
            <ReinsuredComponent
              name={offer?.offer_retrocedent?.reinsurer?.re_company_name}
            />
          ) : (
            offer.insurer.insurer_company_name
          ),
          rate: offer.rate,
          offer_status: (
            <span
              style={{ letterSpacing: 3 }}
              className={`badge badge-${offer.offer_status === "OPEN"
                ? "success"
                : offer.offer_status === "PENDING"
                  ? "danger"
                  : "success"
                } font-size-11`}
            >
              {offer.offer_status}
            </span>
          ),
          cob: offer.classofbusiness.business_name,
          offer_date: new Date(offer.created_at).toDateString(),
          actions: !["Finance Executive"].includes(state?.user?.user_role?.position) ? (
            <OfferButtons offer={offer} />
          ) : null,
        };
        list.push(row);
        return row;
      });
      setOfferListing(list);
      setOverView(JSON.parse(data.offerOverview));
    }
  }, [data, state]);

  if (!data) {
    return <Loader />;
  }

  return called && data ? (
    <Fragment>
      <div className="page-content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="page-title-box d-flex align-items-center justify-content-between">
                <h4 className="mb-0 font-size-18">Dashboard</h4>

                <div className="page-title-right">
                  <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item">
                      <a>Dashboards</a>
                    </li>
                    <li className="breadcrumb-item active">Dashboard</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-xl-4">
              <div className="card overflow-hidden">
                <div className="bg-soft-success">
                  <div className="row">
                    <div className="col-7">
                      <div className="text-success p-3">
                        <h5 className="text-success">Welcome Back !</h5>
                        <p> Afro-AsianDashboard</p>
                      </div>
                    </div>
                    <div className="col-5 align-self-end">
                      <img
                        src="/assets/images/profile-img.png"
                        alt=""
                        className="img-fluid"
                      />
                    </div>
                  </div>
                </div>
                <div className="card-body pt-0">
                  <div className="row">
                    <div className="col-sm-4">
                      <div className="avatar-lg mr-3 mx-lg-auto mb-4 profile-user-wid">
                        <span className="avatar-title rounded-circle bg-soft-success text-success font-size-16">
                          {state?.user?.employee?.emp_abbrv}
                        </span>
                      </div>
                      <h5 className="font-size-15 ">
                        {state?.user?.employee?.employee_first_name}{" "}
                        {state?.user?.employee?.employee_last_name}
                      </h5>
                    </div>

                    <div className="col-sm-8">
                      <div className="pt-4">
                        <div className="mt-4">
                          <Link
                            to={{ pathname: "/admin/profile" }}
                            className="btn btn-success waves-effect waves-light btn-sm"
                          >
                            View Profile
                            <i className="mdi mdi-arrow-right ml-1"></i>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title mb-4">Monthly Brokerage Earning</h4>
                  <div className="row">
                    <div className="col-sm-12">
                      <p className="text-muted">This month</p>
                      <CurrencyValues
                        data={overView?.monthly_brokerage_earning}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-8">
              <div className="row">
                <div className="col-md-4">
                  <div className="card mini-stats-wid">
                    <div className="card-body">
                      <div className="media">
                        <div className="media-body">
                          <p className="text-muted font-weight-medium">
                            Total Offers
                          </p>
                          <h4 className="mb-0">
                            {overView?.offer_overview?.total_offers}
                          </h4>
                        </div>

                        <div className="mini-stat-icon avatar-sm rounded-circle bg-success align-self-center">
                          <span className="avatar-title bg-success">
                            <i className="bx bx-copy-alt font-size-24"></i>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card mini-stats-wid">
                    <div className="card-body">
                      <div className="media">
                        <div className="media-body">
                          <p className="text-muted font-weight-medium">
                            Total Pending offers
                          </p>
                          <h4 className="mb-0">
                            {overView?.offer_overview?.total_pending}
                          </h4>
                        </div>

                        <div className="avatar-sm rounded-circle bg-success align-self-center mini-stat-icon">
                          <span className="avatar-title rounded-circle bg-success">
                            <i className="bx bx-time font-size-24"></i>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card mini-stats-wid">
                    <div className="card-body">
                      <div className="media">
                        <div className="media-body">
                          <p className="text-muted font-weight-medium">
                            Total Closed Offers
                          </p>
                          <h4 className="mb-0">
                            {overView?.offer_overview?.total_closed}
                          </h4>
                        </div>

                        <div className="avatar-sm rounded-circle bg-success align-self-center mini-stat-icon">
                          <span className="avatar-title rounded-circle bg-success">
                            <i className="bx bx-lock-alt font-size-24"></i>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <OverViewCard
                  className="col-md-12"
                  title="Total fac Premium"
                  value={overView?.offer_overview?.total_fac_premium}
                />
              </div>

              <ChartDisplay />
            </div>
          </div>

          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title mb-4">Latest Offers</h4>
                  <Datatable
                    btn
                    hover
                    striped
                    responsive
                    bordered
                    entries={5}
                    columns={generateNewCulumns(
                      columns,
                      !["Finance Executive"].includes(state?.user?.user_role?.position)
                        ? []
                        : ["actions"]
                    )}
                    data={offerListing.splice(0, 20)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        centered
        show={openMoreBusinessesModal}
        onHide={() => setOpenMoreBusinessesModal(!openMoreBusinessesModal)}
      >
        <Modal.Header closeButton>other Business Stats</Modal.Header>
        <Modal.Body>
          <table className="table table-bordered table-striped">
            <thead>
              <th>Business Class</th>
              <th>Frequency</th>
            </thead>
            <tbody>
              {businessStats.length > 5 &&
                businessStats
                  .slice(5, businessStats.length)
                  .map((stats, key) => (
                    <tr key={key}>
                      <td>{stats.business_name}</td>
                      <td>{stats.total_businesses}</td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </Modal.Body>
      </Modal>
    </Fragment>
  ) : null;
};

export default Dashboard;
