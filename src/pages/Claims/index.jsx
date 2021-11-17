/* eslint-disable no-throw-literal */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useContext, useMemo, useCallback } from 'react'
import { Alert } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { Drawer, Modal, CurrencyValues, Datatable, Loader, Editor } from '../../components';
import Chart from 'react-apexcharts'
import styles from './styles/card.module.css'
import MakeClaim from './MakeClaim';
import { columns, claimsColumns, distributionsColumns } from './columns'
import { useQuery, useMutation } from "@apollo/client";
import { OFFERS, CLAIM_OVERVIEW, ALLOFFERS } from '../../graphql/queries';
import { REMOVE_CLAIM_AMOUNT, UPDATE_CLAIM_AMOUNT } from '../../graphql/mutattions';
import swal from 'sweetalert';
import PreViewClaimDebitNote from './PreViewClaimDebitNote';
import ClaimRequest from './ClaimRequest'
import OfferListing from '../CreateSlip/OfferListing'
import { editAccessRoles } from '../../layout/adminRoutes';
import { AuthContext } from '../../context/AuthContext';
import SendSingleDebitNote from './SendSingleClaimDebitNote'
import { generateClaimsTable } from './actions';


const currency_key = {
    GHC: "total_cedis",
    USD: "total_dollar",
    EUR: "total_euros",
    GBP: "total_pounds",
}


