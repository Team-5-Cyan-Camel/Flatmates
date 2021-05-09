import React from "react";
import renderer from "react-test-renderer";
import Room from "../Components/Room/Room";
import UserData from "../Components/Room/UserData";

// dummy function
function setIsHost() {
  return null;
}

let room = {
  users: [
    {
      _id: "6094f73787fe4e0ff89ef600",
      username: "UK",
      email: "",
      name: "Leon",
      phoneNumber: "",
    },
    {
      _id: "6094ff16dba18c4bcc3e376e",
      username: "coke",
      email: "",
      name: "Coco",
      phoneNumber: "",
    },
    {
      _id: "608674f890c6b43a80d04f8e",
      username: "loine",
      name: "Leon",
      phoneNumber: "021 0817 9478",
      email: "whomst@gmail.com",
    },
  ],
  _id: "6094f73d87fe4e0ff89ef601",
  host: "6094f73787fe4e0ff89ef600",
  rosters: [
    {
      assignedUsers: [
        {
          _id: "6094f73787fe4e0ff89ef600",
          username: "UK",
          name: "Leon",
        },
        {
          _id: "6094ff16dba18c4bcc3e376e",
          username: "coke",
          name: "Coco",
        },
        {
          _id: "608674f890c6b43a80d04f8e",
          username: "loine",
          name: "Leon",
        },
      ],
      _id: "6094fb79cd7f9941445dd4a1",
      title: "nice",
      tasks: [],
    },
    {
      assignedUsers: [
        {
          _id: "6094f73787fe4e0ff89ef600",
          username: "UK",
          name: "Leon",
        },
        {
          _id: "6094ff16dba18c4bcc3e376e",
          username: "coke",
          name: "Coco",
        },
        {
          _id: "608674f890c6b43a80d04f8e",
          username: "loine",
          name: "Leon",
        },
      ],
      _id: "6096785e44457b3fbca1f9b2",
      title: "nice",
      tasks: [],
    },
    {
      assignedUsers: [
        {
          _id: "6094f73787fe4e0ff89ef600",
          username: "UK",
          name: "Leon",
        },
        {
          _id: "6094ff16dba18c4bcc3e376e",
          username: "coke",
          name: "Coco",
        },
        {
          _id: "608674f890c6b43a80d04f8e",
          username: "loine",
          name: "Leon",
        },
      ],
      _id: "6096787044457b3fbca1f9b4",
      title: "mine",
      tasks: [],
    },
  ],
  reminders: [],
  expenses: [],
  __v: 16,
};

test("Room display renders correctly", () => {
  const tree = renderer

    .create(
      <Room
        update={null}
        room={room}
        hostId={room.host}
        setIsHost={setIsHost}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test("User info display renders correctly", () => {
  const firstUser = room.users[0];
  const tree = renderer
    .create(
      <UserData
        data={firstUser}
        hostId={"6094f73787fe4e0ff89ef600"}
        isHost={true}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
