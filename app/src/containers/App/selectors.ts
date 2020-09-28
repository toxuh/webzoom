import { createSelector } from 'reselect';

import { AppStateType, GlobalStateType, UserType } from '../../types';
import { LS_KEY } from '../../constants';

export const localUserId = localStorage.getItem(LS_KEY);

export const appSelector = (state: GlobalStateType): AppStateType => state.app;

export const loadingSelector = createSelector(
  appSelector,
  (app) => app.loading,
);

export const currentUserSelector = createSelector(
  appSelector,
  (app) => app.currentUser as UserType,
);

export const votesListSelector = createSelector(
  appSelector,
  (app) => app.votesList,
);

export const userVoteSelector = createSelector(
  appSelector,
  (app) => app.userVote,
);

export const votingEndedSelector = createSelector(
  appSelector,
  (app) => app.votingEnded,
);

export const summarySelector = createSelector(
  appSelector,
  (app) => app.summary,
);
