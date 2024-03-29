import { useContext } from "react";

import { AppContext } from "../contexts/app-context";

// eslint-disable-next-line
export function useAppContext() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("Context should be provide.");
  }
  return context;
}
