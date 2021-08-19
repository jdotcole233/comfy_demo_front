/* eslint-disable no-throw-literal */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useMemo } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  Drawer,
  Datatable,
  Loader,
  OverViewCard,
  generateNewCulumns,
} from "../../components";
import EditReinsurer from "./EditResinsurer";
import { associatesColumnns, offersColumns } from "./columns";
import { useQuery } from "react-apollo";
import { REINSURER, REINSURER_OFFERS } from "../../graphql/queries";
import OfferButtons from "./components/OfferButtons";
import AssociateButtons from "./components/AssociateButtons";
import BrokerageComponent from "./components/BrokerageComponent";
import OfferListing from "../CreateSlip/OfferListing";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useReinsurer } from "../../context/ReinsurersProvider";
import RetrocedentOfferButtons from "./components/RetrocedentOfferButtons";
import { useDispatch, useSelector } from "react-redux";
import { CHANGE_REINSURER_PAGE_TYPE } from "../../redux/types/ReinsurerTypes";
import ReinsurerDetailWelcome from "./components/ReinsurerDetailWelcome";
import ReinsurerDetailOtherInfo from "./components/ReinsurerDetailOtherInfo";

function ReinsurerDetail() {
  const history = useHistory();
  const { reinsurer } = useReinsurer();
  const { state: ctx } = useContext(AuthContext);
  const [showInsurerProfile, setShowInsurerProfile] = useState(false);
  const [associates, setAssociates] = useState([]);
  const [offerListing, setOfferListing] = useState([]);
  const [allOfferListing, setAllOfferListing] = useState([]);
  const [overview, setOverview] = useState(null);
  const [allTotalValue, setAllTotalValue] = useState(0);
  const granted = useSelector((state) => state.app.granted);
  const dispatch = useDispatch();
  const { reinsurer_id, type } = useSelector((state) => state.reinsurer);

  useEffect(() => {
    if (!reinsurer) {
      history.push("/admin/re-insurers");
    }
  }, [reinsurer]);

  const { data, loading } = useQuery(REINSURER, {
    variables: {
      id: reinsurer?.reinsurer_id,
    },
    fetchPolicy: "network-only",
  });
  const {
    data: reinsurer_offers,
    loading: fetching,
    fetchMore,
  } = useQuery(REINSURER_OFFERS, {
    variables: {
      id: reinsurer?.reinsurer_id,
      skip: 0,
    },
    fetchPolicy: "cache-and-network",
  });

  useEffect(() => {
    if (data) {
      const list = [];
      data.reinsurer.reinsurer_representatives.map((reinsurer, i) => {
        const row = {
          name: `${reinsurer.rep_first_name} ${reinsurer.rep_last_name}`,
          phone: `${reinsurer.rep_primary_phonenumber}, ${reinsurer.rep_secondary_phonenumber}`,
          email: `${reinsurer.rep_email}`,
          position: `${reinsurer.position}`,
          actions: ["System Administrator", "Senior Broking Officer"].includes(
            ctx?.user?.position
          ) ? (
            <AssociateButtons reinsurer={reinsurer} data={data} />
          ) : null,
        };
        list.push(row);
        return reinsurer;
      });
      setAssociates(list);
      setOverview(data.reinsurer.reinsurer_overview);
    }
  }, [data]);

  useEffect(() => {
    if (reinsurer_offers) {
      const offers = [];
      reinsurer_offers.reinsurer_all_offers.offers.map((offer) => {
        const row = {
          policy_no: offer.reinsurer_offers_only.offer_detail.policy_number,
          company: offer.reinsurer_offers_only.insurer.insurer_company_name,
          cob: offer.reinsurer_offers_only.classofbusiness.business_name,
          participating_percentage: offer.offer_participant_percentage,
          fac_sum_insured:
            offer.reinsurer_offers_only.fac_sum_insured.toLocaleString(
              undefined,
              { maximumFractionDigits: 2 }
            ),
          fac_premium: offer.reinsurer_offers_only.fac_premium.toLocaleString(
            undefined,
            { maximumFractionDigits: 2 }
          ),
          offer_status: (
            <span
              style={{ letterSpacing: 3 }}
              className={`badge badge-${
                offer.reinsurer_offers_only.offer_status === "OPEN"
                  ? "primary"
                  : offer.reinsurer_offers_only.offer_status === "PENDING"
                  ? "danger"
                  : "success"
              } font-size-11`}
            >
              {offer.reinsurer_offers_only.offer_status}
            </span>
          ),
          brokerage: offer.reinsurer_offers_only.brokerage,
          payment_status: (
            <span
              style={{ letterSpacing: 3 }}
              className={`badge badge-${
                offer.reinsurer_offers_only.payment_status === "PART PAYMENT"
                  ? "primary"
                  : offer.reinsurer_offers_only.payment_status === "UNPAID"
                  ? "danger"
                  : "success"
              } font-size-11`}
            >
              {offer.reinsurer_offers_only.payment_status}
            </span>
          ),
          offer_date: offer.reinsurer_offers_only.created_at,
          insured: offer.reinsurer_offers_only.offer_detail.insured_by,
          actions: (
            <OfferButtons type="all" data={reinsurer_offers} offer={offer} />
          ),
        };
        offers.push(row);
        return offer;
      });
      setAllOfferListing(offers);
      setAllTotalValue(reinsurer_offers.reinsurer_all_offers.total);
    }
  }, [reinsurer_offers]);

  useEffect(() => {
    if (data) {
      const offers = [];
      data.reinsurer.offers_participant.map((offer) => {
        const row = {
          policy_no: offer.reinsurer_offers_only.offer_detail.policy_number,
          company: offer.reinsurer_offers_only.insurer.insurer_company_name,
          cob: offer.reinsurer_offers_only.classofbusiness.business_name,
          participating_percentage: offer.offer_participant_percentage,
          fac_sum_insured:
            offer.reinsurer_offers_only.fac_sum_insured.toLocaleString(
              undefined,
              { maximumFractionDigits: 2 }
            ),
          fac_premium: offer.reinsurer_offers_only.fac_premium.toLocaleString(
            undefined,
            { maximumFractionDigits: 2 }
          ),
          offer_status: (
            <span
              style={{ letterSpacing: 3 }}
              className={`badge badge-${
                offer.reinsurer_offers_only.offer_status === "OPEN"
                  ? "primary"
                  : offer.reinsurer_offers_only.offer_status === "PENDING"
                  ? "danger"
                  : "success"
              } font-size-11`}
            >
              {offer.reinsurer_offers_only.offer_status}
            </span>
          ),
          brokerage: offer.reinsurer_offers_only.brokerage,
          payment_status: (
            <span
              style={{ letterSpacing: 3 }}
              className={`badge badge-${
                offer.reinsurer_offers_only.payment_status === "PART PAYMENT"
                  ? "primary"
                  : offer.reinsurer_offers_only.payment_status === "UNPAID"
                  ? "danger"
                  : "success"
              } font-size-11`}
            >
              {offer.reinsurer_offers_only.payment_status}
            </span>
          ),
          offer_date: offer.reinsurer_offers_only.created_at,
          insured: offer.reinsurer_offers_only.offer_detail.insured_by,
          actions: <OfferButtons data={data} offer={offer} />,
        };
        offers.push(row);
        return offer;
      });
      setOfferListing(offers);
    }
  }, [data]);

  const broughtInOffers = useMemo(() => {
    if (data && data.reinsurer && data.reinsurer.offer_retrocedents) {
      return data.reinsurer.offer_retrocedents.map(({ offer }) => {
        const row = {
          policy_no: offer.offer_detail.policy_number,
          company: offer.insurer.insurer_company_name,
          cob: offer.classofbusiness.business_name,
          participating_percentage: offer.offer_participant_percentage,
          fac_sum_insured: offer.fac_sum_insured.toLocaleString(undefined, {
            maximumFractionDigits: 2,
          }),
          fac_premium: offer.fac_premium.toLocaleString(undefined, {
            maximumFractionDigits: 2,
          }),
          offer_status: (
            <span
              style={{ letterSpacing: 3 }}
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
          brokerage: offer.brokerage,
          payment_status: (
            <span
              style={{ letterSpacing: 3 }}
              className={`badge badge-${
                offer.payment_status === "PART PAYMENT"
                  ? "primary"
                  : offer.payment_status === "UNPAID"
                  ? "danger"
                  : "success"
              } font-size-11`}
            >
              {offer.payment_status}
            </span>
          ),
          offer_date: offer.created_at,
          insured: offer.offer_detail.insured_by,
          actions: <RetrocedentOfferButtons data={data} offer={offer} />,
        };
        return row;
      });
    }

    return [];
  }, [data]);

  const handleLoadMore = (skip) => {
    fetchMore({
      variables: {
        id: reinsurer?.reinsurer_id,
        skip,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        fetchMoreResult.reinsurer_all_offers.offers = [
          ...prev.reinsurer_all_offers.offers,
          ...fetchMoreResult.reinsurer_all_offers.offers,
        ];
        // setSkip(p => p + 1)
        return fetchMoreResult;
      },
    });
  };

  const changePageType = (_type) => {
    dispatch({
      type: CHANGE_REINSURER_PAGE_TYPE,
      payload: _type,
    });
  };

  if (loading) return <Loader />;

  return (
    <div className="page-content">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="page-title-box d-flex align-items-center justify-content-between">
              <h4 className="mb-0 font-size-18">Re-inusrer Deatil</h4>

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
                    <Link to="/admin/re-insurers">Re-Insurers</Link>
                  </li>
                  <li className="breadcrumb-item active">Profile</li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-xl-4">
            <ReinsurerDetailWelcome
              setShowInsurerProfile={setShowInsurerProfile}
              reinsurer={data?.reinsurer}
              overview={overview}
            />
            <ReinsurerDetailOtherInfo reinsurer={data?.reinsurer} />
          </div>

          <div className="col-xl-8">
            <div className="row">
              <div className="col-md-6">
                <div className="card mini-stats-wid">
                  <div className="card-body">
                    <div className="media">
                      <div className="media-body">
                        <p className="text-muted font-weight-medium">
                          Closed Offers
                        </p>
                        <h4 className="mb-0">{overview?.total_closed}</h4>
                      </div>

                      <div className="mini-stat-icon avatar-sm align-self-center rounded-circle bg-primary">
                        <span className="avatar-title">
                          <i className="bx bx-check-circle font-size-24"></i>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card mini-stats-wid">
                  <div className="card-body">
                    <div className="media">
                      <div className="media-body">
                        <p className="text-muted font-weight-medium">
                          Pending Offers
                        </p>
                        <h4 className="mb-0">{overview?.total_pending}</h4>
                      </div>

                      <div className="avatar-sm align-self-center mini-stat-icon rounded-circle bg-primary">
                        <span className="avatar-title">
                          <i className="bx bx-hourglass font-size-24"></i>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <OverViewCard
                title="Total Revenue"
                value={JSON.parse(overview?.total_fac_premium || null)}
                className="col-md-12"
              />
              <OverViewCard
                title="Total Withholding Tax"
                value={JSON.parse(overview?.total_withholding_tax || null)}
              />
              <OverViewCard
                title="Total NIC Levy"
                value={JSON.parse(overview?.total_nic_tax || null)}
              />
            </div>
          </div>
        </div>
        <BrokerageComponent data={data} />
        <OfferListing
          title="Offers"
          path="/admin/re-insurers-detail"
          recent={offerListing}
          all={allOfferListing}
          allTotal={allTotalValue}
          setInputOffer={1}
          entries={5}
          columns={offersColumns}
          fetching={fetching}
          handleLoadMore={handleLoadMore}
        />

        {/* Sections for Offers brought in by Reinsurers company */}
        <OfferListing
          title="Retrocedent offers"
          path="/admin/re-insurers-detail"
          recent={broughtInOffers}
          all={broughtInOffers}
          allTotal={allTotalValue}
          setInputOffer={1}
          entries={5}
          columns={offersColumns.filter(
            (el) => el.field !== "participating_percentage"
          )}
          fetching={fetching}
          handleLoadMore={handleLoadMore}
        />

        <div className="">
          <div className="col-md-12">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title mb-4">Associates</h4>
                <Datatable
                  btn
                  hover
                  striped
                  responsive
                  bordered
                  columns={generateNewCulumns(
                    associatesColumnns,
                    ["System Administrator", "Senior Broking Officer"].includes(
                      ctx?.user?.position
                    )
                      ? []
                      : ["actions"]
                  )}
                  data={associates}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Reinsurer */}
      <Drawer
        width="40%"
        isvisible={showInsurerProfile}
        toggle={() => setShowInsurerProfile(!showInsurerProfile)}
      >
        {showInsurerProfile && (
          <EditReinsurer
            closed={showInsurerProfile}
            data={data}
            toggle={() => setShowInsurerProfile(!showInsurerProfile)}
          />
        )}
      </Drawer>
    </div>
  );
}

export default ReinsurerDetail;
