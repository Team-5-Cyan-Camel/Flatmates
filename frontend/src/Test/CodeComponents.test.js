import React from "react";
import renderer from "react-test-renderer";
import GenerateRoom from "../Components/Code/GenerateRoom";
import JoinRoom from "../Components/Code/JoinRoom";

test("Room generator button renders correctly", () => {
  const tree = renderer.create(<GenerateRoom />).toJSON();
  expect(tree).toMatchSnapshot();
});

test("Join room dialog renders correctly", () => {
  const tree = renderer.create(<JoinRoom />).toJSON();
  expect(tree).toMatchSnapshot();
});
