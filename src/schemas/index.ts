import { z } from "zod";

export const eventSchema = z.object({
  id: z.string(),
  name: z.string(),
  date: z.string(),
  time: z.string(),
  location: z.string(),
  description: z.string(),
});

export const eventFormSchema = z.object({
  name: z.string().min(1, "이름을 입력해주세요"),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "날짜 형식이 올바르지 않습니다"),
  time: z.string().regex(/^\d{2}:\d{2}$/, "시간 형식이 올바르지 않습니다"),
  location: z.string().min(1, "장소를 입력해주세요"),
  description: z.string().min(1, "설명을 입력해주세요"),
});
