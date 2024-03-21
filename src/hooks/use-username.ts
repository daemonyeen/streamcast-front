import { useLocation } from "@builder.io/qwik-city";

export function useUsername(): string {
  const location = useLocation();

  return location.url.searchParams.get("username")!;
}
