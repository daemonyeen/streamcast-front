import type { Input } from "valibot";
import { maxLength, minLength, object, string } from "valibot";

export const welcomeFormSchema = object({
  username: string([
    minLength(3, "Введите не менее 3х символов"),
    maxLength(30, "Слишком длинное имя"),
  ]),
});

export type WelcomeFormSchema = Input<typeof welcomeFormSchema>;
