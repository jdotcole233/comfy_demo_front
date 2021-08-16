import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import OfferButtons from "./Offerbuttons";
import f_dat from "../dummy";
import { Datatable } from "../../../components";
import { useInsurerProps } from "../providers/InsurerProvider";

const InsurerDetailOffers = () => {
  const { type } = useSelector((state) => state.insurer);
  const { insurer } = useInsurerProps();
  const offers = useMemo(() => {
    const list = [];
    if (insurer) {
      insurer.offers.map((offer, i) => {
        const row = {
          name: offer.offer_detail?.policy_number,
          insured: offer.offer_detail?.insured_by,
          sum_insured: `${
            offer?.offer_detail?.currency
          } ${offer.sum_insured.toLocaleString(undefined, {
            maximumFractionDigits: 2,
          })}`,
          f_sum_insured: `${
            offer?.offer_detail?.currency
          } ${offer.fac_sum_insured.toLocaleString(undefined, {
            maximumFractionDigits: 2,
          })}`,
          comission: offer.commission,
          cob: offer.classofbusiness.business_name,
          offer_date: offer.created_at,
          offer_status: (
            <span
              style={{ letterSpacing: 5, padding: 3 }}
              className={`badge badge-soft-${
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
              className={`badge badge-soft-${
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
          salary: <OfferButtons insurer={insurer} offer={offer} />,
        };
        list.push(row);
        return offer;
      });
    }
    return list;
  }, [insurer]);

  return type === "Fac" ? (
    <div className="col-md-12">
      <div className="card">
        <div className="card-body">
          <h4 className="card-title mb-4">Offers</h4>

          <Datatable
            btn
            hover
            striped
            responsive
            bordered
            data={offers}
            columns={f_dat.columns}
          />
        </div>
      </div>
    </div>
  ) : null;
};

export default InsurerDetailOffers;
