import React from "react";
import { Suspense, Fragment } from "react";
import { Switch, Route, useLocation, Redirect } from "react-router-dom";
import TopBarProgress from "react-topbar-progress-indicator";
import routes from "../routes";
import ConnectionDetector from "../components/ConnectionDetector";
import Dashboard from "../pages/Dashboard";
import Zoom from "react-reveal/Reveal";
import { useAuth } from "../context/AuthContext";

TopBarProgress.config({
  barThickness: 10,
  barColors: {
    0: "#F03B3B",
    "1.0": "#F03B3B",
  },
  shadowBlur: 5,
});

const LoadingComponent = (props) => {
  return (
    <Fragment>
      <TopBarProgress />
    </Fragment>
  );
};

const AdminContent = () => {
  const { privileges } = useAuth();

  // console.log(Offers_Access.includes(state?.user?.position))

  const getRoutes = (routes) => {
    return routes.map((el, key) => {
      const Component = el.component;
      const MainComponent = () => (
        <Zoom effect="fadeInUp">
          <Component />
        </Zoom>
      );
      return el.layout === "/admin" && privileges.includes(el.name) ? (
        <Private
          key={key}
          path={el.layout + el.path}
          exact
          component={MainComponent}
        />
      ) : null;
    });
  };

  return (
    <div className="main-content bg-layout">
      {/* Main Content */}
      <Suspense fallback={LoadingComponent()}>
        <ConnectionDetector />
        <Switch>
          <Private exact path="/" component={Dashboard} />
          {getRoutes(routes)}
          <Route component={null} />
        </Switch>
      </Suspense>

      <footer className="footer">
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-6">
              {new Date().getFullYear()}© KEK Reinsurance Brokers Ltd
            </div>
            <div className="col-sm-6">

            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AdminContent;

const Private = React.memo((props) => {
  const { user } = useAuth();
  const { pathname } = useLocation();
  return !user ? (
    <Redirect to={{ pathname: "/auth", state: { pathname } }} />
  ) : (
    <Route {...props} />
  );
});
