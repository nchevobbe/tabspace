// @flow
import type { SpaceIdType } from "../types.flow";
import React from "react";

type PropsType = {
  active: boolean,
  id: SpaceIdType,
  title: string,
  deleteSpace?: SpaceIdType => void,
  selectSpace?: SpaceIdType => void,
};

export default (props: PropsType) => (
  <li
    className={props.active ? "active" : null}
    onClick={() => {
      if (props.selectSpace) {
        props.selectSpace(props.id);
      }
    }}
  >
    <span>{props.title}</span>
    {props.deleteSpace ? (
      <button
        className="space-delete clean"
        title="Delete space"
        onClick={e => {
          if (props.deleteSpace) {
            props.deleteSpace(props.id);
          }
          e.stopPropagation();
        }}
      />
    ) : null}
  </li>
);
