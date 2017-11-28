// @flow
import React from "react";
import Space from "./Space";
import { connect } from "react-redux";

import { getActiveSpace, getSpaces } from "../reducers";
import { addSpace, selectSpace, deleteSpace } from "../actions/spaces.actions";
import type { StateType, SpaceIdType, SpacesType, ActionType } from "../types.flow";

type PropsType = {
  activeSpace: SpaceIdType,
  spaces: SpacesType,
  addSpace: () => void,
  deleteSpace: SpaceIdType => void,
  selectSpace: SpaceIdType => void,
};

const Spaces = (props: PropsType) => {
  const { activeSpace, spaces, addSpace, deleteSpace, selectSpace } = props;

  return (
    <nav className="spaces">
      <ul>
        {[...spaces.values()].map(space => (
          <Space
            key={space.id}
            id={space.id}
            title={space.title}
            active={activeSpace === space.id}
            deleteSpace={deleteSpace}
            selectSpace={selectSpace}
          />
        ))}
      </ul>
      <button className="space-add clean" onClick={addSpace} />
    </nav>
  );
};

function mapStateToProps(state: StateType) {
  return {
    spaces: getSpaces(state),
    activeSpace: getActiveSpace(state),
  };
}

function mapDispatchToProps(dispatch: ActionType => void) {
  return {
    addSpace: () => dispatch(addSpace()),
    selectSpace: spaceId => dispatch(selectSpace(spaceId)),
    deleteSpace: spaceId => dispatch(deleteSpace(spaceId)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Spaces);
