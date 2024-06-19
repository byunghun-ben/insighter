import { ReactNode, createContext, useCallback, useState } from "react";

export type EventFilterContextValue = {
  filterName: string;
  filterDate: string;
  setFilterName: (name: string) => void;
  setFilterDate: (date: string) => void;
  resetFilter: () => void;
};

export const EventFilterContext = createContext<EventFilterContextValue>({
  filterName: "",
  filterDate: "",
  setFilterName: () => {},
  setFilterDate: () => {},
  resetFilter: () => {},
});

export const EventFilterContextProvider = ({ children }: { children: ReactNode }) => {
  const [filterName, setFilterName] = useState("");
  const [filterDate, setFilterDate] = useState("");

  const resetFilter = useCallback(() => {
    setFilterName("");
    setFilterDate("");
  }, []);

  return (
    <EventFilterContext.Provider value={{ filterName, filterDate, setFilterName, setFilterDate, resetFilter }}>
      {children}
    </EventFilterContext.Provider>
  );
};
