/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useReducer, useEffect, memo } from "react";
import reducer from "./AuthReducer";
import { REFRESH, SIGNOUT } from "./AuthActions";
import Cookies from "js-cookie";
import swal from "sweetalert";
import { useMutation } from "react-apollo";
import { LOGOUT } from "../graphql/mutattions/auth";

const getUserData = () => {
  const s = Cookies.getJSON("visal_re_auth");
  return s;
};

export const setToken = (token, expires) =>
  Cookies.set("visal_re_auth_token", token, { expires });

const events = [
  "load",
  "mousemove",
  "mousedown",
  "click",
  "scroll",
  "keypress",
];

export const AuthContext = createContext();

export default memo(({ children }) => {
  const [logout] = useMutation(LOGOUT);
  const [state, dispatch] = useReducer(
    reducer,
    { user: null, token: null },
    getUserData
  );

  let warnTimeout,
    logoutTimeout = null;

  const authenticate = async (values, referrer = "/admin/") => {
    setToken(values.access_token, 0.5);
    console.log(values);
    await Cookies.set(
      "visal_re_auth",
      {
        user: {
          ...values.user,
        },
        token: values.access_token,
      },
      { expires: 0.5 }
    );
    dispatch({
      type: REFRESH,
      payload: {
        user: { ...values.user },
        token: values.access_token,
      },
    });
    window.location.href = referrer;
  };

  const signOut = (e) => {
    logout()
      .then((res) => {
        Cookies.remove("visal_re_auth");
        Cookies.remove("visal_re_auth_token");
        dispatch({ type: SIGNOUT });
      })
      .catch((err) => {});
  };

  const warn = () => {
    swal({
      icon: "info",
      title: "Inactivity",
      text: "you will be logged out in a minute",
      timer: 3000,
    });
  };

  const setTimeOut = () => {
    warnTimeout = setTimeout(warn, 60 * 1000 * 45);
    logoutTimeout = setTimeout(signOut, 60 * 1000 * 45.5);
  };
  const clearTimeOut = () => {
    if (logoutTimeout) clearTimeout(logoutTimeout);
    if (warnTimeout) clearTimeout(warnTimeout);
  };
  const resetTimeout = () => {
    clearTimeOut();
    setTimeOut();
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const destroy = () => {
    clearTimeOut();
    for (const i in events) {
      window.removeEventListener(events[i], clearTimeOut);
    }
  };

  useEffect(() => {
    if (state && state.user) {
      resetTimeout();
      for (let i in events) {
        window.addEventListener(events[i], resetTimeout);
      }
      setTimeOut();
      return () => {
        destroy();
      };
    }
  }, [state, warnTimeout, logoutTimeout]);

  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch,
        authenticate,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
});
