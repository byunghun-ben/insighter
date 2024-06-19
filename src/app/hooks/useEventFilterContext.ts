import { useContext } from "react";
import { EventFilterContext } from "../context/EventFilterContext";

const useEventFilterContext = () => {
  const context = useContext(EventFilterContext);
  if (!context) {
    throw new Error("useEventFilterContext must be used within a EventFilterProvider");
  }
  return context;
};

export default useEventFilterContext;
