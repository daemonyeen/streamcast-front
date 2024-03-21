import type { NoSerialize } from "@builder.io/qwik";
import { createContextId } from "@builder.io/qwik";
import type { MessageDto } from "~/stream/message";
import type { StreamClient } from "~/stream/stream-client";

export type FeedState = {
  streamClient: NoSerialize<StreamClient>;
  messages: MessageDto[];
  castMessages: MessageDto[];
};

export const FeedContext = createContextId<FeedState>("feed-context");
