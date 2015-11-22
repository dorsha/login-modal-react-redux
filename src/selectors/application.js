import { createSelector } from 'reselect';

const applicationSelector = (state) => state.application;

export const loginRequiredSelector = createSelector(
    applicationSelector,
    (application) => ({
      loginRequired: application.get('loginRequired'),
      retriesQueue: application.get('retriesQueue')
    })
);
