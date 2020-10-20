/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import styles from './styles/ViewReinsurerOffer.module.css'
import { useQuery } from 'react-apollo'
import { FETCH_CLASS_OF_BUSINESS } from '../../graphql/queries'
import { Editor } from '../../components';


export default function ViewReinsurerOffer({ data }) {
    const [details, setDetails] = useState(null)
    const [selectedClassOfBusiness, setSelectedClassOfBusiness] = useState(null)
    const { data: classOfBusinesses, loading: businessLoading } = useQuery(FETCH_CLASS_OF_BUSINESS);

    useEffect(() => {
        if (data && classOfBusinesses) {
            setDetails(data);
            console.log(data)
            chooseSelectedBusiness(data.reinsurer_offers_only.classofbusiness.business_name)
        }
    }, [data, classOfBusinesses])

    const handleBusinessSelected = event => {
        const { value } = event.target;
        chooseSelectedBusiness(value);
    }

    const chooseSelectedBusiness = value => {
        const business = classOfBusinesses.classOfBusinesses.find(business_x => business_x.business_name === value);
        if (business) {
            setSelectedClassOfBusiness(business);
        } else {
            setSelectedClassOfBusiness(null)
        }
    }

    return (
        <>
            <div className={styles.card_header}>
                <h2 className={styles.card_title}>View facultative placement slip</h2>
            </div>
            <div className={styles.card_body}>
                <div className="row">
                    <div className="col-md-12">
                        <div className="form-group">
                            <label htmlFor="BusinessClass">Insurance Company</label>
                            <input value={details?.reinsurer_offers_only.insurer.insurer_company_name} type="text" name="business_class" className="form-control" list="insurance_companies" placeholder="Insurance company" />
                            <datalist id="insurance_companies">
                                <select name="business_class" id="" className="form-control">
                                    <option value="Regency Nem Insurance Ghana Ltd">Regency Nem Insurance Ghana Ltd</option>
                                    <option value="Marine Cargo">Marine Cargo</option>
                                </select>
                            </datalist>
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="form-group">
                            <label htmlFor="BusinessClass">Business Class</label>
                            <input value={details?.reinsurer_offers_only.classofbusiness.business_name} onChange={handleBusinessSelected} type="text" name="business_class" className="form-control" list="class_of_businesses" placeholder="Insurance company" />
                            <datalist id="class_of_businesses">
                                <select onChange={handleBusinessSelected} name="business_class" id="" className="form-control">
                                    {businessLoading ? <option value="Loading..."></option> : ""}
                                    {classOfBusinesses && classOfBusinesses.classOfBusinesses.map((business, key) => (
                                        <option key={key} onClick={handleBusinessSelected} id={business.class_of_business_id} value={business.business_name} />
                                    ))}
                                </select>
                            </datalist>
                        </div>
                    </div>

                </div>
                {selectedClassOfBusiness ? <fieldset className="w-auto p-2 border-form">
                    <legend className={styles.details_title}>Business class details</legend>
                    <div className="row">
                        {JSON.parse(details?.reinsurer_offers_only.offer_detail.offer_details).map((detail, key) => {
                            return (
                                <div key={key} className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="Type of goods">{detail.keydetail}</label>
                                        <input type="text" onChange={() => { }} className="form-control" value={detail.value} placeholder={detail.keydetail} />
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </fieldset> : null}
                <fieldset className="w-auto p-2 border-form">
                    <legend className={styles.details_title}>Offer Details</legend>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="Type of goods">Policy no.</label>
                                <input type="text" value={details?.reinsurer_offers_only.offer_detail.policy_number} className="form-control" placeholder="Policy no." onChange={() => { }} />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="Type of goods">Insured</label>
                                <input type="text" className="form-control" value={details?.reinsurer_offers_only.offer_detail.insured_by} placeholder="Insured" onChange={() => { }} />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="Type of goods">Sum Insured</label>
                                <input type="text" className="form-control" value={details?.reinsurer_offers_only.sum_insured} placeholder="Sum Insured" onChange={() => { }} />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="Type of goods">Rate (%)</label>
                                <input type="text" className="form-control" placeholder="Rate" value={details?.reinsurer_offers_only.rate} onChange={() => { }} />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="Type of goods">Premium</label>
                                <input type="text" className="form-control" placeholder="Premium" value={details?.reinsurer_offers_only.premium} onChange={() => { }} />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="Type of goods">Facultative Offer (%)</label>
                                <input type="text" className="form-control" placeholder="Facultative Offer" value={details?.reinsurer_offers_only.facultative_offer} onChange={() => { }} />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="Type of goods">Commision (%)</label>
                                <input type="text" className="form-control" placeholder="Commision" value={details?.reinsurer_offers_only.commission} onChange={() => { }} />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="Type of goods">Brokerage (%)</label>
                                <input type="text" className="form-control" placeholder="Brokerage" value={details?.reinsurer_offers_only.brokerage} onChange={() => { }} />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="currency">Currency</label>
                                <input type="text" value={details?.reinsurer_offers_only.offer_detail.currency} className="form-control" onChange={() => { }} readOnly />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="Type of goods">Co-Insurance Share (%)</label>
                                <input type="text" className="form-control" placeholder="Co-Insurance Share" value={details?.reinsurer_offers_only?.co_insurance_share} onChange={() => { }} />
                            </div>
                        </div>
                    </div>
                </fieldset>
                <fieldset className="w-auto p-2 border-form">
                    <legend className={styles.details_title}>Period Of Insurance</legend>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="Type of goods">From</label>
                                <input type="text" value={details?.reinsurer_offers_only?.offer_detail.period_of_insurance_from} className="form-control" placeholder="From" onChange={() => { }} readOnly />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="Type of goods">To</label>
                                <input type="text" value={details?.reinsurer_offers_only.offer_detail.period_of_insurance_to} className="form-control" placeholder="To" onChange={() => { }} readOnly />
                            </div>
                        </div>
                    </div>
                </fieldset>
                {details?.reinsurer_offers_only?.offer_detail?.offer_comment && <fieldset className="w-auto p-2 border-form">
                    <legend className={styles.details_title}>Comment</legend>
                    <div className="form-grpup">
                        <Editor value={details?.reinsurer_offers_only?.offer_detail?.offer_comment || ""} onChange={() => { }} />
                    </div>
                </fieldset>}
                {details?.reinsurer_offers_only?.offer_detail?.information_comment && <fieldset className="w-auto p-2 border-form">
                    <legend className={styles.details_title}>NROL</legend>
                    <div className="form-grpup">
                        <Editor value={details?.reinsurer_offers_only?.offer_detail?.information_comment || ""} onChange={() => { }} />
                    </div>
                </fieldset>}
            </div>
        </>
    )
}
