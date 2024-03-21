import {
  component$,
  useContext,
  useSignal,
  useVisibleTask$,
} from "@builder.io/qwik";
import type { FeedState } from "~/components/feed/feed-state";
import { FeedContext } from "~/components/feed/feed-state";
import type { MessageDto } from "~/stream/message";
import LikeSvg from "~/icons/like.svg?jsx";

export const CastOverlay = component$(() => {
  const { castMessages } = useContext<FeedState>(FeedContext);
  const lastMessage = useSignal<MessageDto | null>(castMessages[0]);
  const likes = useSignal(0);

  useVisibleTask$(() => {
    setInterval(() => {
      likes.value =
        castMessages.find(message => message.id === lastMessage.value?.id)
          ?.likes || 0;
    }, 100);

    setInterval(() => {
      const index = castMessages.findIndex(
        message => message.id === lastMessage.value?.id,
      );

      const actualLastMessage =
        index + 1 < castMessages.length
          ? castMessages[index + 1]
          : lastMessage.value;

      if (actualLastMessage !== lastMessage.value) {
        lastMessage.value = actualLastMessage;
        likes.value = lastMessage.value?.likes || 0;
      }
    }, 10_000);
  });

  return (
    <div class="flex min-h-[calc(100vh-76px)] w-full items-center justify-center bg-indigo-800">
      <div class="max-w-5xl">
        <div class="flex items-center justify-between">
          <div class="text-[4vh] font-bold text-indigo-300">
            {lastMessage.value?.author}
          </div>
          <div class="flex items-center space-x-6">
            <LikeSvg class="h-[50px] w-[50px] text-rose-400" />
            <span class="text-[4vh] font-bold text-indigo-300">{likes}</span>
          </div>
        </div>
        <div class="mt-6 line-clamp-5 text-[6vh] font-bold text-white">
          {lastMessage.value?.message ||
            "Добро пожаловать в Streamcast! Отправьте первое сообщение."}
        </div>
      </div>
    </div>
  );
});
