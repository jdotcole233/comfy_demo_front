/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useContext, useEffect } from 'react'
import styles from './styles/inputOffer.module.css'
import { useForm } from 'react-hook-form';
import { useQuery, useMutation } from 'react-apollo'
import { INPUT_OFFER_QUERIES, OFFERS, SINGLE_OFFER } from '../../graphql/queries';
import currencies from '../../assets/currencies.json'
import { UPDATE_OFFER } from '../../graphql/mutattions';
import swal from 'sweetalert';
import { DrawerContext } from '../../components/Drawer'
import { Selector, InsurerOption, CurrencyOption, Loader, Editor } from '../../components';
import { AuthContext } from '../../context/AuthContext';
// import JoditEditor from "jodit-react";
import { prepVariables } from './InputOffer'


export default function InputOffer({ offer_id, toggle }) {
    // const offer = JSON.parse(_offer)
    const { closed } = useContext(DrawerContext);
    const { state } = useContext(AuthContext);
    const formRef = useRef()
    const { data } = useQuery(INPUT_OFFER_QUERIES);
    const { register, errors, handleSubmit, reset, setValue, clearError } = useForm()
    const [offer_comment, fillComment] = useState("")
    const [nkrol, setNkrol] = useState(false)
    // const [myComment, setMyComment] = useState("")

    const [classOfBusiness, setClassOfBusiness] = useState(null);
    const [offerDetails, setofferDetails] = useState([])
    const [selectedInsurer, setSelectedInsurer] = useState("")
    const [selectedBusiness, setSelectedBusiness] = useState("")
    const [selectedCurrency, setSelectedCurrency] = useState("")
    const [infoContent, setInfoContent] = useState("")

    const { data: _offer, loading } = useQuery(SINGLE_OFFER, {
        variables: {
            offer_id,
        },
        fetchPolicy: "network-only",
    });

    const [updateOffer] = useMutation(UPDATE_OFFER, {
        refetchQueries: [{ query: OFFERS, variables: { offer_status: ["OPEN", "PENDING"] } }]
    });
    const offer = _offer?.findSingleOffer

    useEffect(() => {
        if (_offer) {
            console.log(offer)
            setValue("policy_number", offer.offer_detail?.policy_number)//insurance_company
            setValue("insurer_id", offer.insurer?.insurer_id)//insurance_company
            setValue("class_of_business_id", offer.classofbusiness?.class_of_business_id)//insurance_company
            setSelectedBusiness(offer.classofbusiness.business_name)
            setValue("commission", offer.commission)
            setValue("brokerage", offer.brokerage)
            setValue("facultative_offer", offer.facultative_offer)
            setValue("sum_insured", offer.sum_insured)
            setValue("premium", offer.premium)
            setValue("rate", offer.rate)
            setValue("insured_by", offer.offer_detail.insured_by)
            setValue("currency", offer.offer_detail.currency)
            console.log("Offer Comment", offer.offer_detail.offer_comment?.toString())
            console.log("Info Comment", offer.offer_detail.information_comment?.toString())
            setValue("offer_comment", offer.offer_detail.offer_comment)
            setofferDetails(JSON.parse(offer.offer_detail.offer_details))
            setValue("period_of_insurance_from", offer.offer_detail.period_of_insurance_from)
            setValue("period_of_insurance_to", offer.offer_detail.period_of_insurance_to)
            setSelectedInsurer(offer.insurer.insurer_company_name)
            setClassOfBusiness(JSON.parse(offer.offer_detail.offer_details))
            setSelectedCurrency(offer.offer_detail.currency)
            setInfoContent(offer.offer_detail.information_comment?.toString())
            setValue("information_comment", offer.offer_detail.information_comment?.toString())
            setNkrol(offer.offer_detail.information_comment ? true : false)
            fillComment(offer.offer_detail.offer_comment)
        }

    }, [_offer])

    // useEffect(() => {
    //     if (_offer) {
    //         // setMyComment(offer.offer_detail.offer_comment)
    //     }

    // }, [_offer])

    const handleCurrencyChange = value => {
        setValue("currency", value ? value.value.code : "");
        setSelectedCurrency(value ? value.value.code : offer.offer_detail.currency)
        if (value) {
            clearError("currency")
        }
    }

    const handleInsuranceCompanyChange = value => {
        setSelectedInsurer(value ? value.value.insurer_company_name : offer.insurer.insurer_company_name)
        setValue("insurer_id", value ? value.value.insurer_id : "");
        if (value) {
            clearError("insurer_id")
        }
    }

    const handleCommentChange = value => {
        setValue("offer_comment", value)
        fillComment(value)
        if (value) {
            clearError("offer_comment")
        }
    }

    const handleInfoCommentChange = value => {
        setValue("information_comment", value)
        setInfoContent(value)
        if (value) {
            clearError("information_comment")
        }
    }

    useEffect(() => {
        if (closed) {
            reset()
        }
    }, [closed, reset])


    const handleClassOfBusinessChange = cob => {
        setValue("class_of_business_id", cob ? cob.value.class_of_business_id : "");
        setSelectedBusiness(cob ? cob.value.business_name : offer.classofbusiness.business_name)
        setClassOfBusiness(cob ? cob.value : null)
        setofferDetails(cob ? JSON.parse(cob.value.business_details) : JSON.parse(offer.offer_detail.offer_details))
    }

    const handleDetailsChange = (e, index) => {
        const { value } = e.target;
        const inputs = [...offerDetails];
        inputs[index]["value"] = value
        setofferDetails(inputs)
    }

    const handleCreateOffer = values => {
        console.log(offerDetails);
        const variables = {
            offer_id: offer?.offer_id,
            offer_detail_id: offer?.offer_detail?.offer_detail_id,
            offer_input: prepVariables(values, offerDetails, state.user.employee.employee_id),
        }
        swal({
            icon: "warning",
            title: "Are you sure you want to update offer ?",
            closeOnClickOutside: false,
            closeOnEsc: false,
            buttons: ["No", {
                text: "Yes",
                closeModal: false
            }],
        }).then(input => {
            // eslint-disable-next-line no-throw-literal
            if (!input) throw null
            updateOffer({ variables }).then(res => {
                swal("Success", "Facultative offer updated Successfully", "success");
                formRef.current.reset()
                toggle()
            }).catch(err => {
                if (err) {
                    swal("Oh noes!", "The AJAX request failed!", "error");
                } else {
                    swal.stopLoading();
                    swal.close();
                }
            })
        })
    }



    if (loading && !offer) return <Loader />
    return (
        <form onSubmit={handleSubmit(handleCreateOffer)} ref={formRef} >
            <div className={styles.card_header}>
                <h2 className={styles.card_title}>Create facultative placement slip</h2>
            </div>
            <div className={styles.card_body}>
                <div className="row">
                    <div className="col-md-12">
                        <div className="form-group">
                            <label htmlFor="BusinessClass">Insurance Company</label>
                            <Selector value={{ label: selectedInsurer }} placeholder="Insurance company" onChange={handleInsuranceCompanyChange} components={{ Option: InsurerOption }} options={data ? data.insurers.map(insurer => ({ label: insurer.insurer_company_name, value: insurer })) : []} />
                            <input ref={register({
                                required: "Insurance company is required"
                            })} type="hidden" name="insurer_id" />
                            {errors.insurer_id && <p className="text-danger">{errors.insurer_id.message}</p>}
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="form-group">
                            <label htmlFor="BusinessClass">Business Class</label>
                            <Selector value={{ label: selectedBusiness }} onChange={handleClassOfBusinessChange} options={data ? data.classOfBusinesses.map(cob => ({ label: cob.business_name, value: cob })) : []} placeholder="Business Class" />
                            <input ref={register({
                                required: "Business class is required"
                            })} type="hidden" name="class_of_business_id" />
                            {errors.class_of_business_id && <p className="text-danger">{errors.class_of_business_id.message}</p>}
                        </div>
                    </div>

                </div>
                {classOfBusiness && offerDetails.length ? (<fieldset className="w-auto p-2 border-form">
                    <legend className={styles.details_title}>Business class details</legend>
                    <div className="row">
                        {offerDetails.map((cob, key) => (
                            <div className="col-md-6" key={key}>
                                <div className="form-group">
                                    <label htmlFor="Type of goods">{cob.keydetail}</label>
                                    <input ref={register({ required: "Required" })} value={cob.value} name={`${cob.keydetail}`} onChange={e => handleDetailsChange(e, key)} type="text" className="form-control" placeholder={cob.keydetail} />
                                    {errors[`${cob.keydetail}`] && <p className="text-danger">{errors[`${cob.keydetail}`].message}</p>}
                                </div>
                            </div>
                        ))}
                    </div>
                </fieldset>) : null}
                <fieldset className="w-auto p-2 border-form">
                    <legend className={styles.details_title}>Offer Details</legend>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="Type of goods">Policy no.</label>
                                <input name="policy_number" ref={register({ required: false })} type="text" className="form-control" placeholder="Policy no." />
                                {errors.policy_number && <p className="text-danger">{errors.policy_number.message}</p>}
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="Type of goods">Insured</label>
                                <input name="insured_by" ref={register({ required: "Provide insured by" })} type="text" className="form-control" placeholder="Insured" />
                                {errors.insured_by && <p className="text-danger">{errors.insured_by.message}</p>}
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="Type of goods">Sum Insured</label>
                                <input ref={register({ required: "Provide sum insured" })} name="sum_insured" type="text" className="form-control" placeholder="Sum Insured" />
                                {errors.sum_insured && <p className="text-danger">{errors.sum_insured.message}</p>}
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="Type of goods">Rate (%)</label>
                                <input name="rate" ref={register({ required: false })} type="text" className="form-control" placeholder="Rate" />
                                {errors.rate && <p className="text-danger">{errors.rate.message}</p>}
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="Type of goods">Premium</label>
                                <input name="premium" ref={register({ required: "Provide premium" })} type="text" className="form-control" placeholder="Premium" />
                                {errors.premium && <p className="text-danger">{errors.premium.message}</p>}

                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="Type of goods">Facultative Offer (%)</label>
                                <input name="facultative_offer" ref={register({ required: "Provide facultative offer" })} type="text" className="form-control" placeholder="Facultative Offer" />
                                {errors.facultative_offer && <p className="text-danger">{errors.facultative_offer.message}</p>}

                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="Type of goods">Commision (%)</label>
                                <input type="text" ref={register({ required: "Provide commission" })} name="commission" className="form-control" placeholder="Commision" />
                                {errors.commission && <p className="text-danger">{errors.commission.message}</p>}
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="Type of goods">Preliminary Brokerage (%)</label>
                                <input type="text" ref={register({ required: "Provide preliminary brokerage" })} name="brokerage" className="form-control" placeholder="Preliminary Brokerage" />
                                {errors.brokerage && <p className="text-danger">{errors.brokerage.message}</p>}
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="form-group">
                                <label htmlFor="Type of goods">Currency</label>
                                <Selector value={{ label: Object.values(currencies).find(eel => eel.code === selectedCurrency)?.name }} components={{ Option: CurrencyOption }} onChange={handleCurrencyChange} options={[...Object.values(currencies).map(currency => ({ label: currency.name, value: currency }))]} />
                                <input ref={register({
                                    required: "Currency is required"
                                })} type="hidden" name="currency" list="currencies" placeholder="Currency" className="form-control" />
                                {errors.currency && <p className="text-danger">{errors.currency.message}</p>}
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
                                <input type="date" ref={register({ required: "Provide date" })} name="period_of_insurance_from" className="form-control" placeholder="From" />
                                {errors.from && <p className="text-danger">{errors.from.message}</p>}
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="Type of goods">To</label>
                                <input type="date" ref={register({ required: "Provide date" })} name="period_of_insurance_to" className="form-control" placeholder="To" />
                                {errors.to && <p className="text-danger">{errors.to.message}</p>}
                            </div>
                        </div>
                    </div>
                </fieldset>
                {!offer_comment && <fieldset className="w-auto p-2 border-form">
                    <legend className={styles.details_title}>Comment</legend>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="form-group">
                                <Editor value={offer_comment} onChange={handleCommentChange} />
                                <textarea hidden rows={10} name="offer_comment" ref={register({ required: false })} className="form-control" ></textarea>
                                {errors.offer_comment && <p className="text-danger">{errors.offer_comment.message}</p>}
                            </div>
                        </div>
                    </div>
                </fieldset>}
                {offer_comment && <fieldset className="w-auto p-2  border-form">
                    <legend className={styles.details_title}>Comment</legend>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="form-group">
                                <Editor value={offer_comment} onChange={handleCommentChange} />
                                <textarea hidden rows={10} ref={register({ required: nkrol })} value={offer_comment} name="offer_comment" className="form-control" placeholder="Add Comment" ></textarea>
                                {errors.information_comment && <p className="text-danger">{errors.information_comment.message}</p>}
                            </div>
                        </div>
                    </div>
                </fieldset>}
                <div className="w-auto p-2">
                    <div className="form-check">
                        <input type="checkbox" checked={nkrol} className="form-check-input" id="exampleCheck1" onChange={e => setNkrol(e.target.checked)} />
                        <label className="form-check-label" htmlFor="exampleCheck1">Include NKORL information to placing slip</label>
                    </div>
                </div>
                {nkrol && <fieldset className="w-auto p-2  border-form">
                    <legend className={styles.details_title}>NKORL</legend>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="form-group">
                                <Editor value={infoContent} onChange={handleInfoCommentChange} />
                                <textarea hidden rows={10} ref={register({ required: nkrol })} value={infoContent} name="information_comment" className="form-control" placeholder="Add Comment" ></textarea>
                                {errors.information_comment && <p className="text-danger">{errors.information_comment.message}</p>}
                            </div>
                        </div>
                    </div>
                </fieldset>}
                <div className="form-group">
                    <input type="submit" className="btn btn-primary btn-sm form-control my-2" value="update offer" />
                </div>
            </div>
        </form>
    )
}
