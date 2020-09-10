import React from 'react'
import ReactDom from "react-dom";

const modalMountNode = document.getElementById("modal")

const Modal = () => {
    return ReactDom.createPortal(
        <>
            <div style={{ backgroundColor: "rgba(0,0,0,0.4)" }}></div>
            <div></div>
        </>,
        modalMountNode
    )
}

export default Modal
