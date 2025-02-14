import { useContext } from "react";
import { ItemsContext } from "../context/itemsContext";

export const useTimelineData = () => {
  const { itemsState } = useContext(ItemsContext);

  const dataTimeline = itemsState.items.map((item) => {
    return {
      title: item.title,
      start: new Date(item.start),
      end: new Date(item.end),
    };
  });

  console.log(dataTimeline);
  return dataTimeline;
};
