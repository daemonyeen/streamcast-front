import { component$ } from "@builder.io/qwik";
import { useUsername } from "~/hooks/use-username";
import { Feed } from "~/components/feed/feed";
import { Welcome } from "~/components/welcome/welcome";

export default component$(() => {
  const username = useUsername();

  return (
    <>
      <div class="min-h-[100vh] bg-indigo-50">
        {!username && (
          <div class="flex justify-center pt-12 lg:pt-24">
            <Welcome />
          </div>
        )}
        {username && <Feed />}
      </div>
    </>
  );
});
