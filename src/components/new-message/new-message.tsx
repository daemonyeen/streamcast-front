import { $, component$, useSignal } from "@builder.io/qwik";
import { useUsername } from "~/hooks/use-username";
import { useForm, valiForm$ } from "@modular-forms/qwik";
import type { NewMessageFormSchema } from "~/components/new-message/new-message-form";
import { newMessageFormSchema } from "~/components/new-message/new-message-form";
import { useStreamClient } from "~/components/feed/use-stream-client";
import { useRoomId } from "~/hooks/use-room-id";

export const NewMessage = component$(() => {
  const username = useUsername();
  const roomId = useRoomId();
  const streamClient = useStreamClient();
  const [form, { Form, Field }] = useForm<NewMessageFormSchema>({
    loader: useSignal({
      message: "",
    }),
    validate: valiForm$(newMessageFormSchema),
    validateOn: "submit",
  });

  const sendMessage = $(({ message }: NewMessageFormSchema) => {
    streamClient!.sendMessage({
      message,
      room: roomId,
      author: username,
    });
    form.element?.reset();
  });

  return (
    <div class="rounded-2xl border bg-white bg-opacity-95 p-6 shadow-2xl shadow-indigo-300/80">
      <Form class="grid gap-4" onSubmit$={sendMessage}>
        <Field name="message">
          {(field, props) => (
            <textarea
              {...props}
              value={field.value}
              placeholder={`${username}, поделитесь вашими впечатлениями`}
              rows={3}
              class="block w-full rounded-lg border border-gray-300 bg-white p-3 placeholder-gray-500 outline-0 ring-blue-500 ring-offset-2 focus:ring-2"
            ></textarea>
          )}
        </Field>

        <div class="flex items-center justify-end">
          <button
            type="submit"
            class="highlight-white/20 flex h-12 items-center justify-center rounded-full bg-blue-700 bg-gradient-to-r from-violet-500 to-fuchsia-500 px-6 font-medium text-white transition-colors hover:bg-blue-600 focus:outline-none"
          >
            Опубликовать
          </button>
        </div>
      </Form>
    </div>
  );
});
