/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useReducer, memo, useContext } from 'react';
import reducer from './AuthReducer';
import { REFRESH, SIGNOUT } from './AuthActions';
import Cookies from 'js-cookie';
import swal from 'sweetalert';
import { useMutation } from 'react-apollo';
import { LOGOUT } from '../graphql/mutattions/auth';
import IdleTimer from 'react-idle-timer';

const TIMEOUT = 60 * 1000 * 30;

const getUserData = () => {
  const s = Cookies.getJSON('visal_re_auth');
  return s;
};

export const setToken = (token, expires) =>
  Cookies.set('visal_re_auth_token', token, { expires });


export const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}


export default memo(({ children }) => {
  const [logout] = useMutation(LOGOUT);
  const [state, dispatch] = useReducer(
    reducer,
    { user: null, token: null },
    getUserData
  );

  const authenticate = async (values, referrer = '/admin/') => {
    setToken(values.access_token, 0.5);
    console.log(values);
    await Cookies.set(
      'visal_re_auth',
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
        Cookies.remove('visal_re_auth');
        Cookies.remove('visal_re_auth_token');
        dispatch({ type: SIGNOUT });
      })
      .catch((err) => { });
  };

  const warn = () => {
    if (state && state.user) {
      swal({
        icon: 'info',
        title: 'Inactivity',
        text: 'you will be logged out in a minute',
        timer: 1000 * 60 * 0.5,
        buttons: [
          'Logout',
          {
            text: 'Keep My Session active',
          },
        ],
      }).then((input) => {
        if (!input) {
          return signOut();
        }
      });
    }
    return;
  };

  return (
    <IdleTimer timeout={TIMEOUT} onIdle={warn}>
      <AuthContext.Provider
        value={{
          state,
          dispatch,
          user: state?.user,
          authenticate,
          signOut,
        }}
      >
        {children}
      </AuthContext.Provider>
    </IdleTimer>
  );
});
