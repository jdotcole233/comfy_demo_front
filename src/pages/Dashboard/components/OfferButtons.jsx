import React, { useState } from 'react'
import { Link } from "react-router-dom"
import ViewOfferDetails from '../../Insurers/ViewInsurerOffer'
import { Drawer } from '../../../components'


const OfferButtons = ({ offer }) => {
    const [viewOffer, setViewOffer] = useState(false);
    const [selectedOffer, setSelectedOffer] = useState(null)

    const hanldePreviewOffer = offerFromClick => {
        setSelectedOffer(offerFromClick)
        setViewOffer(true)
    }

    return (
        <div>
            <>
                <button type="button" onClick={(e) => hanldePreviewOffer(offer)} className="btn btn-info btn-sm w-md m-1">Preview Offer</button>
                <Link to={{
                    pathname: "/admin/view-offer",
                    state: { offer_id: offer.offer_id }
                }} className="btn btn-primary btn-sm w-md m-1">View Details</Link>
            </>


            <Drawer width="40%" isvisible={viewOffer} toggle={() => setViewOffer(!viewOffer)}>
                <ViewOfferDetails data={selectedOffer} />
            </Drawer>
        </div>
    )
}

export default OfferButtons
