import React from 'react'
import ReactDom from "react-dom";
import Slide from "react-reveal/Slide";
import { useWindowDimensions } from "../index";
import { AiOutlineClose } from 'react-icons/ai'

const BottomDrawer = ({ children, containerStyles = {}, height, isvisible, toggle }) => {
    const { height: R_width } = useWindowDimensions();

    return ReactDom.createPortal(
        <Slide bottom when={isvisible}>
            <div
                onClick={toggle}
                style={{
                    display: isvisible ? "block" : "none",
                    zIndex: 2000,
                    position: "fixed",
                    right: 0,
                    left: 0,
                    bottom: 0,
                    top: 0,
                    backgroundColor: "rgba(0,0,0,0.3)",
                }}
            > </div>

            <div style={{
                zIndex: 2000,
                position: "fixed",
                display: isvisible ? "block" : "none",
                right: 0,
                overflowX: !isvisible ? "hidden" : "auto",
                // top: 0,
                bottom: 0,
                height: R_width > 768 ? height : "100%",
                width: "100vw",
                backgroundColor: "#FFFFFF",
                ...containerStyles,
            }}>
                <div style={{ position: "fixed", right: 0, left: 0, backgroundColor: "#273B97", display: "flex", justifyContent: "flex-end" }}>
                    <button onClick={toggle} style={{ backgroundColor: "red", border: 0, color: "white" }}>
                        <AiOutlineClose color="#fff" size={18} />
                    </button>
                </div>
                {children}
            </div>
        </Slide>
        , document.getElementById("bottom-drawer"))
}

export default BottomDrawer