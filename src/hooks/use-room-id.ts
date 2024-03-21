import { useLocation } from "@builder.io/qwik-city";

export function useRoomId(): string {
  const location = useLocation();

  return location.params["id"];
}
