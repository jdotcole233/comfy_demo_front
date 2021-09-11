/* eslint-disable react/jsx-no-target-blank */
import React from "react";
import { BASE_URL_LOCAL } from "../../../graphql";
import moment from "moment";
import { money } from "./CreditNote";
import PreviewLogo from "../../../components/PreviewLogo";
import { Row } from "./LayerDebitNote";
import _ from "lodash";
import { toLayerPosition } from "utils";

const netAmount = (amountForOrder, nic, wth, brokerage) =>
  amountForOrder - (parseFloat(nic) + parseFloat(wth) + parseFloat(brokerage));

const NonProportionalClosingNote = ({
  layer,
  treaty,
  layer_number,
  reinsurer,
  reinsurers = [],
  insurer,
}) => {
  console.log("reinsurers", reinsurers);
  const amountForOrder =
    ((reinsurer?.treaty_participation_percentage || 0) / 100) *
    parseFloat(layer?.m_and_d_premium);
  const modifiedDeduction =
    reinsurer?.treaty_participant_deductions?.length > 0;
  const deduction = modifiedDeduction
    ? _.first(reinsurer?.treaty_participant_deductions)
    : treaty?.deduction;
  const _netAmount = netAmount(
    amountForOrder,
    deduction?.nic_levy_amount,
    deduction?.withholding_tax_amount,
    deduction?.brokerage_amount
  );

  const _fig = parseInt(layer?.installment_type);
  const months =
    _fig === 1
      ? [1]
      : _fig === 2
      ? [1, 7]
      : _fig === 3
      ? [1, 5, 9]
      : [1, 4, 7, 10];

  const nics = _.mapValues(_.groupBy(reinsurers, "layer_number"), (list, key) =>
    list.reduce((sum, item) => {
      return (
        sum + parseFloat(item.treaty_participant_deductions[0].nic_levy_amount)
      );
    }, 0)
  );

  const wths = _.mapValues(_.groupBy(reinsurers, "layer_number"), (list, key) =>
    list.reduce((sum, item) => {
      return (
        sum +
        parseFloat(item.treaty_participant_deductions[0].withholding_tax_amount)
      );
    }, 0)
  );

  const brgs = _.mapValues(_.groupBy(reinsurers, "layer_number"), (list, key) =>
    list.reduce((sum, item) => {
      return (
        sum + parseFloat(item.treaty_participant_deductions[0].brokerage_amount)
      );
    }, 0)
  );

  const computeBalanceDue = (m_and_d_premium, nic, wth, brokerage) => {
    return parseFloat(m_and_d_premium) - (nic + wth + brokerage);
  };

  return (
    <>
      {/* <div className="row m-2">
        <a
          target="_blank"
          href={`${BASE_URL_LOCAL}/treaty_np_credit_note/${btoa(
            JSON.stringify({
              participant_id: reinsurer?.treaty_participation_id,
              limit: layer?.limit,
              layer: layer_number,
              uuid: layer?.uuid,
              m_and_d_premium: layer?.m_and_d_premium,
              total_participation_percentage:
                reinsurer?.treaty_participation_percentage,
              installment_type: layer?.installment_type,
            })
          )}`}
          className="btn btn-sm btn-primary w-md"
        >
          <i className="bx bxs-file-pdf"></i> Save
        </a>
      </div> */}
      <iframe
        height={window.innerHeight - 100}
        width="100%"
        // className="preview-card container-fluid text-black bg-white"
        src={`${BASE_URL_LOCAL}/treaty_np_credit_note/${btoa(
          JSON.stringify({
            participant_id: reinsurer?.treaty_participation_id,
            limit: layer?.limit,
            layer: layer_number,
            uuid: layer?.uuid,
            m_and_d_premium: layer?.m_and_d_premium,
            total_participation_percentage:
              reinsurer?.treaty_participation_percentage,
            installment_type: layer?.installment_type,
          })
        )}`}
        frameborder="0"
      ></iframe>
    </>
  );
};

export default NonProportionalClosingNote;
