import React, {Suspense} from 'react';
import routes from '../routes';
import {Switch, Route} from 'react-router-dom';
import ConnectionDetector from '../components/ConnectionDetector';
import { version } from '../../package.json'

export default () => {
  const getRoutes = (routes) => {
    return routes.map((el, key) =>
      el.layout === '/auth' ? (
        <Route
          key={key}
          path={el.layout + el.path}
          exact
          component={el.component}
        />
      ) : null
    );
  };
  return (
    <div
      style={{height: '100vh', margin: 0}}
      className="account-pages  pt-sm-5"
    >
      <ConnectionDetector />
      <div className="container">
        <Suspense fallback={<div>Loading</div>}>
          <Switch>{getRoutes(routes)}</Switch>
        </Suspense>
        <p className="text-center">current version: {version}</p>
      </div>
    </div>
  );
};
