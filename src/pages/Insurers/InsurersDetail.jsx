/* eslint-disable no-throw-literal */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import {
  Drawer,
  Datatable,
  Loader,
  generateNewCulumns,
  toMoney,
} from "../../components";
import EditInsurer from "./EditInsurer";
import { managersColumn } from "./dummy";
import { useQuery } from "@apollo/client";
import { INSURER, INSURER_OFFERS } from "../../graphql/queries";
import OfferButtons from "./components/Offerbuttons";
import ManagerButtons from "./components/ManagerButtons";
import BrokerageComponent from "./components/BrokerageComponent";
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
import InsurerDetailsWelcomeScreen from "./components/InsurerDetailsWelcomeScreen";
import InsurerDetailsOtherInfo from "./components/InsurerDetailsOtherInfo";

const retrocedentFilter = (offer) => offer && _.isNull(offer.offer_retrocedent);

function InsurerDetail() {
  const { state: ctx } = useContext(AuthContext);
  const dispatch = useDispatch();
  const type = useSelector((state) => state.insurer.type);
  const granted = useSelector((state) => state.app.granted);
  const history = useHistory();
  const { state } = useLocation();
  const { insurer: _insurer } = useInsurer();

  useEffect(() => {
    if (!state || !state.insurer_id) {
      history.push("/admin/insurers");
    }
  }, [state]);

  const {
    data: insurer_offers,
    loading: fetching,
    fetchMore,
    error,
  } = useQuery(INSURER_OFFERS, {
    variables: {
      id: state?.insurer_id,
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
      id: state?.insurer_id,
    },
    fetchPolicy: "network-only",
  });

  const [showInsurerProfile, setShowInsurerProfile] = useState(false);
  const [, setRows] = useState([]);
  const [managers, setManagers] = useState([]);

  useEffect(() => {
    const list = [];
    if (insurer) {
      insurer.insurer.offers.filter(retrocedentFilter).map((offer, i) => {
        const hasEndorsement = _.last(offer.offer_endorsements);
        const payments_made = offer?.offer_payment?.reduce((prev, currVal) => {
          const payment_value = currVal.payment_amount || 0;
          return prev + payment_value;
        }, 0.0);
        const expected =
          parseFloat(offer.fac_premium) -
            parseFloat(
              offer?.reinsurer_offer_extra_charge?.agreed_commission_amount
            ) +
            hasEndorsement
            ? parseFloat(hasEndorsement?.fac_premium) -
            parseFloat(hasEndorsement?.commission_amount)
            : 0;

        const row = {
          name: offer.offer_detail?.policy_number,
          currency: offer?.offer_detail?.currency,
          outstanding: toMoney(expected - payments_made),
          expected_premium: toMoney(expected),
          insured: offer.offer_detail?.insured_by,
          sum_insured: ` ${toMoney(offer.sum_insured)}`,
          f_sum_insured: ` ${toMoney(offer.fac_sum_insured)}`,
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
          comission: toMoney(offer.commission),
          cob: offer.classofbusiness.business_name,
          offer_date: offer.created_at,
          offer_status: (
            <span
              style={{ letterSpacing: 5, padding: 3 }}
              className={`badge badge-${offer.offer_status === "OPEN"
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
              className={`badge badge-${offer.payment_status === "PARTPAYMENT"
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

  useEffect(() => {
    if (insurer) {
      const list = [];
      insurer.insurer.insurer_associates.map((manager, i) => {
        const row = {
          name: `${manager.assoc_first_name} ${manager.assoc_last_name}`,
          phone: `${manager.assoc_primary_phonenumber}, ${manager.assoc_secondary_phonenumber}`,
          email: `${manager.assoc_email}`,
          actions: ["System Administrator", "Senior Broking Officer"].includes(
            ctx?.user?.user_role?.position
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
      .then((res) => { })
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

  if (error) return null;

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
                      className={`btn ${type !== "Fac" ? "btn-secondary" : "btn-success"
                        } w-lg btn-sm`}
                    >
                      <span className="bx bx-archive-in mr-4"></span>
                      Facultative
                    </div>
                    <div
                      onClick={() => changePageType("Treaty")}
                      className={`btn ${type !== "Treaty" ? "btn-secondary" : "btn-success"
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
            <InsurerDetailsWelcomeScreen insurer={insurer?.insurer} />
            <InsurerDetailsOtherInfo insurer={insurer?.insurer} />
          </div>

          <div className="col-xl-8">
            <InsurerDetailsStatsFac insurer={insurer} />
            <InsurerDetailsStatsTreaty insurer={insurer} />
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
                      ctx?.user?.user_role?.position
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
