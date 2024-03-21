import { component$, useSignal, useTask$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { useLocation } from "@builder.io/qwik-city";
import { v4 as createUuid } from "uuid";
import qrCode from "qrcode";
import copy from "copy-to-clipboard";
import { useToast } from "~/components/toast/use-toast";
import { TopBar } from "~/components/top-bar";

export default component$(() => {
  const location = useLocation();
  const roomId = createUuid();
  const streamUrl = useSignal("");
  const qrDataUrl = useSignal("");

  useTask$(async () => {
    streamUrl.value = `${location.url.origin}/room/${roomId}`;
    qrDataUrl.value = await qrCode.toDataURL(streamUrl.value, {
      width: 300,
    });
  });

  const toast = useToast();

  return (
    <>
      <TopBar />
      <div class="min-h-[calc(100vh-76px)] bg-indigo-800 bg-pattern">
        <div class="relative mx-auto max-w-5xl pt-16 sm:pt-20 lg:pt-28">
          <h1 class="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Создайте живую ленту сообщений
          </h1>
          <p class="mt-6 max-w-3xl text-lg text-indigo-200">
            Для вашего мероприятия или презентации. Бесплатно, без рекламы и
            лишних приложений.
          </p>
        </div>

        <div class="mx-auto mt-16 max-w-xl">
          <div class="mx-auto rounded-2xl bg-white bg-opacity-95 p-8 shadow-lg">
            <h2 class="text-2xl font-bold tracking-tight">Для организаторов</h2>
            <p class="mt-4 text-neutral-500">
              Ваша персональная комната уже готова. Поделитесь QR кодом или
              ссылкой с участниками, чтобы начать общение.
            </p>

            <img
              width={200}
              height={200}
              src={qrDataUrl.value}
              alt="QR код"
              class="mx-auto mt-6 block max-h-none max-w-none rounded-xl border"
            />

            <div class="mt-6 grid flex-1 grid-cols-2 gap-4">
              <a
                download={`qr-${roomId}.png`}
                href={qrDataUrl.value}
                class="highlight-white/20 flex h-12 w-full items-center justify-center rounded-full bg-blue-600 px-6 font-semibold text-white transition-colors hover:bg-blue-500 focus:outline-none"
              >
                Сохранить QR код
              </a>

              <button
                type="button"
                class="highlight-white/20 flex h-12 w-full items-center justify-center rounded-full border border-neutral-300 px-6 font-semibold transition-colors hover:bg-white focus:outline-none"
                onClick$={() => {
                  copy(streamUrl.value || "");
                  void toast({
                    message: "Ссылка скопирована в буфер обмена",
                  });
                }}
              >
                Копировать ссылку
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "Streamcast - живая лента сообщений для мероприятий",
  meta: [
    {
      name: "description",
      content: "Streamcast - живая лента сообщений для мероприятий",
    },
  ],
};
