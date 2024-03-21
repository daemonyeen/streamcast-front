import { createContextId } from "@builder.io/qwik";
import type { ToastProps } from "~/components/toast/toast";

export interface ToastState {
  duration?: number;
  toast?: ToastProps | null;
  timeout?: any;
  animationTimeout?: any;
}

export const ToastContext = createContextId<ToastState>("toast-context");
