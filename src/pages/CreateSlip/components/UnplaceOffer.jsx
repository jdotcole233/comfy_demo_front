/* eslint-disable no-throw-literal */
import React from 'react'
import { useMutation } from 'react-apollo'
import swal from 'sweetalert'
import { UNPLACE_OFFER } from '../../../graphql/mutattions'
import { SINGLE_OFFER } from '../../../graphql/queries'

const UnplaceOffer = ({ offer, remaining }) => {

    const [unplaceOffer] = useMutation(UNPLACE_OFFER, {
        variables: {
            offer_id: offer?.offer_id,
        },
        refetchQueries: [{ query: SINGLE_OFFER, variables: { offer_id: offer?.offer_id } }]
    })

    const handleUnPlaceOffer = () => {
        swal({
            icon: "warning",
            title: "Unplace offer ?",
            text: `This operation would recompute the values using ${offer?.facultative_offer}% for Facultative Offer`,
            buttons: ["No", { text: "Yes", closeModal: false }],
            closeOnClickOutside: false,
            closeOnEsc: false
        }).then(input => {
            if (!input) throw null
            unplaceOffer().then(res => {
                swal("Success", "The Offer has been unplaced", "success")
            }).catch(err => {

                swal("Whoops!!", "Error unplacing offer", "error")
            })
        })
    }

    return (
        <>
            <button onClick={handleUnPlaceOffer} className="btn btn-danger btn-sm w-md ">Unplace Offer</button>
        </>
    )
}

export default UnplaceOffer