function Claims() {
    const { state: { user } } = useContext(AuthContext)
    const { data: overview } = useQuery(CLAIM_OVERVIEW, { fetchPolicy: "network-only" });
    const [skip] = useState(0)
    const { data: offers, loading, refetch } = useQuery(OFFERS, {
        variables: {
            offer_status: ["CLOSED"]
        },
        fetchPolicy: "network-only"
    });

    const { data: offers_all, loading: fetching, fetchMore } = useQuery(ALLOFFERS, {
        variables: {
            offer_status: ["CLOSED"],
            skip
        },
        fetchPolicy: "cache-and-network"
    });

    const { register, setValue, errors, handleSubmit } = useForm();
    const [makeClaimDrawer, setMakeClaimDrawer] = useState(false)
    const [currency, setCurrency] = useState("GHC")
    const [showClaimDebitNote, setShowClaimDebitNote] = useState(false)
    const [claims, setClaims] = useState([])
    const [claimsDistribution, setClaimsDistribution] = useState([])
    const [selectedOffer, setSelectedOffer] = useState(null)
    const [offerOverview, setOfferOverview] = useState(null);
    const [distributionList, setDistributionList] = useState(null)
    const [viewDistribution, setViewDistribution] = useState(false);
    const [showUpdateClaimAmount, setShowUpdateClaimAmount] = useState(false);
    const [selectedClaim, setSelectedClaim] = useState(null);
    const [selectedShare, setSelectedShare] = useState(null)
    const [showClaimRequest, setShowClaimRequest] = useState(false)
    const [showSingleClaimSendBox, setShowSingleClaimSendBox] = useState(false)
    const [claimComment, setClaimComment] = useState("")
    // const [hasComment, setHasComment] = useState(true)
    //handle the deletion of claim amount
    const [removeClaim] = useMutation(REMOVE_CLAIM_AMOUNT, {
        refetchQueries: [
            {
                query: OFFERS, variables: {
                    offer_status: ["CLOSED"],
                    skip
                }
            },
            {
                query: ALLOFFERS, variables: {
                    offer_status: ["CLOSED"],
                    skip
                }
            }
        ]
    });
    const [updateClaimAmount] = useMutation(UPDATE_CLAIM_AMOUNT, {
        refetchQueries: [
            {
                query: OFFERS, variables: {
                    offer_status: ["CLOSED"],
                    skip
                }
            },
            {
                query: ALLOFFERS, variables: {
                    offer_status: ["CLOSED"],
                    skip
                }
            }
        ]
    });
    // const [sendClaimDebitNote] = useMutation(SEND_CLAIM_DEBIT_NOTE);






    useEffect(() => {
        if (selectedOffer) {
            const rows = [];
            selectedOffer.offer_claims.map((claim, key) => {
                const row = {
                    claim_amount: selectedOffer?.offer_detail?.currency + " " + claim.claim_amount,
                    claim_date: new Date(claim.claim_date).toDateString(),
                    created_at: new Date(claim.created_at).toDateString(),
                    actions: (
                        <>
                            <button onClick={() => {
                                setViewDistribution(true)
                                setDistributionList(claim);
                            }} className="btn btn-sm w-md btn-primary mr-1">Reinsurer's claim share</button>
                            {editAccessRoles.includes(user?.user_role?.position) && <button onClick={() => handleViewUpdateForm(claim)} className="btn btn-sm w-md btn-info mr-1">Modify claim</button>}
                            {["System Administrator"].includes(user?.user_role?.position) && <button onClick={() => removeClaimAmount(claim)} className="btn btn-sm w-md btn-danger">Remove claim</button>}
                        </>
                    )
                }
                rows.push(row);
                return row;
            })
            setClaims(rows)
        }
    }, [selectedOffer])

    useEffect(() => {
        if (distributionList) {
            const rows = [];
            distributionList.offer_claim_participants.map((shares) => {
                const row = {
                    reinsurer: shares.re_company_name,
                    claim_amount: selectedOffer?.offer_detail?.currency + " " + distributionList.claim_amount,
                    percentage: shares.offer_participant_percentage,
                    actual_claim: selectedOffer?.offer_detail?.currency + " " + shares.claim_share,
                    created_at: new Date(shares.created_at).toDateString(),
                    actions: (
                        <>
                            <button onClick={() => handleViewClaimDebitNote(shares)} className="btn btn-sm btn-primary mr-1">Preview</button>
                            <button onClick={() => handleSendSingleClaimDebitNote(shares)} className="btn btn-sm btn-success">Send</button>
                        </>
                    )
                }

                rows.push(row);
                return row;
            })
            setClaimsDistribution(rows)
        }
    }, [distributionList])


    useEffect(() => {
        if (selectedClaim) {
            setValue("claim_amount", selectedClaim.claim_amount);
            setValue("claim_date", selectedClaim.claim_date);
            setValue("claim_comment", selectedClaim.claim_comment)
        }
    }, [selectedClaim, showUpdateClaimAmount]);

    const handleViewMakeClaimDrawer = offer => {
        setSelectedOffer(offer);
        setMakeClaimDrawer(true)
    }

    const handleViewClaimDebitNote = share => {
        setSelectedShare(share);
        setShowClaimDebitNote(!showClaimDebitNote);
    }

    const handleViewClaimRequest = offer => {
        setSelectedOffer(offer);
        setShowClaimRequest(!showClaimRequest)
    }

    const handleViewClaimsModal = offer => {
        setSelectedOffer(offer);
        setShowClaimsModal(!showClaimsModal)
    }

    const handleViewUpdateForm = claim => {
        // alert(JSON.stringify(claim))
        setSelectedClaim(claim);
        setClaimComment(claim.claim_comment)
        setShowUpdateClaimAmount(true);
    }

    useEffect(() => {
        if (!showUpdateClaimAmount) {
            setSelectedClaim(null)
            setClaimComment("")
        }
    }, [showUpdateClaimAmount])




    const handleSendSingleClaimDebitNote = data => {
        setSelectedShare(data);
        // console.log(selectedOffer)
        setShowClaimsModal(false);
        setViewDistribution(false)
        setShowSingleClaimSendBox(!showSingleClaimSendBox)
        return;
    }

    const generateArray = (data, curr) => {
        const keys = Object.keys(data);
        const newKeys = keys.map(key => parseInt(key)).sort((a, b) => a - b)
        const arr = newKeys.map(key => {
            return data[(key < 10) ? ("0" + key) : key][currency_key[curr]]
        })
        return arr
    }

    const options = {
        chart: { height: 300, type: "bar", toolbar: { show: !1 } },
        plotOptions: {
            bar: { horizontal: !1, columnWidth: "14%", endingShape: "rounded" },
        },
        dataLabels: { enabled: !1 },
        stroke: { show: !0, width: 2, colors: ["transparent"] },
        series: [
            {
                name: "Revenue",
                data: offerOverview ? generateArray(offerOverview.total_claims_per_month, currency) : [42, 85, 101, 56, 37, 105, 38, 58, 92, 82, 72, 32],
            },
        ],
        xaxis: {
            categories: [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
            ],
        },
        yaxis: { title: { text: `${currency} (thousands)` } },
        fill: { opacity: 1 },
        colors: ["#556ee6"],
    }

    const options1 = {
        series: offerOverview ? [...offerOverview.top_five_businesses.slice(0, 5).map(t => parseFloat(t.total_claims))] : [44, 55, 13, 33],
        labels: offerOverview ? [...offerOverview.top_five_businesses.slice(0, 5).map(t => t.insurer_company_name)] : ['Apple', 'Mango', 'Orange', 'Watermelon']
    }
    const [showClaimsModal, setShowClaimsModal] = useState(false)
    // 
    const handleUpdateClaimAmount = values => {
        swal({
            icon: "warning",
            closeOnClickOutside: false,
            title: "Are you sure ?",
            buttons: ["No", { text: "Yes", closeModal: false }]
        }).then(input => {
            if (!input) throw null;
            updateClaimAmount({
                variables: {
                    claim_id: selectedClaim?.offer_claim_id,
                    data: {
                        offer_id: selectedOffer?.offer_id,
                        claim_amount: values.claim_amount,
                        claim_date: values.claim_date,
                        claim_comment: values.claim_comment
                    }
                }
            }).then(res => {
                setShowClaimsModal(false);
                setShowUpdateClaimAmount(false)
                swal("Success", "Claim updated successfully", "success");
                refetch()
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

    const removeClaimAmount = offer_Claim => {
        setShowClaimsModal(!showClaimsModal);
        swal({
            icon: "warning",
            closeOnClickOutside: false,
            title: "Are you sure ?",
            buttons: ["No", { text: "Yes", closeModal: false }]
        }).then(input => {
            if (!input) throw null;
            removeClaim({
                variables: {
                    id: offer_Claim.offer_claim_id,
                    offer_id: selectedOffer?.offer_id
                }
            }).then(res => {
                swal("Success", "Claim removed successfully", "success");
                refetch()
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

    useEffect(() => {
        if (overview) {
            const data = JSON.parse(overview.claimOverview);

            setOfferOverview(data.claimOverview);
        }
    }, [overview]);


    const allOffers = useMemo(() => generateClaimsTable({
        offers: offers_all ? offers_all?.offers_all?.offers : [],
        handleViewClaimRequest,
        handleViewClaimsModal,
        handleViewMakeClaimDrawer
    }), [offers_all])

    const allOffersTotal = useMemo(() => offers_all?.offers_all?.total, [offers_all])

    const recent = useMemo(() => generateClaimsTable({
        offers: offers ? offers?.offers?.offers : [],
        handleViewClaimRequest,
        handleViewClaimsModal,
        handleViewMakeClaimDrawer
    }), [offers])



    const handleLoadMore = useCallback((skip) => {
        fetchMore({
            variables: {
                offer_status: ["CLOSED"],
                skip
            },
            updateQuery: (prev, { fetchMoreResult }) => {
                if (!fetchMoreResult) return prev;
                fetchMoreResult.offers_all.offers = [
                    ...prev.offers_all.offers,
                    ...fetchMoreResult.offers_all.offers
                ];
                return fetchMoreResult
            }
        })
    })


    return (
        <>
            {loading && <Loader />}
            {!loading && offers && (<div className="page-content">
                <div className="col-xl-12 mt-">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card mini-stats-wid">
                                <div className="card-body">
                                    <div className="media">
                                        <div className="media-body">
                                            <p className="text-muted font-weight-medium">Overall Claims</p>
                                            <h4 className="mb-0">{overview ? JSON.parse(overview?.claimOverview).claimOverview.total_claims : 0}</h4>
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
                        <div className="col-md-6">
                            <div className="card mini-stats-wid">
                                <div className="card-body">
                                    <div className="media">
                                        <div className="media-body">
                                            <p className="text-muted font-weight-medium">Overall claims by currency</p>
                                            <CurrencyValues data={overview ? JSON.parse(overview?.claimOverview).claimOverview.total_claim_amounts : {}} />
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
                        <div className="col-md-6">
                            <div className="card mini-stats-wid">
                                <div className="card-body">
                                    <div className="media">
                                        <div className="media-body">
                                            <p className="text-muted font-weight-medium">Total Claims </p>
                                            {/* <h4 className="mb-0">$35, 723</h4> */}
                                            <CurrencyValues />
                                        </div>

                                        <div className="avatar-sm rounded-circle bg-primary align-self-center mini-stat-icon">
                                            <span className="avatar-title rounded-circle bg-primary">
                                                <i className="bx bx-archive-in font-size-24"></i>
                                            </span>
                                        </div>


                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="container-fluid">
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <h4 className="card-title mb-4">Total Claims</h4>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="row">
                                                <div className="col-md-2">
                                                    <label htmlFor="">Filter</label>
                                                </div>
                                                <div className="col-md-10">
                                                    <select name="" className="form-control" onChange={(e) => setCurrency(e.target.value)} id="">
                                                        <option value="GHC">GHC</option>
                                                        <option value="USD">USD</option>
                                                        <option value="GBP">GBP</option>
                                                        <option value="EUR">EUR</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div id="revenue-chart" className="apex-charts">
                                        <Chart height={300} options={options} series={options.series} type="bar" />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <h4 className="card-title mb-4">Top 5 companies</h4>
                                    <div id="revenue-chart" className="apex-charts">
                                        <Chart height={300} type="donut" options={options1} series={options1.series} />
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <OfferListing
                    path="/admin/claims"
                    recent={recent}
                    all={allOffers}
                    fetching={fetching}
                    loading={loading}
                    columns={columns}
                    setInputOffer={1}
                    allTotal={allOffersTotal}
                    handleLoadMore={handleLoadMore}
                />


                {/* Create business modal */}
                <Drawer width="40%" toggle={() => setMakeClaimDrawer(!makeClaimDrawer)} isvisible={makeClaimDrawer} >
                    <MakeClaim offer={selectedOffer} toggle={() => setMakeClaimDrawer(!makeClaimDrawer)} />
                </Drawer>

                {/* Show Drawer for claim request */}
                <Drawer width="50%" isvisible={showClaimRequest} toggle={() => setShowClaimRequest(!showClaimRequest)}>
                    <ClaimRequest offer={selectedOffer} toggle={() => setShowClaimRequest(!showClaimRequest)} />
                </Drawer>

                {/* Preview Claim Debit Note */}
                <Drawer width="50%" isvisible={showClaimDebitNote} toggle={() => setShowClaimDebitNote(!showClaimDebitNote)}>
                    <PreViewClaimDebitNote offer={selectedOffer} claim={distributionList} shares={selectedShare} />
                </Drawer>

                <Modal centered show={showUpdateClaimAmount} onHide={() => setShowUpdateClaimAmount(false)}>
                    <Modal.Header className="bg-soft-dark" closeButton>
                        <p> Update Claim amount (<strong>{`${selectedOffer?.offer_detail?.currency} ${selectedClaim?.claim_amount}`}</strong>) made on <strong>{new Date(selectedClaim?.claim_date).toDateString()}</strong></p>
                    </Modal.Header>
                    <Modal.Body className="bg-soft-dark">
                        <Alert variant="danger">
                            <p><strong>Changes made on this claim will affect all reinsurers' participation</strong></p>
                        </Alert>
                        <form onSubmit={handleSubmit(handleUpdateClaimAmount)} className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="">Claim Amount</label>
                                    <input name="claim_amount" ref={register({ required: "Required" })} type="number" className="form-control" />
                                    {errors.claim_amount && <p className="text-danger">{errors.claim_amount.message}</p>}
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="">Claim Date</label>
                                    <input name="claim_date" ref={register({ required: "Required" })} type="date" className="form-control" />
                                    {errors.claim_date && <p className="text-danger">{errors.claim_date.message}</p>}
                                </div>
                            </div>
                            {selectedClaim && <div className="col-md-12">
                                <div className="form-group">
                                    <label htmlFor="">Claim comment</label>
                                    <Editor value={claimComment} onChange={value => setClaimComment(value)} />
                                    <input type="hidden" value={claimComment} name="claim_comment" ref={register({ required: false })} />
                                </div>
                            </div>}
                            <div className="col-md-12">
                                <div className="form-group">
                                    <input type="submit" className="btn btn-primary btn-block btn-sm" value="Update" />
                                </div>
                            </div>
                        </form>
                    </Modal.Body>
                </Modal>

                <Modal size="xl" show={showClaimsModal} onHide={() => setShowClaimsModal(!showClaimsModal)}>
                    <Modal.Header closeButton>
                        Claim History [{selectedOffer?.offer_detail?.policy_number}] - {selectedOffer?.insurer?.insurer_company_name}
                    </Modal.Header>
                    <Modal.Body>
                        <fieldset className="border p-2 mb-2">
                            <legend className={styles.details_title}>Details </legend>
                            <table className="table">
                                <tbody>
                                    <tr>
                                        <td>Facultative offer</td>
                                        <td>{selectedOffer?.facultative_offer}%</td>
                                    </tr>
                                    <tr>
                                        <td>Facultative Sum Insured</td>
                                        <td>{selectedOffer?.offer_detail?.currency} {selectedOffer?.fac_sum_insured.toLocaleString(undefined, { maximumFractionDigits: 2 })} </td>
                                    </tr>
                                    <tr>
                                        <td>Facultative Premium</td>
                                        <td>{selectedOffer?.offer_detail?.currency} {selectedOffer?.fac_premium.toLocaleString(undefined, { maximumFractionDigits: 2 })} </td>
                                    </tr>
                                </tbody>
                            </table>
                        </fieldset>
                        <Datatable columns={claimsColumns} data={claims} />
                    </Modal.Body>
                </Modal>

                {/* Modal for viewing the distribution */}
                <Modal size="xl" show={viewDistribution} onHide={() => setViewDistribution(!viewDistribution)}>
                    <Modal.Header closeButton>
                        Claim History [{selectedOffer?.offer_detail?.policy_number}]
                </Modal.Header>
                    <Modal.Body>
                        {/* <div className="row d-flex justify-content-end">
                            <button onClick={handleSendAllClaimDebitNote} className="btn btn-sm w-md btn-success">Send All</button>
                        </div> */}
                        <Datatable columns={distributionsColumns} data={claimsDistribution} />
                    </Modal.Body>
                </Modal>


                {/*  */}

                <Drawer isvisible={showSingleClaimSendBox} toggle={() => setShowSingleClaimSendBox(!showSingleClaimSendBox)} width="50%">
                    <SendSingleDebitNote share={selectedShare} reinsurer_id={selectedShare?.reinsurer_id} offer={selectedOffer} toggle={() => setShowSingleClaimSendBox(!showSingleClaimSendBox)} />
                </Drawer>

            </div>)}
        </>
    )
}


export default Claims