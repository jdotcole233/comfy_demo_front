/* eslint-disable no-throw-literal */
import React from 'react'
import { useMutation } from "@apollo/client"
import swal from 'sweetalert'
import { PLACE_OFFER } from '../../../graphql/mutattions'
import { SINGLE_OFFER } from '../../../graphql/queries'

const PlaceOffer = ({ offer, remaining, disabled }) => {

    const [placeOffer] = useMutation(PLACE_OFFER, {
        variables: {
            offer_id: offer?.offer_id,
            placed_offer: offer?.facultative_offer - remaining
        },
        refetchQueries: [{ query: SINGLE_OFFER, variables: { offer_id: offer?.offer_id } }]
    })

    const handlePlaceOffer = () => {
        swal({
            icon: "warning",
            title: "Place offer ?",
            text: `Placed offer at ${offer?.facultative_offer - remaining}% out of ${offer?.facultative_offer}% .This operation would recompute the values for Facultative Offer`,
            buttons: ["No", { text: "Yes", closeModal: false }],
            closeOnClickOutside: false,
            closeOnEsc: false
        }).then(input => {
            if (!input) throw null
            placeOffer().then(res => {
                swal("Success", "The Offer has been placed", "success")
            }).catch(err => {

                swal("Whoops!!", "Error placing offer", "error")
            })
        })
    }

    return (
        <>
            <button disabled={disabled} onClick={handlePlaceOffer} className="btn btn-info btn-sm w-md ">Place Offer</button>
        </>
    )
}

export default PlaceOffer
