import React from "react";
import renderer from "react-test-renderer";
import Login from "./../Components/Account/Login";

test("Login box renders correctly", () => {
  const tree = renderer.create(<Login />).toJSON();
  expect(tree).toMatchSnapshot();
});

// test("Settings box renders correctly", () => {
//   const tree = renderer.create(<Register />).toJSON();
//   expect(tree).toMatchSnapshot();
// });

// test("Settings box renders correctly", () => {
//   const tree = renderer.create(<Settings />).toJSON();
//   expect(tree).toMatchSnapshot();
// });
