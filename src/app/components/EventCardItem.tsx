import { useCallback } from "react";
import { Link } from "react-router-dom";
import { Event } from "../../types";
import useEventContext from "../hooks/useEventContext";
import EventDeleteModal from "./EventDeleteModal";

type Props = {
  event: Event;
};

const EventCardItem = ({ event }: Props) => {
  const { removeEvent } = useEventContext();
  const deleteEvent = useCallback(async () => {
    await removeEvent(event.id);
  }, [removeEvent, event.id]);

  return (
    <li key={event.id} className="p-4 flex flex-col items-start border rounded-lg">
      <h4 className="text-lg font-bold">{event.name}</h4>
      <div className="flex items-center gap-1">
        <span className="text-sm text-slate-500">{event.location}</span>
        <span className="text-sm text-slate-500">{event.date}</span>
        <span className="text-sm text-slate-500">{event.time}</span>
      </div>
      <span className="text-slate-700">{event.description}</span>
      <div className="self-end flex items-center gap-2">
        <Link to={`/edit/${event.id}`} className="text-sm text-blue-500">
          수정
        </Link>
        <EventDeleteModal onConfirm={deleteEvent} />
      </div>
    </li>
  );
};

export default EventCardItem;
