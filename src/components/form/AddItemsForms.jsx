import { useContext, useState } from "react";
import { ItemsContext } from "../../context/itemsContext";
import moment from "moment";
import { ModalContext } from "../../context/modalContext";

export default function AddItemsForms() {
  const { itemsState, setItemsState } = useContext(ItemsContext);
  const {setModalState} = useContext(ModalContext);
  const [formData,setFormData] = useState({
    group : '1',
    date :new Date(),
    title:"untitle"
  })

  const getIdItems = () => {
    const idItems = [];
    itemsState.items.map((item) => {
      idItems.push(item.id);
    });

    for (let i = 1; i < idItems.length + 1; i++) {
      const id = idItems.find((value) => value == i);
      if (id) return i+1;
    }

    return null;
  };

  const handleAddButton = (formData) => {
    let id = getIdItems();
    if (!id) id = 1;

    const item = {
      ...itemsState.items[0],
      id: id,
      group: formData.group,
      title: formData.title,
      start: moment(formData.date).hour(0).minute(0).second(1).valueOf(),
      end: moment(formData.date).hour(23).minute(59).second(59).valueOf(),
    };

    setItemsState({...itemsState,items : [...itemsState.items, item]});
    setModalState(false);

  };

  const handleChange = (e)=>{
    const {name,value} =e.target;
    setFormData({
        ...formData,
        [name] : value
    })
  }

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
          <select id="selectGroup" name="group" onChange={handleChange} className="mt-1 block w-50 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            {
            itemsState.groups.map(
              (group,index) => (
                <>
                  <option key={index} value={group.id}>{group.title}</option>
                </>
              ) 
            )
              
            }
          </select>
        </div>

        <div className="mb-4 flex flex-row justify-between items-center">
          <label
            htmlFor="date"
            className="block text-sm font-medium text-gray-700"
          >
            Date
          </label>
          <input onChange={handleChange}
            type="date"
            id="date"
            name="date"
            className="mt-1 block w-40 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="mb-6 flex flex-row justify-between items-center">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <input
            onChange={handleChange}
            type="text"
            id="title"
            name="title"
            className="mt-1 block w-40 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Title"
          />
        </div>

        <div>
          <button
            onClick={()=>{handleAddButton(formData)}}
            style={{ backGroundColor: "blue" }}
            type="button"
            className="w-[30%] border-amber-950 text-black rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            ADD
          </button>
        </div>
      </form>
    </div>
  );
}
