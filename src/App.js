import React from "react";
import Admin from "./layout/Admin";
import Auth from "./layout/Auth";
import Push from "push.js";
import Detector from "./components/ConnectionDetector";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

function App() {
  React.useEffect(() => {
    if (!Push.Permission.has()) {
      Push.Permission.request(onGranted, onDenied);
      Push.Permission.get();
    }
  }, []);

  const onGranted = () => { };
  const onDenied = () => { };

  return (
    <>
      <Detector />
      <Router>
        <Switch>
          <Route path="/admin" render={(props) => <Admin {...props} />} />
          <Route path="/auth" render={(props) => <Auth {...props} />} />
          <Redirect from="/" to="/auth" />
        </Switch>
      </Router>
    </>
  )
}

export default App;
