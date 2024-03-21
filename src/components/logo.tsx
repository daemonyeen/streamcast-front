import { component$ } from "@builder.io/qwik";
import type { ClassNameValue } from "tailwind-merge";
import { twMerge } from "tailwind-merge";
import ImgLogo from "../../public/media/logo.svg?jsx";

export type LogoProps = {
  textStyles?: ClassNameValue;
  svgStyles?: ClassNameValue;
};

export default component$(({ textStyles, svgStyles }: LogoProps) => {
  return (
    <a
      href="/"
      class={twMerge(
        "flex items-center space-x-[10px] text-xl font-bold tracking-tight text-teal-950",
        textStyles,
      )}
    >
      <ImgLogo class={twMerge("text-teal-400", svgStyles)} />
      <span>Streamcast</span>
    </a>
  );
});
