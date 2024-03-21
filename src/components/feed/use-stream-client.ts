import { useContext } from "@builder.io/qwik";
import type { FeedState } from "~/components/feed/feed-state";
import { FeedContext } from "~/components/feed/feed-state";

export function useStreamClient() {
  return useContext<FeedState>(FeedContext).streamClient;
}
