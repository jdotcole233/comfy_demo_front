/* eslint-disable no-throw-literal */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import {
  Drawer,
  Datatable,
  Loader,
  OverViewCard,
  generateNewCulumns,
} from "../../components";
import EditInsurer from "./EditInsurer";
import f_dat, { managersColumn } from "./dummy";
import { useQuery } from "react-apollo";
import { INSURER, INSURER_OFFERS } from "../../graphql/queries";
import OfferButtons from "./components/Offerbuttons";
import ManagerButtons from "./components/ManagerButtons";
import BrokerageComponent from "./components/BrokerageComponent";
import Reschedule from "./components/Reschedule";
import OfferListing from "../CreateSlip/OfferListing";
import { useMemo } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useInsurer } from "../../context/InsurerProvider";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import { CHANGE_INSURER_PAGE_TYPE } from "../../redux/types/InsurerTypes";
import InsurerDetailOffers from "./components/InsurerDetailOffers";
import InsurerDetialsTreaties from "./components/InsurerDetialsTreaties";
import InsurerDetailsStatsFac from "./components/InsurerDetailsStatsFac";
import InsurerDetailsStatsTreaty from "./components/InsurerDetailsStatsTreaty";
import InsurerStatsFac from "./subComponents/InsurerStatsFac";
import InsurerStatsTreaty from "./subComponents/InsurerStatsTreaty";

const retrocedentFilter = (offer) => offer && _.isNull(offer.offer_retrocedent);

