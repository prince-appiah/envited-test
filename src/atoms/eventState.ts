import { atom } from "recoil";
import { IEvent } from "../typings";

const localStorageEffect =
  (key) =>
  ({ setSelf, onSet }) => {
    const savedValue = localStorage.getItem(key);
    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    }

    onSet((newValue, _, isReset) => {
      isReset
        ? localStorage.removeItem(key)
        : localStorage.setItem(key, JSON.stringify(newValue));
    });
  };

export const eventState = atom<IEvent>({
  key: "eventState",
  default: null,
  effects: [localStorageEffect("envited-test")],
});
