// /* eslint-disable react-hooks/exhaustive-deps */
// import React, { useMemo, useState, useCallback } from 'react'
// import { useQuery } from "@apollo/client"
// import { ALLOFFERS, OFFERS } from '../../graphql/queries'
// import OfferListing from '../CreateSlip/OfferListing'
// import { generateClaimsTable } from './actions'
// import ClaimsChart from './ClaimsChart'
// import ClaimsHeader from './ClaimsHeader'
// import { columns } from './columns'

// const Claims = () => {
//     // const { register, setValue, errors, handleSubmit } = useForm();
//     const [makeClaimDrawer, setMakeClaimDrawer] = useState(false)
//     const [currency, setCurrency] = useState("GHC")
//     const [showClaimDebitNote, setShowClaimDebitNote] = useState(false)
//     const [claims, setClaims] = useState([])
//     const [claimsDistribution, setClaimsDistribution] = useState([])
//     // const [selectedOffer, setSelectedOffer] = useState(null)
//     const [offerOverview, setOfferOverview] = useState(null);
//     const [distributionList, setDistributionList] = useState(null)
//     const [viewDistribution, setViewDistribution] = useState(false);
//     const [showUpdateClaimAmount, setShowUpdateClaimAmount] = useState(false);
//     const [selectedClaim, setSelectedClaim] = useState(null);
//     const [selectedShare, setSelectedShare] = useState(null)
//     const [showClaimRequest, setShowClaimRequest] = useState(false)
//     const [showSingleClaimSendBox, setShowSingleClaimSendBox] = useState(false)
//     const [claimComment, setClaimComment] = useState("")
//     const [skip] = useState(0)
//     const { data: offers, loading, refetch } = useQuery(OFFERS, {
//         variables: {
//             offer_status: ["CLOSED"]
//         },
//         fetchPolicy: "network-only"
//     });

//     const { data: offers_all, loading: fetching, fetchMore } = useQuery(ALLOFFERS, {
//         variables: {
//             offer_status: ["CLOSED"],
//             skip
//         },
//         fetchPolicy: "cache-and-network"
//     });

//     const handleViewMakeClaimDrawer = offer => {
//         setSelectedOffer(offer);
//         setMakeClaimDrawer(true)
//     }

//     // const handleViewClaimDebitNote = share => {
//     //     setSelectedShare(share);
//     //     setShowClaimDebitNote(!showClaimDebitNote);
//     // }

//     const handleViewClaimRequest = offer => {
//         setSelectedOffer(offer);
//         setShowClaimRequest(!showClaimRequest)
//     }

//     const handleViewClaimsModal = offer => {
//         setSelectedOffer(offer);
//         // setShowClaimsModal(!showClaimsModal)
//     }

//     // const handleViewUpdateForm = claim => {
//     //     setSelectedClaim(claim);
//     //     setClaimComment(claim.claim_comment)
//     //     setShowUpdateClaimAmount(true);
//     // }

//     const allOffers = useMemo(() => generateClaimsTable({
//         offers: offers_all ? offers_all?.offers_all?.offers : [],
//         handleViewClaimRequest,
//         handleViewClaimsModal,
//         handleViewMakeClaimDrawer
//     }), [offers_all])

//     const allOffersTotal = useMemo(() => offers_all?.offers_all?.total, [offers_all])

//     const recent = useMemo(() => generateClaimsTable({
//         offers: offers ? offers?.offers?.offers : [],
//         handleViewClaimRequest,
//         handleViewClaimsModal,
//         handleViewMakeClaimDrawer
//     }), [offers])

//     const handleLoadMore = useCallback((skip) => {
//         fetchMore({
//             variables: {
//                 offer_status: ["CLOSED"],
//                 skip
//             },
//             updateQuery: (prev, { fetchMoreResult }) => {
//                 if (!fetchMoreResult) return prev;
//                 fetchMoreResult.offers_all.offers = [
//                     ...prev.offers_all.offers,
//                     ...fetchMoreResult.offers_all.offers
//                 ];
//                 return fetchMoreResult
//             }
//         })
//     })

//     return (
//         <div className="page-content">
//             <ClaimsHeader />
//             <ClaimsChart />
//             <OfferListing
//                 recent={recent}
//                 all={allOffers}
//                 fetching={fetching}
//                 loading={loading}
//                 columns={columns}
//                 setInputOffer={1}
//                 allTotal={allOffersTotal}
//                 handleLoadMore={handleLoadMore}
//             />
//         </div>
//     )
// }

// export default Claims
