import {
  component$,
  Slot,
  useContextProvider,
  useStore,
} from "@builder.io/qwik";
import type { ToastState } from "./toast-state";
import { ToastContext } from "./toast-state";
import { ToastWrapper } from "~/components/toast/toast-wrapper";

export interface ToastProviderProps {
  config?: ToastState;
}

export const ToastProvider = component$(({ config }: ToastProviderProps) => {
  const store = useStore<ToastState>({
    duration: config?.duration || 5000,
  });

  useContextProvider(ToastContext, store);

  return (
    <>
      <Slot />
      <ToastWrapper />
    </>
  );
});
