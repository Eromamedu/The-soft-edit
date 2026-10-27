import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import AccountPages from "./pages/AccountPages";
// import SerumCollectionPage from "./pages/SerumCollectionPage";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* <SerumCollectionPage> */}
    <AccountPages>
      <App />
    </AccountPages>
    {/* </SerumCollectionPage> */}
  </StrictMode>
);
