import { component$ } from "@builder.io/qwik";
import { formatDistance, subHours } from "date-fns";
import { ru } from "date-fns/locale";
import type { MessageDto } from "~/stream/message";
import LikeSvg from "~/icons/like.svg?jsx";
export const Message = component$(({ message }: { message: MessageDto }) => {
  // TODO: Fix timezones!
  const distance = formatDistance(message.created, subHours(new Date(), 4), {
    locale: ru,
  });

  return (
    <div class="grid gap-2 border-b p-6 last:border-none">
      <div class="flex items-center space-x-2">
        <div class="text-sm font-bold">{message.author}</div>
        <div class="text-xs text-gray-400">{distance} назад</div>
      </div>
      <div class="text-sm">{message.message}</div>
      <div class="mt-2 flex text-sm">
        <button class="flex items-center space-x-2 rounded-full bg-violet-100 px-3 py-1.5 outline-0">
          <LikeSvg class="text-rose-600" />
          <span class="font-medium text-violet-900">{message.likes}</span>
        </button>
      </div>
    </div>
  );
});
