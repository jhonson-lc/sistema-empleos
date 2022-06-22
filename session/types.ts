import {Session as UserNext} from "next-auth"

export type User = UserNext ;

export interface State {
  user: User | null;
}

export interface Actions {
  signOut: () => void;
}

export interface Context {
  state: State;
  actions: Actions;
}