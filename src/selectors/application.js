import { createSelector } from 'reselect';

const applicationSelector = (state) => state.application;
const archiveSelector = (state) => state.application.get('archived');

export const loginRequiredSelector = createSelector(
    applicationSelector,
    (application) => ({
      loginRequired: application.get('loginRequired'),
      retriesQueue: application.get('retriesQueue')
    })
);

export const archivedSelector = createSelector(
    archiveSelector,
    (archived) => ({
      archived: archived
    })
);