import { component$, useContext } from "@builder.io/qwik";
import { ToastContext } from "~/components/toast/toast-state";
import { Toast } from "~/components/toast/toast";

export const ToastWrapper = component$(() => {
  const { toast } = useContext(ToastContext);

  if (!toast) return null;

  return (
    <div class="fixed left-1/2 top-12 translate-x-[-50%]">
      <Toast {...toast} />
    </div>
  );
});
