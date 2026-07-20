import { withSorting } from '@app/shared/storefeatures/with-sorting';
import { Team } from '@models/team';
import { signalStore, withHooks } from '@ngrx/signals';
import { withTeamStoreComputed } from './team-store.computed';
import { withTeamStoreMethods } from './team-store.methods';
import { withTeamStoreState } from './team-store.state';

export const TeamStore = signalStore(
  withTeamStoreState(),
  withSorting<Team>((store) => store.teams),
  withTeamStoreMethods(),
  withTeamStoreComputed(),
  withHooks({
    onInit: (store): void => {
      store.getTeams().catch((error) => {
        console.error('Error loading teams on store init:', error);
      });
    },
  }),
);

export type TeamStoreType = InstanceType<typeof TeamStore>;
