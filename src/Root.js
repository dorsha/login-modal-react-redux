/* global __DEV_TOOLS__ */
import React from 'react';
import { Route } from 'react-router';
import { ReduxRouter } from 'redux-router';
import { connect } from 'react-redux';
import * as components from './components';
import configureStore from './store/configureStore';
import Routes from './constants/Routes';
import { initialState } from './reducers/application';
import * as Api from './util/api';
import Immutable from 'immutable';

const {
    Application,
    Archive
} = components;

export const appInitialState = {
  application: initialState
};

export const store = configureStore(appInitialState);
Api.setStore(store);

function renderRoutes() {
  return (
      <ReduxRouter>
        <Route component={Application} >
          <Route path={Routes.home} component={Archive} />
        </Route>
      </ReduxRouter>
  );
}

function getRootChildren() {
  const rootChildren = [
    <div key="routes">{renderRoutes()}</div>
  ];

  if (__DEV_TOOLS__) {
    const DevTools = require('./components/DevTools');
    rootChildren.push(<DevTools key="devtools" />);
  }
  return rootChildren;
}

/* eslint-disable react/no-multi-comp */
@connect(({ application }) => ({ application }))
export default class Root extends React.Component {
  static propTypes = {
    application: React.PropTypes.object.isRequired
  };

  render() {
    return (
      <div>{getRootChildren(this.props)}</div>
    );
  }
}
