import { isBrowser } from "@builder.io/qwik/build";
import { noSerialize } from "@builder.io/qwik";

function _useEnvironment(): Record<string, string> {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-return
  return isBrowser ? (import.meta as any).env : process.env;
}

export const useEnvironment = noSerialize(_useEnvironment);
