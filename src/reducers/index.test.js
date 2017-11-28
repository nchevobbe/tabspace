import reducer, { State } from "./index";
import { addSpace, selectSpace, deleteSpace } from "../actions/spaces.actions";

describe("reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual(State());
  });

  it("should handle addSpace", () => {
    expect(reducer(State(), addSpace())).toEqual({
      activeSpace: 0,
      spaces: new Map([
        [
          0,
          {
            id: 0,
            title: "Default",
          },
        ],
        [
          1,
          {
            id: 1,
            title: "Space 2",
          },
        ],
      ]),
    });
  });

  it("should handle selectSpace", () => {
    const state = State({ activeSpace: null });
    const id = Symbol();
    expect(reducer(state, selectSpace(id))).toEqual({
      activeSpace: id,
      spaces: state.spaces,
    });
  });

  it("should handle deleteSpace when there is only one space", () => {
    const id = Symbol();
    const state = State({ activeSpace: id, spaces: new Map([getTabEntry(id)]) });
    expect(reducer(state, deleteSpace(id))).toEqual(state);
  });

  it("should handle deleteSpace on inactive space", () => {
    const id1 = Symbol();
    const id2 = Symbol();
    const state = State({
      activeSpace: id2,
      spaces: new Map([getTabEntry(id1), getTabEntry(id2)]),
    });
    expect(reducer(state, deleteSpace(id2))).toEqual({
      ...state,
      activeSpace: id1,
      spaces: new Map([getTabEntry(id1)]),
    });
  });

  it("should handle deleteSpace on an active space", () => {
    const id1 = Symbol();
    const id2 = Symbol();
    const state = State({
      activeSpace: id2,
      spaces: new Map([getTabEntry(id1), getTabEntry(id2)]),
    });
    expect(reducer(state, deleteSpace(id1))).toEqual({
      ...state,
      activeSpace: id2,
      spaces: new Map([getTabEntry(id2)]),
    });
  });

  it("should handle deleteSpace on an active space", () => {
    const id1 = Symbol();
    const id2 = Symbol();
    const id3 = Symbol();
    const state = State({
      activeSpace: id2,
      spaces: new Map([getTabEntry(id1), getTabEntry(id2), getTabEntry(id3)]),
    });
    expect(reducer(state, deleteSpace(id2))).toEqual({
      ...state,
      activeSpace: id1,
      spaces: new Map([getTabEntry(id1), getTabEntry(id3)]),
    });
  });
});

function getTabEntry(id) {
  return [id, { id }];
}
