/* eslint-disable react/prop-types */
import { faker } from "@faker-js/faker";
import moment from "moment";
import { createContext, useState } from "react";

export const ItemsContext = createContext();

const groups = [
  {
    id: 1,
    title: "Bubut Ruby",
    rightTitle: faker.person.firstName(),
    bgColor: "white",
  },
  {
    id: 2,
    title: "Bubut Yamazaki",
    rightTitle: faker.person.firstName(),
    bgColor: "white",
  },
  {
    id: 3,
    title: "Bubut Niles",
    rightTitle: faker.person.firstName(),
    bgColor: "white",
  },
  {
    id: 4,
    title: "Bubut VEB",
    rightTitle: faker.person.firstName(),
    bgColor: "white",
  },
  {
    id: 5,
    title: "Crane 3 konecrane 40/5 t (A)",
    rightTitle: faker.person.firstName(),
    bgColor: "white",
  },
  {
    id: 6,
    title: faker.vehicle.manufacturer(),
    rightTitle: faker.person.firstName(),
    bgColor: "white",
  },
  {
    id: 7,
    title: faker.vehicle.manufacturer(),
    rightTitle: faker.person.firstName(),
    bgColor: "white",
  },
  {
    id: 8,
    title: faker.vehicle.manufacturer(),
    rightTitle: faker.person.firstName(),
    bgColor: "white",
  },
  {
    id: 9,
    title: faker.vehicle.manufacturer(),
    rightTitle: faker.person.firstName(),
    bgColor: "white",
  },
  {
    id: 10,
    title: faker.vehicle.manufacturer(),
    rightTitle: faker.person.firstName(),
    bgColor: "white",
  },
  {
    id: 11,
    title: faker.vehicle.manufacturer(),
    rightTitle: faker.person.firstName(),
    bgColor: "white",
  },
  {
    id: 12,
    title: faker.vehicle.manufacturer(),
    rightTitle: faker.person.firstName(),
    bgColor: "white",
  },
  {
    id: 13,
    title: faker.vehicle.manufacturer(),
    rightTitle: faker.person.firstName(),
    bgColor: "white",
  },
  {
    id: 14,
    title: faker.vehicle.manufacturer(),
    rightTitle: faker.person.firstName(),
    bgColor: "white",
  },
  {
    id: 15,
    title: faker.vehicle.manufacturer(),
    rightTitle: faker.person.firstName(),
    bgColor: "white",
  },
  {
    id: 16,
    title: faker.vehicle.manufacturer(),
    rightTitle: faker.person.firstName(),
    bgColor: "white",
  },
  {
    id: 17,
    title: faker.vehicle.manufacturer(),
    rightTitle: faker.person.firstName(),
    bgColor: "white",
  },
  {
    id: 18,
    title: faker.vehicle.manufacturer(),
    rightTitle: faker.person.firstName(),
    bgColor: "white",
  },
  {
    id: 19,
    title: faker.vehicle.manufacturer(),
    rightTitle: faker.person.firstName(),
    bgColor: "white",
  },
  {
    id: 20,
    title: faker.vehicle.manufacturer(),
    rightTitle: faker.person.firstName(),
    bgColor: "white",
  },
];

const items = [
  {
    id: 1,
    group: 1,
    title: "M01",
    canMove: true,
    canResize: true,
    start: moment().hour(0).minute(0).second(1).valueOf(),
    end: moment().hour(23).minute(59).second(59).valueOf(),
    itemProps: {
      "data-tip": faker.hacker.phrase(),
      style: {
        color : "black",
        fontSize : 10
      },
    },
    
  },
];

const defaultTimeStart = moment().startOf("day").toDate();
const defaultTimeEnd = moment().startOf("day").add(1, "month").toDate();

export const ItemsProvider = ({ children }) => {
  const [itemsState, setItemsState] = useState({
    groups,
    items,
    defaultTimeStart,
    defaultTimeEnd,
  });

  return (
    <ItemsContext.Provider value={{ itemsState, setItemsState }}>
      {children}
    </ItemsContext.Provider>
  );
};
