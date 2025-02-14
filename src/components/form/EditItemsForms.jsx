import { useContext, useState } from "react";
import { ItemsContext } from "../../context/itemsContext";
import moment from "moment";
import { ModalContext } from "../../context/modalContext";
import { UseSelectedItem } from "../../hooks/useSelectedItem";

export default function EditItemsForms() {
  const { itemsState, setItemsState } = useContext(ItemsContext);
  const { setModalState } = useContext(ModalContext);

  const selectedItem = UseSelectedItem();

  const [formData, setFormData] = useState({
    id: selectedItem[0].id,
    group: selectedItem[0].group,
    start: selectedItem[0].start,
    end: selectedItem[0].end,
    title: selectedItem[0].title,
  });

  const handleEditButton = (formData) => {
    const item = {
      ...itemsState.items[0],
      id: formData.id,
      group: formData.group,
      title: formData.title,
      start: moment(formData.date).hour(0).minute(0).second(1).valueOf(),
      end: moment(formData.date).hour(23).minute(59).second(59).valueOf(),
    };

    let uniqueSet = new Set(itemsState.items.map((obj) => JSON.stringify(obj)));
    const updateItems = (item, items) => {
      items.forEach((element) => {
        let parsedItem = JSON.parse(element);
        if (parsedItem.id === item.id) {
          items.delete(element);
        }
      });
      items.add(JSON.stringify(item));
    };
    updateItems(item, uniqueSet);
    const uniqueArray = Array.from(uniqueSet).map((item) => JSON.parse(item));

    setItemsState({ ...itemsState, items: uniqueArray });
    setModalState(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="px-20">
      <form className="w-full">
        <div className="mb-4 flex flex-row justify-between items-center">
          <label
            htmlFor="group"
            className="block text-sm font-medium text-gray-700"
          >
            Group :
          </label>
          <input
            onChange={handleChange}
            type="text"
            id="group"
            name="group"
            className="mt-1 block w-40 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Group Number"
            value={formData.group}
          />
        </div>

        <div className="mb-6 flex flex-row justify-between items-center">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <input
            onChange={handleChange}
            type="text"
            id="title"
            name="title"
            value={formData.title}
            className="mt-1 block w-40 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Title"
          />
        </div>

        <div>
          <button
            onClick={() => {
              handleEditButton(formData);
            }}
            style={{ backGroundColor: "blue" }}
            type="button"
            className="w-[30%] border-amber-950 text-black rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            EDIT
          </button>
        </div>
      </form>
    </div>
  );
}
