import { $, useContext } from "@builder.io/qwik";
import type { ToastState } from "~/components/toast/toast-state";
import { ToastContext } from "~/components/toast/toast-state";

interface ToastItemProps {
  duration?: number;
  message: string;
}

export const useToast = () => {
  const ctx = useContext<ToastState>(ToastContext);

  return $(({ duration = 3000, message }: ToastItemProps) => {
    const id = Date.now();

    ctx.toast = {
      id,
      message,
      state: "in",
    };

    if (ctx.timeout) {
      clearTimeout(ctx.timeout as number);
      clearTimeout(ctx.animationTimeout as number);
    }

    ctx.timeout = setTimeout(() => {
      ctx.toast = null;
    }, duration);

    ctx.animationTimeout = setTimeout(() => {
      ctx.toast = {
        ...ctx.toast,
        state: "out",
      };
    }, duration - 140);
  });
};