function InsurerDetail() {
  const { state: ctx } = useContext(AuthContext);
  // console.log(ctx?.user)
  const dispatch = useDispatch();
  const type = useSelector((state) => state.insurer.type);
  const granted = useSelector((state) => state.app.granted);
  const history = useHistory();
  const { state } = useLocation();
  const { insurer: _insurer } = useInsurer();

  useEffect(() => {
    if (!_insurer || !_insurer.insurer_id) {
      history.push("/admin/insurers");
    }
  }, [_insurer]);

  const {
    data: insurer_offers,
    loading: fetching,
    fetchMore,
    error,
  } = useQuery(INSURER_OFFERS, {
    variables: {
      id: _insurer?.insurer_id,
      skip: 0,
    },
    fetchPolicy: "cache-and-network",
  });

  const {
    data: insurer,
    loading,
    refetch,
  } = useQuery(INSURER, {
    variables: {
      id: _insurer?.insurer_id,
    },
    fetchPolicy: "network-only",
  });

  const [showInsurerProfile, setShowInsurerProfile] = useState(false);
  const [rows, setRows] = useState([]);
  const [managers, setManagers] = useState([]);

  useEffect(() => {
    const list = [];
    if (insurer) {
      insurer.insurer.offers.filter(retrocedentFilter).map((offer, i) => {
        const expected =
          parseFloat(offer.fac_premium) - parseFloat(offer.commission_amount);
        const payments_made = offer?.offer_payment?.reduce((prev, currVal) => {
          const payment_value = currVal.payment_amount || 0;
          return prev + payment_value;
        }, 0.0);
        const row = {
          name: offer.offer_detail?.policy_number,
          currency: offer?.offer_detail?.currency,
          outstanding: (expected - payments_made).toLocaleString(undefined, {
            maximumFractionDigits: 2,
          }),
          expected_premium: expected.toLocaleString(undefined, {
            maximumFractionDigits: 2,
          }),
          insured: offer.offer_detail?.insured_by,
          sum_insured: ` ${offer.sum_insured.toLocaleString(undefined, {
            maximumFractionDigits: 2,
          })}`,
          f_sum_insured: ` ${offer.fac_sum_insured.toLocaleString(undefined, {
            maximumFractionDigits: 2,
          })}`,
          endorsements: offer?.offer_endorsements?.length ? (
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="font-size-16 text-success"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </span>
          ) : (
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="font-size-16 text-danger"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </span>
          ),
          comission: offer.commission,
          cob: offer.classofbusiness.business_name,
          offer_date: offer.created_at,
          offer_status: (
            <span
              style={{ letterSpacing: 5, padding: 3 }}
              className={`badge badge-${
                offer.offer_status === "OPEN"
                  ? "primary"
                  : offer.offer_status === "PENDING"
                  ? "danger"
                  : "success"
              } font-size-11`}
            >
              {offer.offer_status}
            </span>
          ),
          payment_status: (
            <span
              style={{ letterSpacing: 5, padding: 3 }}
              className={`badge badge-${
                offer.payment_status === "PARTPAYMENT"
                  ? "primary"
                  : offer.payment_status === "UNPAID"
                  ? "danger"
                  : "success"
              } font-size-11`}
            >
              {offer.payment_status}
            </span>
          ),
          salary: (
            <OfferButtons insurer={insurer} state={state} offer={offer} />
          ),
        };
        list.push(row);
        return offer;
      });
    }
    setRows(list);
  }, [insurer]);

  // const insurers_all_offers = useMemo(() => {
  //   if (insurer_offers) {
  //     return insurer_offers?.insurer_all_offers?.offers
  //       .filter(retrocedentFilter)
  //       .map((offer, i) => {
  //         const expected =
  //           parseFloat(offer.fac_premium) - parseFloat(offer.commission_amount);
  //         const payments_made = offer?.offer_payment?.reduce(
  //           (prev, currVal) => {
  //             const payment_value = currVal.payment_amount || 0;
  //             return prev + payment_value;
  //           },
  //           0.0
  //         );
  //         return {
  //           name: offer.offer_detail?.policy_number,
  //           currency: offer?.offer_detail?.currency,
  //           outstanding: (expected - payments_made).toLocaleString(undefined, {
  //             maximumFractionDigits: 2,
  //           }),
  //           expected_premium: expected.toLocaleString(undefined, {
  //             maximumFractionDigits: 2,
  //           }),
  //           insured: offer.offer_detail?.insured_by,
  //           sum_insured: ` ${offer.sum_insured.toLocaleString(undefined, {
  //             maximumFractionDigits: 2,
  //           })}`,
  //           f_sum_insured: ` ${offer.fac_sum_insured.toLocaleString(undefined, {
  //             maximumFractionDigits: 2,
  //           })}`,
  //           endorsements: offer?.offer_endorsements?.length ? (
  //             <span>
  //               <svg
  //                 xmlns="http://www.w3.org/2000/svg"
  //                 className="font-size-16 text-success"
  //                 fill="none"
  //                 viewBox="0 0 24 24"
  //                 stroke="currentColor"
  //               >
  //                 <path
  //                   strokeLinecap="round"
  //                   strokeLinejoin="round"
  //                   strokeWidth={2}
  //                   d="M5 13l4 4L19 7"
  //                 />
  //               </svg>
  //             </span>
  //           ) : (
  //             <span>
  //               <svg
  //                 xmlns="http://www.w3.org/2000/svg"
  //                 className="font-size-16 text-danger"
  //                 fill="none"
  //                 viewBox="0 0 24 24"
  //                 stroke="currentColor"
  //               >
  //                 <path
  //                   strokeLinecap="round"
  //                   strokeLinejoin="round"
  //                   strokeWidth={2}
  //                   d="M6 18L18 6M6 6l12 12"
  //                 />
  //               </svg>
  //             </span>
  //           ),
  //           comission: offer.commission,
  //           cob: offer.classofbusiness.business_name,
  //           offer_date: offer.created_at,
  //           offer_status: (
  //             <span
  //               style={{ letterSpacing: 5, padding: 3 }}
  //               className={`badge badge-${
  //                 offer.offer_status === "OPEN"
  //                   ? "primary"
  //                   : offer.offer_status === "PENDING"
  //                   ? "danger"
  //                   : "success"
  //               } font-size-11`}
  //             >
  //               {offer.offer_status}
  //             </span>
  //           ),
  //           payment_status: (
  //             <span
  //               style={{ letterSpacing: 5, padding: 3 }}
  //               className={`badge badge-${
  //                 offer.payment_status === "PARTPAYMENT"
  //                   ? "primary"
  //                   : offer.payment_status === "UNPAID"
  //                   ? "danger"
  //                   : "success"
  //               } font-size-11`}
  //             >
  //               {offer.payment_status}
  //             </span>
  //           ),
  //           salary: (
  //             <OfferButtons insurer={insurer} state={state} offer={offer} />
  //           ),
  //         };
  //       });
  //   }
  //   return [];
  // }, [insurer_offers, insurer]);

  // const insurers_all_offers_total = useMemo(
  //   () => insurer_offers?.insurer_all_offers?.total,
  //   [insurer_offers]
  // );

  useEffect(() => {
    if (insurer) {
      const list = [];
      insurer.insurer.insurer_associates.map((manager, i) => {
        const row = {
          name: `${manager.assoc_first_name} ${manager.assoc_last_name}`,
          phone: `${manager.assoc_primary_phonenumber}, ${manager.assoc_secondary_phonenumber}`,
          email: `${manager.assoc_email}`,
          actions: ["System Administrator", "Senior Broking Officer"].includes(
            ctx?.user?.position
          ) ? (
            <ManagerButtons manager={manager} state={state} />
          ) : null,
        };
        list.push(row);
        return insurer;
      });
      setManagers(list);
    }
  }, [insurer]);

  const loadMore = (skip) => {
    fetchMore({
      variables: {
        id: _insurer?.insurer_id,
        skip,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        fetchMoreResult.insurer_all_offers.offers = [
          ...prev.insurer_all_offers.offers,
          ...fetchMoreResult.insurer_all_offers.offers,
        ];
        return fetchMoreResult;
      },
    })
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
  };

  const changePageType = (_type) => {
    dispatch({
      type: CHANGE_INSURER_PAGE_TYPE,
      payload: _type,
    });
  };

  if (loading) return <Loader />;

  // if (error) return null;

  // console.log(insurer);

  if (!insurer) return <div className="page-content">No data found</div>;

  return (
    <div className="page-content">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="page-title-box d-flex align-items-center justify-content-between">
              <h4 className="mb-0 font-size-18">Inusrer Details</h4>

              <div className="page-title-right row">
                {granted && (
                  <div className="btn-group mr-4">
                    <div
                      onClick={() => changePageType("Fac")}
                      className={`btn ${
                        type !== "Fac" ? "btn-secondary" : "btn-primary"
                      } w-lg btn-sm`}
                    >
                      <span className="bx bx-archive-in mr-4"></span>
                      Facultative
                    </div>
                    <div
                      onClick={() => changePageType("Treaty")}
                      className={`btn ${
                        type !== "Treaty" ? "btn-secondary" : "btn-primary"
                      } w-lg btn-sm`}
                    >
                      <span className="bx bx-receipt mr-4"></span>
                      Treaty
                    </div>
                  </div>
                )}
                <ol className="breadcrumb m-0">
                  <li className="breadcrumb-item">
                    <Link to="/admin/insurers">Insurers</Link>
                  </li>
                  <li className="breadcrumb-item active">Profile</li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-xl-4">
            <div className="card overflow-hidden">
              <div className="bg-soft-primary">
                <div className="row">
                  <div className="col-7">
                    <div className="text-primary p-3">
                      <h5 className="text-primary">Welcome Back !</h5>
                      <p>It will seem like simplified</p>
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
                      <span className="avatar-title rounded-circle bg-soft-primary text-primary font-size-16">
                        {insurer?.insurer.insurer_abbrv}
                      </span>
                    </div>
                    <h5 className="font-size-15 text-truncate">
                      {insurer?.insurer.insurer_company_name}
                    </h5>
                  </div>

                  <div className="col-sm-8">
                    <div className="pt-4">
                      <div className="row">
                        <div className="col-6">
                          <h5 className="font-size-15">
                            {insurer?.insurer.offers.length}
                          </h5>
                          <p className="text-muted mb-0">Offers</p>
                        </div>
                        <div className="col-6">
                          <h5 className="font-size-15">
                            {insurer?.insurer.insurer_overview?.total_paid}
                          </h5>
                          <p className="text-muted mb-0">Paid</p>
                        </div>
                      </div>
                      <div className="mt-4">
                        <button
                          onClick={() =>
                            setShowInsurerProfile(!showInsurerProfile)
                          }
                          className="btn btn-primary waves-effect waves-light btn-sm mr-1"
                        >
                          View Profile{" "}
                          <i className="mdi mdi-arrow-right ml-1"></i>
                        </button>
                        <Reschedule
                          id={state?.insurer_id}
                          remainders={insurer?.insurer.remainders}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-body">
                <h4 className="card-title mb-4">Other Information</h4>

                <div className="table-responsive">
                  <table className="table table-nowrap mb-0">
                    <tbody>
                      <tr>
                        <th scope="row">Region:</th>
                        <td>{insurer?.insurer.insurer_address.region}</td>
                      </tr>
                      <tr>
                        <th scope="row">City :</th>
                        <td>{insurer?.insurer.insurer_address.suburb}</td>
                      </tr>
                      <tr>
                        <th scope="row">E-mail :</th>
                        <td>{insurer?.insurer.insurer_company_email}</td>
                      </tr>
                      <tr>
                        <th scope="row">Website :</th>
                        <td>{insurer?.insurer.insurer_company_website}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-8">
            <InsurerDetailsStatsFac insurer={insurer} />
            <InsurerDetailsStatsTreaty insurer={insurer?.insurer} />
            <InsurerStatsFac insurer={insurer?.insurer} />
            <InsurerStatsTreaty insurer={insurer?.insurer} />
          </div>
        </div>
        <BrokerageComponent insurer={insurer} />
        <InsurerDetailOffers
          insurer={insurer}
          insurer_offers={insurer_offers}
          loadMore={loadMore}
          fetching={fetching}
        />

        <InsurerDetialsTreaties insurer={insurer?.insurer} refetch={refetch} />

        <div className="">
          <div className="col-md-12">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title mb-4">Managers</h4>
                <Datatable
                  btn
                  hover
                  striped
                  responsive
                  bordered
                  data={managers}
                  columns={generateNewCulumns(
                    managersColumn,
                    ["System Administrator", "Senior Broking Officer"].includes(
                      ctx?.user?.position
                    )
                      ? []
                      : ["actions"]
                  )}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Insurer */}
      <Drawer
        width="40%"
        isvisible={showInsurerProfile}
        toggle={() => setShowInsurerProfile(!showInsurerProfile)}
      >
        {showInsurerProfile && (
          <EditInsurer
            closed={showInsurerProfile}
            data={insurer}
            toggle={() => setShowInsurerProfile(!showInsurerProfile)}
          />
        )}
      </Drawer>
      {/* /end of edit insurer */}
    </div>
  );
}

export default InsurerDetail;
