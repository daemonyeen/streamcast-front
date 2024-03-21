import { $, component$, useSignal } from "@builder.io/qwik";
import Logo from "~/components/logo";
import { useForm, valiForm$ } from "@modular-forms/qwik";
import type { WelcomeFormSchema } from "~/components/welcome/welcome-form";
import { welcomeFormSchema } from "~/components/welcome/welcome-form";
import { useLocation, useNavigate } from "@builder.io/qwik-city";

export const Welcome = component$(() => {
  const nav = useNavigate();
  const location = useLocation();
  const [_welcomeForm, { Form, Field }] = useForm<WelcomeFormSchema>({
    loader: useSignal({
      username: "",
    }),
    validate: valiForm$(welcomeFormSchema),
    validateOn: "submit",
  });

  const setUsername = $(({ username }: WelcomeFormSchema) =>
    nav(`${location.url.toString()}/?username=${encodeURI(username)}`),
  );

  return (
    <div class="w-[400px] rounded-2xl border bg-white bg-opacity-95 shadow-2xl shadow-indigo-300/80">
      <div class="border-b p-6 pb-4">
        <Logo />
      </div>

      <div class="p-6">
        <h2 class="text-2xl font-bold tracking-tight">Еще один момент</h2>
        <p class="mt-4 text-neutral-500">
          Перед тем как начать, выберите, под каким именем вас отображать в
          ленте.
        </p>

        <Form class="mt-8 grid gap-4" onSubmit$={setUsername}>
          <Field name="username">
            {(field, props) => (
              <div class="grid gap-2">
                <input
                  {...props}
                  type="text"
                  value={field.value}
                  placeholder="Ваше имя и фамилия"
                  autocomplete="off"
                  class="block w-full rounded-lg border border-gray-300 bg-white p-3 placeholder-gray-500 outline-0 ring-blue-500 ring-offset-2 focus:ring-2"
                />
                {field.error && (
                  <div class="text-sm font-medium text-red-500">
                    {field.error}
                  </div>
                )}
              </div>
            )}
          </Field>

          <button
            type="submit"
            class="highlight-white/20 flex h-12 w-full items-center justify-center rounded-full bg-blue-700 px-6 font-medium text-white transition-colors hover:bg-blue-600 focus:outline-none"
          >
            Продолжить
          </button>
        </Form>
      </div>
    </div>
  );
});
