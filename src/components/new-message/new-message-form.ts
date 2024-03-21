import { type Input, minLength, object, string } from "valibot";

export const newMessageFormSchema = object({
  message: string([minLength(3, "Введите не менее 3х символов")]),
});

export type NewMessageFormSchema = Input<typeof newMessageFormSchema>;
