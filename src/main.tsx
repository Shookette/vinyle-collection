import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import WithFirestore from "./context/WithFirestore";
import App from "./App";
import { LoadingProvider } from './context/LoadingContext';
import Loader from './components/Loader/Loader';

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LoadingProvider>
      <WithFirestore>
        <Loader />
        <App />
      </WithFirestore>
    </LoadingProvider>
  </StrictMode>,
);
