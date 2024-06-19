import { useCallback } from "react";
import { z } from "zod";
import { eventFormSchema } from "../../schemas";
import useEventContext from "../hooks/useEventContext";
import EventForm from "./components/EventForm";

type FormValues = z.infer<typeof eventFormSchema>;

const EventCreatePage = () => {
  const { addEvent } = useEventContext();

  const handleSubmit = useCallback(
    async (value: FormValues) => {
      const id = Math.random().toString(36).slice(2);
      return addEvent({
        id,
        ...value,
      });
    },
    [addEvent]
  );

  return (
    <div>
      <section className="flex flex-col p-4">
        <h1 className="text-2xl font-black">일정 생성</h1>
      </section>
      <EventForm onSubmit={handleSubmit} />
    </div>
  );
};

export default EventCreatePage;
