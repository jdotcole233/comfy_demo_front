import React from 'react'
import PropTypes from 'prop-types'
import Slide from "react-reveal/Slide";

const Prompt = props => {
    return (
        <Slide bottom when={props.isvisible}>
            <div
                // onClick={props.toggle}
                style={{
                    display: props.isvisible ? "flex" : "none",
                    zIndex: 3000,
                    position: "fixed",
                    right: 0,
                    left: 0,
                    bottom: "18%",
                    top: 0,
                    // backgroundColor: "rgba(0,0,0,0.3)",
                    justifyContent: "center",
                    alignItems: "center"
                }}
            />
            <div style={{
                zIndex: 3000,
                position: "fixed",
                display: props.isvisible ? "block" : "none",
                right: 0,
                overflowX: !props.isvisible ? "hidden" : "auto",
                // top: 0,
                bottom: 0,
                height: "18%",
                color: "#000",
                width: "100vw",
                backgroundColor: "#fff",
            }} className="">
                {props.children}
            </div>
        </Slide>
    )
}

Prompt.propTypes = {
    isvisible: PropTypes.bool.isRequired,
    toggle: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired
}

export default Prompt