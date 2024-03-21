import { component$, Slot } from "@builder.io/qwik";
import Logo from "~/components/logo";

export const TopBar = component$(() => {
  return (
    <div class="flex h-[76px] items-center bg-indigo-800">
      <div class="mx-auto flex w-full max-w-5xl items-center px-4 sm:px-6 md:px-8">
        <Logo textStyles="text-white" />
        <Slot />
      </div>
    </div>
  );
});
