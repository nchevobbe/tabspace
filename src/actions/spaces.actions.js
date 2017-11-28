// @flow
import type {
  SpaceIdType,
  AddSpaceActionType,
  DeleteSpaceActionType,
  SelectSpaceActionType,
} from "../types.flow";

export function addSpace(): AddSpaceActionType {
  return { type: "ADD_SPACE" };
}

export function selectSpace(spaceId: SpaceIdType): SelectSpaceActionType {
  return { type: "SELECT_SPACE", id: spaceId };
}

export function deleteSpace(spaceId: SpaceIdType): DeleteSpaceActionType {
  return { type: "DELETE_SPACE", id: spaceId };
}
