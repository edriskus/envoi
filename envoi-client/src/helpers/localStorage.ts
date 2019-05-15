import { IAppReduxState } from "../types/global";

const storageKey = "@envoiState";

export const loadPersistedState = (): IAppReduxState | undefined => {
  try {
    const rawState = localStorage.getItem(storageKey);
    return rawState ? JSON.parse(rawState) : undefined;
  } catch (error) {
    console.warn(error);
    return undefined;
  }
};

export const persistState = (state: Partial<IAppReduxState>) => {
  try {
    const stringifiedState = JSON.stringify(state);
    localStorage.setItem(storageKey, stringifiedState);
  } catch (error) {
    console.warn(error);
  }
};
