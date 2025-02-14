import { useContext } from "react";
import { ItemsSelectedContext } from "../context/itemsSelectedContext";
import { ItemsContext } from "../context/itemsContext";

export const UseSelectedItem = () => {
  const { itemsSelectedState } = useContext(ItemsSelectedContext);
  const { itemsState} = useContext(ItemsContext);

  const filteredItemsState = itemsState.items.filter((item) => {
    return item.id == itemsSelectedState;
  });

  return filteredItemsState;
};
