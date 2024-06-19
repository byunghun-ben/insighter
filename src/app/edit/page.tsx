import { useCallback, useMemo } from "react";
import { useParams } from "react-router-dom";
import { z } from "zod";
import { eventFormSchema } from "../../schemas";
import EventForm from "../create/components/EventForm";
import useEventContext from "../hooks/useEventContext";

type FormValues = z.infer<typeof eventFormSchema>;

type EventEditPageParams = {
  id: string;
};

const EventEditPage = () => {
  const params = useParams<EventEditPageParams>();
  const id = params.id || "";

  const { events, editEvent } = useEventContext();
  const event = useMemo(() => {
    return events.find((event) => event.id === id);
  }, [id, events]);

  const handleSubmit = useCallback(
    async (value: FormValues) => {
      return editEvent({
        id,
        ...value,
      });
    },
    [id, editEvent]
  );

  if (!id || !event) {
    return <div>Event not found</div>;
  }

  return (
    <div>
      <section className="flex flex-col p-4">
        <h1 className="text-2xl font-black">일정 수정</h1>
      </section>
      <EventForm onSubmit={handleSubmit} defaultValues={event} />
    </div>
  );
};

export default EventEditPage;
