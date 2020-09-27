import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./char.css"
import 'jodit/build/jodit.min.css';
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { ApolloProvider } from "react-apollo";
import client from "./graphql";
import AuthProvider from "./context/AuthContext";
import { ToastProvider } from "react-toast-notifications";

const Renderer = () => (
  <ApolloProvider client={client}>
    <ToastProvider autoDismiss placement="bottom-center">
      <AuthProvider>
        <App />
      </AuthProvider>
    </ToastProvider>
  </ApolloProvider>
);

ReactDOM.render(<Renderer />, document.getElementById("root"));

serviceWorker.unregister();
