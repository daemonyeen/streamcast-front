import { $, component$, useSignal } from "@builder.io/qwik";
import { formatDistance, subHours } from "date-fns";
import { ru } from "date-fns/locale";
import type { MessageDto } from "~/stream/message";
import LikeSvg from "~/icons/like.svg?jsx";
export const Message = component$(({ message }: { message: MessageDto }) => {
  // TODO: Fix timezones!
  const distance = formatDistance(message.created, subHours(new Date(), 4), {
    locale: ru,
  });
  const liked = useSignal(message.liked);

  const like = $(async () => {
    await fetch(`http://94.131.14.228:8081/messages/${message.id}/like`, {
      method: "POST",
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json",
      }),
    }).then();

    liked.value = true;
  });

  return (
    <div class="grid gap-2 border-b p-6 last:border-none">
      <div class="flex items-center space-x-2">
        <div class="text-sm font-bold">{message.author}</div>
        <div class="text-xs text-gray-400">{distance} назад</div>
      </div>
      <div class="text-sm">{message.message}</div>
      <div class="mt-2 flex text-sm">
        {!liked.value && (
          <button
            class="flex items-center space-x-2 rounded-full bg-violet-100 px-3 py-1.5 outline-0"
            onClick$={like}
          >
            <LikeSvg class="text-rose-600" />
            <span class="font-medium text-violet-900">{message.likes}</span>
          </button>
        )}
        {liked.value && (
          <button
            class="flex items-center space-x-2 rounded-full bg-rose-500 px-3 py-1.5 outline-0"
            onClick$={like}
          >
            <LikeSvg class="text-white" />
            <span class="font-medium text-white">{message.likes}</span>
          </button>
        )}
      </div>
    </div>
  );
});
