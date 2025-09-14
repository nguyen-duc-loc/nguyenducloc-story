import z from "zod";

export const SendLetterSchema = z.object({
  sender: z.string().min(1, { message: "Cho tớ xin tên của cậu nhé." }),
  content: z.string().min(1, {
    message: "Tớ muốn nghe suy nghĩ của cậu, hong phải ngại đâu ạ.",
  }),
});
export type SendLetterData = z.infer<typeof SendLetterSchema>;
