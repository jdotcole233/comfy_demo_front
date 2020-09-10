/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useEffect, memo } from "react";
import styles from "./index.module.css";
import ReactDom from "react-dom";
import Slide from "react-reveal/Bounce";
import { useWindowDimensions } from "../index";

export const DrawerContext = createContext();


function Drawer({ children, containerStyles = {}, width, isvisible, toggle }) {
  const { width: R_width } = useWindowDimensions();
  const [closed, setclosed] = React.useState(true);
  const handleToggle = (event) => {
    setclosed(true);
    toggle();
  };

  useEffect(() => {
    if (isvisible) {
      setclosed(false);
    } else {
      setclosed(true);
    }
  }, [isvisible]);

  return  ReactDom.createPortal(
    <DrawerContext.Provider value={{ closed }}>
      <Slide right when={isvisible}>
        <div
          onClick={handleToggle}
          style={{
            display: isvisible ? "block" : "none",
            zIndex: 999,
            position: "fixed",
            right: 0,
            left: 0,
            bottom: 0,
            top: 0,
            backgroundColor: "rgba(0,0,0,0.3)",
          }}
        />
        <div
          style={{
            zIndex: 3000,
            position: "fixed",
            display: isvisible ? "block" : "none",
            right: 0,
            overflowX: !isvisible ? "hidden" : "auto",
            top: 0,
            bottom: 0,
            width: R_width > 768 ? width : "100%",
            height: "100vh",
            backgroundColor: "#262B3C",
            ...containerStyles,
          }}
          className={styles.drawer_container}
        >
          <div
            className="row"
            style={{
              backgroundColor: "#1b2133",
              height: 25,
              // padding: 10,
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <div onClick={handleToggle} className={styles.close_button}>
              X
            </div>
          </div>
          <div style={{ margin: isvisible ? 30 : 0 }}>{children}</div>
        </div>
        {/* </div> */}
      </Slide>
    </DrawerContext.Provider>,
    document.getElementById("drawer")
  );
}

export default memo(Drawer);
