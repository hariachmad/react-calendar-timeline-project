/* eslint-disable react/prop-types */
import { useContext, useState } from "react";

import Timeline, {
  DateHeader,
  SidebarHeader,
  TimelineHeaders,
} from "react-calendar-timeline";

import "./Timeline.scss";
import "./style.css";
import { ItemsContext } from "../context/itemsContext";
import { ScrollContext } from "../context/scrollContext";
import { ModalContext } from "../context/modalContext";
import { ItemsSelectedContext } from "../context/itemsSelectedContext";
import { useTimelineData } from "../hooks/useTimelineData";
import { UseSelectedItem } from "../hooks/useSelectedItem";
import { AddItemsContext } from "../context/addItemsContext";

var keys = {
  groupIdKey: "id",
  groupTitleKey: "title",
  groupRightTitleKey: "rightTitle",
  itemIdKey: "id",
  itemTitleKey: "title",
  itemDivTitleKey: "title",
  itemGroupKey: "group",
  itemTimeStartKey: "start",
  itemTimeEndKey: "end",
  groupLabelKey: "title",
};

const handleItemMove = (
  setItemState,
  itemsState,
  setTimeLineKey,
  itemId,
  dragTime,
  newGroupOrder
) => {
  const group = itemsState.groups[newGroupOrder];

  setTimeLineKey((prevKey) => prevKey + 1);

  setItemState({
    ...itemsState,
    items: itemsState.items.map((item) =>
      item.id === itemId
        ? Object.assign({}, item, {
            start: dragTime,
            end: dragTime + (item.end - item.start),
            group: group.id,
          })
        : item
    ),
  });

  console.log("Moved", itemId, dragTime, newGroupOrder);
};

export default function CostumeTimeline() {
  const { itemsState, setItemsState } = useContext(ItemsContext);
  const [timelineKey, setTimelineKey] = useState(0);
  const { scrollState } = useContext(ScrollContext);
  const { modalState, setModalState } = useContext(ModalContext);
  const { setItemsSelectedState } = useContext(ItemsSelectedContext);
  const [showHour, setShowHour] = useState(true);
  const { setAddItemsState } = useContext(AddItemsContext);

  useTimelineData();
  UseSelectedItem();

  const handleItemSelect = (itemId) => {
    setItemsSelectedState(itemId);
    console.log(itemsState);
  };

  const handleItemDeselect = () => {
    setItemsSelectedState(null);
  };

  const handleItemResize = (itemId, time, edge) => {
    setItemsState((prevItems) => {
      const resizedItems = prevItems.items.map((item) =>
        item.id === itemId
          ? {
              ...item,
              start: edge === "left" ? time : item.start,
              end: edge === "right" ? time : item.end,
            }
          : item
      );

      return { ...prevItems, items: resizedItems };
    });
  };

  const handleTimeChange = (
    visibleTimeStart,
    visibleTimeEnd,
    updateScrollCanvas,
    unit
  ) => {
    updateScrollCanvas(visibleTimeStart, visibleTimeEnd);
    setItemsState({
      ...itemsState,
      defaultTimeStart: visibleTimeStart,
      defaultTimeEnd: visibleTimeEnd,
    });
  };

  const handleItemDoubleClick = () => {
    setModalState(true);
    setAddItemsState(false);
  };

  if (modalState) return null;

  return (
    <div>
      <Timeline
        onZoom={(timelineContext, unit) => {
          unit == "month" ? setShowHour(false) : setShowHour(true);
        }}
        sidebarWidth={300}
        rightSidebarWidth={150}
        onItemDeselect={handleItemDeselect}
        onItemSelect={handleItemSelect}
        onItemDoubleClick={handleItemDoubleClick}
        onTimeChange={handleTimeChange}
        onItemResize={handleItemResize}
        onCan
        groups={itemsState.groups}
        items={itemsState.items}
        key={timelineKey}
        keys={keys}
        fullUpdate
        itemTouchSendsClick={false}
        stackItems
        itemHeightRatio={0.75}
        canMove={true}
        canResize={false}
        visibleTimeStart={scrollState ? null : itemsState.defaultTimeStart}
        visibleTimeEnd={scrollState ? null : itemsState.defaultTimeEnd}
        defaultTimeStart={itemsState.defaultTimeStart}
        defaultTimeEnd={itemsState.defaultTimeEnd}
        onItemMove={handleItemMove.bind(
          this,
          setItemsState,
          itemsState,
          setTimelineKey
        )}
      >
        <TimelineHeaders>
          <SidebarHeader>
            {({ getRootProps }) => {
              return (
                <div
                  {...getRootProps()}
                  className="flex  flex-row justify-center items-center"
                >
                  Machine
                </div>
              );
            }}
          </SidebarHeader>

          <SidebarHeader variant="right">
            {({ getRootProps }) => {
              return (
                <div
                  {...getRootProps()}
                  className="flex  flex-row justify-center items-center"
                >
                  PIC
                </div>
              );
            }}
          </SidebarHeader>


          <DateHeader unit="year"></DateHeader>
          <DateHeader unit="month"></DateHeader>

          {showHour && <DateHeader unit="day"></DateHeader>}
        </TimelineHeaders>
      </Timeline>
    </div>
  );
}
