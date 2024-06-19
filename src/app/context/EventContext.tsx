import { ReactNode, createContext, useCallback, useEffect, useState } from "react";
import { Event } from "../../types";
import API from "../../apis";

type EventContextValue = {
  events: Event[];
  hasMore: boolean;
  fetchMoreEvents: () => Promise<void>;
  addEvent: (event: Event) => Promise<void>;
  editEvent: (event: Event) => Promise<void>;
  removeEvent: (id: string) => Promise<void>;
};

export const EventContext = createContext<EventContextValue>({
  events: [],
  hasMore: false,
  fetchMoreEvents: async () => {},
  addEvent: async () => {},
  editEvent: async () => {},
  removeEvent: async () => {},
});

export const EventContextProvider = ({ children }: { children: ReactNode }) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [nextPage, setNextPage] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await API.getEvents();
        setEvents(res.events);
        setNextPage(res.nextPage);
        setHasMore(res.hasMore);
      } catch (error) {
        console.error(error);
        return;
      }
    };

    fetchEvents();
  }, []);

  // More Events
  const fetchMoreEvents = useCallback(async () => {
    try {
      const res = await API.getEvents(nextPage);
      setEvents((prevEvents) => [...prevEvents, ...res.events]);
      setNextPage(res.nextPage);
      setHasMore(res.hasMore);
    } catch (error) {
      console.error(error);
      return;
    }
  }, [nextPage]);

  const addEvent = useCallback(async (event: Event) => {
    try {
      await API.addEvent(event);
      setEvents((prevEvents) => [...prevEvents, event]);
    } catch (error) {
      console.error(error);
      return;
    }
  }, []);

  const editEvent = useCallback(async (event: Event) => {
    try {
      await API.editEvent(event);
      setEvents((prevEvents) => {
        return prevEvents.map((prevEvent) => {
          const isEditedEvent = prevEvent.id === event.id;

          if (!isEditedEvent) {
            return prevEvent;
          }

          return event;
        });
      });
    } catch (error) {
      console.error(error);
      return;
    }
  }, []);

  const removeEvent = useCallback(async (id: string) => {
    try {
      await API.deleteEvent(id);
      setEvents((prevEvents) => {
        return prevEvents.filter((event) => event.id !== id);
      });
    } catch (error) {
      console.error(error);
      return;
    }
  }, []);

  return (
    <EventContext.Provider value={{ events, hasMore, fetchMoreEvents, addEvent, editEvent, removeEvent }}>
      {children}
    </EventContext.Provider>
  );
};
