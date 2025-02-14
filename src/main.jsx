import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ItemsProvider } from "./context/itemsContext.jsx";
import { ScrollProvider } from "./context/scrollContext.jsx";
import { ModalProvider } from "./context/modalContext.jsx";
import { ItemsSelectedProvider } from "./context/itemsSelectedContext.jsx";
import { AddItemProvider } from "./context/addItemsContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ItemsSelectedProvider>
      <ModalProvider>
        <AddItemProvider>
          <ScrollProvider>
            <ItemsProvider>
              <App />
            </ItemsProvider>
          </ScrollProvider>
        </AddItemProvider>
      </ModalProvider>
    </ItemsSelectedProvider>
  </StrictMode>
);
