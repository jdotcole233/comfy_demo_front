import React from 'react'
import swal from 'sweetalert'


const OfferButton = () => {
    const handleReinstate = () => {
        swal({
            title: "Are you sure?",
            text: "You will be able to edit this offer again!",
            icon: "warning",
            buttons: ["No", { text: "Reinstate", closeModal: false }],
            dangerMode: true,
        }).then((willReinstate) => {
            if (willReinstate) {
                swal("Offer reinstated!", {
                    icon: "success",
                });
            } else {
                swal("Offer not reinstated!",{icon: "error"});
            }
        }).catch(err => {
            console.log(err)
        });
    }
    return (
        <>
            <button onClick={handleReinstate} className="btn btn-warning btn-sm w-md btn-square">Reinstate Offer</button>
        </>
    )
}

export default OfferButton
