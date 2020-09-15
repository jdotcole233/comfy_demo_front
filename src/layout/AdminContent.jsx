import React from 'react'
import { Suspense, useContext } from "react"
import { Switch, Route, useLocation, Redirect } from "react-router-dom";
import routes from "../routes";
import ConnectionDetector from "../components/ConnectionDetector";
import Dashboard from "../pages/Dashboard";
import Zoom from "react-reveal/Reveal";
import { AuthContext } from "../context/AuthContext";


const AdminContent = () => {
    const { state } = useContext(AuthContext);

    const getRoutes = (routes) => {
        return routes.map((el, key) => {
            const Component = el.component;
            const MainComponent = () => (
                <Zoom effect="fadeInUp">
                    <Component />
                </Zoom>
            );
            return el.layout === "/admin" &&
                el.roles.includes(state?.user?.position) ? (
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
            <Suspense fallback={<div> loading </div>}>
                <ConnectionDetector />
                <Switch>
                    <Private exact path="/" component={Dashboard} />
                    {getRoutes(routes)}
                    <Route component={Dashboard} />
                </Switch>
            </Suspense>

            <footer className="footer">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-6">
                            {new Date().getFullYear()}©
                            KEK Reinsurance Brokers Ltd
                        </div>
                        <div className="col-sm-6"></div>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default AdminContent


const Private = React.memo((props) => {
    const { state } = useContext(AuthContext);
    const { pathname } = useLocation();
    return !state.user ? (
        <Redirect to={{ pathname: "/auth", state: { pathname } }} />
    ) : (
            <Route {...props} />
        );
});