import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { eventFormSchema } from "../../schemas";

type FormValues = z.infer<typeof eventFormSchema>;

type Props = {
  defaultValues?: FormValues;
  onSubmit: (value: FormValues) => Promise<void>;
};

const EventForm = ({ defaultValues, onSubmit }: Props) => {
  const navigate = useNavigate();
  const form = useForm<FormValues>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: {
      name: "",
      date: "",
      time: "",
      location: "",
      description: "",
      ...defaultValues,
    },
  });

  const handleSubmitSuccess = useCallback(
    async (value: FormValues) => {
      try {
        await onSubmit(value);
        navigate("/");
      } catch (error) {
        console.error(error);
      }
    },
    [onSubmit, navigate]
  );

  const nameError = form.formState.errors.name;
  const dateError = form.formState.errors.date;
  const timeError = form.formState.errors.time;
  const locationError = form.formState.errors.location;
  const descriptionError = form.formState.errors.description;

  return (
    <form onSubmit={form.handleSubmit(handleSubmitSuccess)} className="flex flex-col items-start gap-6 p-4">
      <div className="w-full flex flex-col gap-2">
        <label className={`font-medium text-sm ${nameError ? "text-red-500" : "text-slate-700"}`}>이름</label>
        <input {...form.register("name")} className="w-full border py-2 px-4 rounded-md" />
        {nameError && <span className="text-sm text-red-500">{nameError.message}</span>}
      </div>

      <div className="w-full flex flex-col gap-2">
        <label className={`font-medium text-sm ${dateError ? "text-red-500" : "text-slate-700"}`}>날짜</label>
        <input type="date" {...form.register("date")} className="w-full border py-2 px-4 rounded-md" />
        {dateError && <span className="text-sm text-red-500">{dateError.message}</span>}
      </div>

      <div className="w-full flex flex-col gap-2">
        <label className={`font-medium text-sm ${timeError ? "text-red-500" : "text-slate-700"}`}>시간</label>
        <input type="time" {...form.register("time")} className="w-full border py-2 px-4 rounded-md" />
        {timeError && <span className="text-sm text-red-500">{timeError.message}</span>}
      </div>

      <div className="w-full flex flex-col gap-2">
        <label className={`font-medium text-sm ${locationError ? "text-red-500" : "text-slate-700"}`}>장소</label>
        <input {...form.register("location")} className="w-full border py-2 px-4 rounded-md" />
        {locationError && <span className="text-sm text-red-500">{locationError.message}</span>}
      </div>

      <div className="w-full flex flex-col gap-2">
        <label className={`font-medium text-sm ${descriptionError ? "text-red-500" : "text-slate-700"}`}>설명</label>
        <textarea {...form.register("description")} className="w-full border py-2 px-4 rounded-md" />
        {descriptionError && <span className="text-sm text-red-500">{descriptionError.message}</span>}
      </div>

      <button
        type="submit"
        className="self-end px-4 py-2 bg-slate-700 text-white border rounded-md hover:bg-slate-800"
        disabled={form.formState.isSubmitting}
      >
        {form.formState.isSubmitting ? "저장 중..." : "저장"}
      </button>
    </form>
  );
};

export default EventForm;
