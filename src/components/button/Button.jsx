import { useContext } from "react";
import "../style.css";
import { ItemsContext } from "../../context/itemsContext";
import moment from "moment";
import { ScrollContext } from "../../context/scrollContext";
import { ModalContext } from "../../context/modalContext";
import { ItemsSelectedContext } from "../../context/itemsSelectedContext";
import { UseSelectedItem } from "../../hooks/useSelectedItem";
import { AddItemsContext } from "../../context/addItemsContext";
import { faker } from "@faker-js/faker";

export default function Button() {
  const { itemsState, setItemsState } = useContext(ItemsContext);
  const { setScrollState } = useContext(ScrollContext);
  const { setModalState } = useContext(ModalContext);
  const { itemsSelectedState } = useContext(ItemsSelectedContext);
  const { AddItemsState, setAddItemsState } = useContext(AddItemsContext);

  const handleScrollButton = () => {
    setScrollState(true);
  };

  const handleNextButton = () => {
    const nextMonth = [
      moment(itemsState.defaultTimeStart)
        .add(1, "month")
        .hour(0)
        .minute(0)
        .second(1)
        .toDate(),
      moment(itemsState.defaultTimeEnd)
        .add(1, "month")
        .hour(23)
        .minute(59)
        .second(59)
        .toDate(),
    ];
    setScrollState(false);
    setItemsState({
      ...itemsState,
      defaultTimeStart: nextMonth[0],
      defaultTimeEnd: nextMonth[1],
    });
  };

  const handlePreviousButton = () => {
    const previousMonth = [
      moment(itemsState.defaultTimeStart)
        .add(-1, "month")
        .hour(0)
        .minute(0)
        .second(1)
        .toDate(),
      moment(itemsState.defaultTimeEnd)
        .add(-1, "month")
        .hour(23)
        .minute(59)
        .second(59)
        .toDate(),
    ];
    setScrollState(false);
    setItemsState({
      ...itemsState,
      defaultTimeStart: previousMonth[0],
      defaultTimeEnd: previousMonth[1],
    });
  };

  const handleAddItemsButton = () => {
    setAddItemsState(true);
    setModalState(true)
  };

  const handleEditItemsButton = () => {
    setAddItemsState(false);
    setModalState(true)
  };

  const handleDeleteButton = () => {
    const filteredItemsState = itemsState.items.filter((item) => {
      return item.id != itemsSelectedState;
    });
    setItemsState({ ...itemsState, items: filteredItemsState });
  };
  
  const handleFinishButton=()=>{
    const targetItems = itemsState.items.filter((item) => {
      return item.id == itemsSelectedState;
    });
    
    const targetItem= {...targetItems[0], canMove: false,
      canResize: false,
      itemProps: {
        "data-tip": faker.hacker.phrase(),
        style: {
          backgroundColor : "green",
          color : "black",
          fontSize : 10
        },
      },
    }

    const filteredItems = itemsState.items.filter((item) => {
      return item.id != itemsSelectedState;
    });

    setItemsState({...itemsState,items: [...filteredItems,targetItem]})


  }
  // const handleEditButton = () => {
  //   const selectedItem = UseSelectedItem();

  // }

  return (
    <>
      <div className="flex flex-column justify-around">
        <button onClick={handleAddItemsButton} id="addItems">
          Add Item
        </button>
        <button onClick={handlePreviousButton} id="next">
          Previous Month
        </button>
        {/* <button onClick={handleScrollButton} id="scroll">
          Scroll
        </button> */}
        <button onClick={handleNextButton} id="previous">
          Next Month
        </button>
        <button onClick={handleDeleteButton} id="delete">
          Delete
        </button>
        <button onClick={handleEditItemsButton} id="edit">Edit</button>
        <button onClick={handleFinishButton} id="finish">Finish</button>
      </div>
    </>
  );
}
