import { useContext } from "react";
import { ModalContext } from "../../context/modalContext";
import AddItemsForms from "../form/AddItemsForms";
import EditItemsForms from "../form/EditItemsForms";
import { AddItemsContext } from "../../context/addItemsContext";

// eslint-disable-next-line react/prop-types, no-unused-vars
export default function Modal() {
  const { modalState, setModalState } = useContext(ModalContext);
  const { AddItemsState } = useContext(AddItemsContext);

  if (!modalState) return null;

  return (
    <>
      <div style={styles.overlay}>
        <div
          onClick={() => {
            setModalState(!modalState);
          }}
          className="fixed right-8 top-4 w-[10px] text-white"
        >
          <a href="#">X</a>
        </div>
        <div style={styles.modal} className="z-50">
          {AddItemsState && <AddItemsForms />}
          {!AddItemsState && <EditItemsForms />}
        </div>
      </div>
    </>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0,0.9)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    background: "#fff",
    padding: "20px",
    borderRadius: "8px",
    maxWidth: "500px",
    width: "100%",
  },
};
