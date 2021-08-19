import React, { useMemo } from 'react'
import { useSelector } from 'react-redux';
import { Datatable } from '../../../components';
import { offersColumns } from '../columns';
import OfferButtons from './OfferButtons';

const ReinsurersDetailOffers = () => {
    const { type, reinsurer } = useSelector(state => state.reinsurer)
    const offers = useMemo(() => {
        if (reinsurer) {
            const offers = [];
            reinsurer.offers_participant.map((offer) => {
                const row = {
                    policy_no: offer?.reinsurer_offers_only?.offer_detail?.policy_number,
                    company: offer?.reinsurer_offers_only?.insurer?.insurer_company_name,
                    cob: offer?.reinsurer_offers_only?.classofbusiness?.business_name,
                    participating_percentage: offer?.offer_participant_percentage,
                    fac_sum_insured: offer?.reinsurer_offers_only?.fac_sum_insured?.toLocaleString(undefined, { maximumFractionDigits: 2 }),
                    fac_premium: offer?.reinsurer_offers_only.fac_premium?.toLocaleString(undefined, { maximumFractionDigits: 2 }),
                    offer_status: (
                        <span style={{ letterSpacing: 3 }} className={`badge badge-soft-${offer?.reinsurer_offers_only?.offer_status === "OPEN" ? "primary" : offer?.reinsurer_offers_only?.offer_status === "PENDING" ? "danger" : "success"} font-size-11`}>{offer.reinsurer_offers_only.offer_status}</span>
                    ),
                    brokerage: offer.reinsurer_offers_only.brokerage,
                    payment_status: (
                        <span style={{ letterSpacing: 3 }} className={`badge badge-soft-${offer?.reinsurer_offers_only?.payment_status === "PART PAYMENT" ? "primary" : offer?.reinsurer_offers_only?.payment_status === "UNPAID" ? "danger" : "success"} font-size-11`}>{offer.reinsurer_offers_only.payment_status}</span>
                    ),
                    offer_date: offer?.reinsurer_offers_only?.created_at,
                    insured: offer?.reinsurer_offers_only?.offer_detail?.insured_by,
                    actions: <OfferButtons data={reinsurer} offer={offer} />,
                }
                offers.push(row)
                return offer;
            })
            return offers
        }
        return []
    }, [reinsurer])

    return type === "Fac" ? (
        <div className="col-md-12">
            <div className="card">
                <div className="card-body">
                    <h4 className="card-title mb-4">Offers</h4>
                    <Datatable data={offers} entries={5} columns={offersColumns} />
                </div>
            </div>
        </div>
    ) : null
}

export default ReinsurersDetailOffers
