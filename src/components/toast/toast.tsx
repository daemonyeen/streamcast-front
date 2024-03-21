import { component$ } from "@builder.io/qwik";

export interface ToastProps {
  id?: number;
  message?: string;
  state: "in" | "out";
}

export const Toast = component$(({ message, state }: ToastProps) => {
  return (
    <div class={`animate-toast-${state}`}>
      <div
        class="w-full max-w-xs items-center rounded-lg bg-white p-4 shadow-lg"
        role="alert"
      >
        <div class="text-sm font-normal">{message}</div>
      </div>
    </div>
  );
});
