import React from "react";
import renderer from "react-test-renderer";
import Roster from "./../Components/Roster/Roster";
import Rosters from "./../Components/Roster/Rosters";
import SelectRoster from "./../Components/Roster/SelectRoster";
import UserTask from "./../Components/Roster/UserTask";

const room = {
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

test("Roster renders correctly", () => {
  const tree = renderer

    .create(<Roster data={room.rosters[0]} isHost={true} updateDb={null} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test("Rosters container (containing tabs and roster view) render correctly", () => {
  const tree = renderer

    .create(<Rosters rosters={room} isHost={true} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test("Roster tabs render correctly", () => {
  const tree = renderer

    .create(
      <SelectRoster
        isHost={true}
        rosters={room}
        setRoster={null}
        updateDb={null}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test("User task list in roster render correctly", () => {
  const roster = room.rosters[0];
  const userTasks = roster.assignedUsers[0];
  const tree = renderer

    .create(
      <UserTask
        key={0}
        rid={userTasks._id}
        pid={userTasks._id}
        name={userTasks.name}
        updateDb={null}
        task={roster.tasks.filter((data) => {
          return data.userIndex === 0;
        })}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
