// @flow
import type { StateType, SpaceIdType, SpacesType, ActionType } from "../types.flow";
import { getSpaceId } from "../utils";

const State = (overrides?: Object): StateType => ({
  activeSpace: 0,
  spaces: new Map([
    [
      0,
      {
        id: 0,
        title: "Default",
        // tabs: tabs.filter(tab => !tab.pinned),
      },
    ],
  ]),
  ...overrides,
});

export default (state: StateType = State(), action: ActionType) => {
  switch (action.type) {
    case "ADD_SPACE":
      const newId = getSpaceId();
      return {
        ...state,
        spaces: cloneSpaces(state).set(newId, {
          id: newId,
          title: `Space ${getSpaces(state).size + 1}`,
          tabs: new Map(),
        }),
      };

    case "SELECT_SPACE":
      return {
        ...state,
        activeSpace: action.id,
      };

    case "DELETE_SPACE":
      if (getSpaces(state).size === 1) {
        return state;
      }

      const clonedSpaces = cloneSpaces(state);
      clonedSpaces.delete(action.id);

      if (state.activeSpace !== action.id) {
        return {
          ...state,
          spaces: clonedSpaces,
        };
      }

      const oldActiveTabIndex = [...getSpaces(state).keys()].indexOf(action.id);
      const newActiveTabIndex = Math.max(0, oldActiveTabIndex - 1);
      const newActiveId = [...clonedSpaces.keys()][newActiveTabIndex];
      return {
        ...state,
        spaces: clonedSpaces,
        activeSpace: newActiveId,
      };
  }
  return state;
};

function getSpaces(state: State): SpacesType {
  return state.spaces;
}

function getActiveSpace(state: StateType): SpaceIdType {
  return state.activeSpace;
}

function cloneSpaces(state: State): SpacesType {
  return new Map(getSpaces(state));
}

export { getActiveSpace, getSpaces, State };
