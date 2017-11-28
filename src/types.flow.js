// @flow
export type StateType = {
  +activeSpace: SpaceIdType,
  +spaces: SpacesType,
};

export type SpaceIdType = number;

export type SpacesType = Map<SpaceIdType, SpaceType>;

export type SpaceType = {
  +id: SpaceIdType,
  +title: string,
  +tabs: Map<TabIdType, TabType>,
};

export type TabIdType = string;

export type TabType = {
  +id: TabIdType,
  +url: string,
  +title: string,
  +favIconUrl: string,
  +pinned: boolean,
};

type EventListener = {
  +addListener: (() => any) => void,
  +removeListener: (() => any) => void,
};

export type Browser = {
  +browserAction: {
    +onClicked: EventListener,
    +setIcon: ({ path: string }) => void,
  },
  +extension: {
    +getURL: string => string,
  },
  +history: {
    +deleteUrl: ({ url: string }) => void,
  },
  +tabs: {
    +create: ({ url?: string }) => Promise<TabType>,
    +update: (TabIdType, { active: boolean }) => Promise<TabType>,
    +remove: TabIdType => Promise<void>,
    +query: ({
      currentWindow?: boolean,
    }) => Promise<Array<TabType>>,
    +onActivated: EventListener,
  },
};

export type AddSpaceActionType = { +type: "ADD_SPACE" };
export type DeleteSpaceActionType = { +type: "DELETE_SPACE", +id: SpaceIdType };
export type SelectSpaceActionType = { +type: "SELECT_SPACE", +id: SpaceIdType };
export type ActionType =
  | AddSpaceActionType
  | DeleteSpaceActionType
  | SelectSpaceActionType;
