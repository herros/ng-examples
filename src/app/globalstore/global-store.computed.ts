import { signalStoreFeature, withComputed } from '@ngrx/signals';
import { IGlobalStoreState } from './global-store.state';

export function withTeamStoreComputed() {
  return signalStoreFeature(
    { state: undefined as unknown as IGlobalStoreState },

    withComputed((state) => ({})),
  );
}
