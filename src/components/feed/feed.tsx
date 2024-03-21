import {
  component$,
  noSerialize,
  useContextProvider,
  useSignal,
  useStore,
  useTask$,
  useVisibleTask$,
} from "@builder.io/qwik";
import { TopBar } from "~/components/top-bar";
import { NewMessage } from "~/components/new-message/new-message";
import { Message } from "~/components/message";
import { StreamClient } from "~/stream/stream-client";
import type { FeedState } from "~/components/feed/feed-state";
import { FeedContext } from "~/components/feed/feed-state";
import { useRoomId } from "~/hooks/use-room-id";
import CastSvg from "~/icons/cast.svg?jsx";
import { CastOverlay } from "~/components/cast-overlay";

export const Feed = component$(() => {
  const overlayEnabled = useSignal(false);
  const roomId = useRoomId();
  const store = useStore<FeedState>({
    streamClient: undefined,
    messages: [],
  });

  useTask$(async () => {
    const response = await fetch(
      `http://94.131.14.228:8081/messages?room=${roomId}&page=0`,
      {
        headers: new Headers({
          Accept: "application/json",
          "Content-Type": "application/json",
        }),
      },
    );

    store.messages = await response.json();
  });

  useContextProvider(FeedContext, store);
  useVisibleTask$(() => {
    store.streamClient = noSerialize(new StreamClient());
    store.streamClient!.connect(roomId, newMessage => {
      const existing = store.messages.find(
        message => message.id === newMessage.id,
      );

      if (existing) {
        store.messages = store.messages.map(message => {
          if (message.id === newMessage.id) {
            return newMessage;
          }

          return message;
        });

        return;
      }

      store.messages = [newMessage, ...store.messages];
    });
  });

  return (
    <>
      <TopBar>
        <div class="ml-auto">
          <button
            type="button"
            class="hidden rounded-md p-2 outline-0 hover:bg-indigo-700/75 lg:inline-block"
            onClick$={() => {
              overlayEnabled.value = !overlayEnabled.value;
            }}
          >
            <CastSvg class="text-white" />
          </button>
        </div>
      </TopBar>
      {!overlayEnabled.value && (
        <div class="mx-auto max-w-[480px] px-4 py-8">
          <NewMessage />
          <div class="mx-auto mt-8 rounded-2xl border bg-white bg-opacity-95 shadow-2xl shadow-indigo-300/80">
            {store.messages.map(message => (
              <Message message={message} key={message.id} />
            ))}
          </div>
        </div>
      )}
      {overlayEnabled.value && <CastOverlay />}
    </>
  );
});
