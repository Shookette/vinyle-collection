import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import WithFirestore from "./context/WithFirestore";
import App from "./App";
import { LoadingProvider } from "./context/LoadingContext";
import Loader from "./components/Loader/Loader";
import { RandomProvider } from "./context/RandomContext";
import RandomModal from "./components/RandomModal/RandomModal";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LoadingProvider>
      <RandomProvider>
        <WithFirestore>
          <Loader />
          <RandomModal />
          <App />
        </WithFirestore>
      </RandomProvider>
    </LoadingProvider>
  </StrictMode>,
);
