import React from "react";
import ReactDOM from "react-dom";
import "./char.css"
import 'react-tabs/style/react-tabs.css';
import 'jodit/build/jodit.min.css';
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { ApolloProvider } from "@apollo/client";
import client from "./graphql";
import AuthProvider from "./context/AuthContext";
import { ToastProvider } from "react-toast-notifications";
import { Provider } from 'react-redux';
import { persistor, store } from "./redux/store";
import { PersistGate } from 'redux-persist/integration/react'
import AppProvider from "./providers/AppProvider";

const Renderer = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ApolloProvider client={client}>
        <ToastProvider autoDismiss placement="bottom-center">
          <AuthProvider>
            <AppProvider value={{ granted: false }}>
              <App />
            </AppProvider>
          </AuthProvider>
        </ToastProvider>
      </ApolloProvider>
    </PersistGate>
  </Provider>
);

ReactDOM.render(<Renderer />, document.getElementById("root"));

serviceWorker.unregister();
