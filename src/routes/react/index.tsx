import { NoSerialize, component$, useSignal, useTask$ } from "@builder.io/qwik";
import { routeLoader$, type DocumentHead } from "@builder.io/qwik-city";
import type { PrivyInterface } from "@privy-io/react-auth";
import type { Wallet } from "@privy-io/server-auth";
import { Auth } from "~/integrations/react/Auth";
import { PrivyClient } from "@privy-io/server-auth";

export const usePrivyLoader = routeLoader$(async (requestEvent) => {
  const cookie = requestEvent.cookie;
  const privyToken = cookie.get("privy-token")?.value;

  if (!privyToken) {
    return { user: undefined };
  }

  const privy = new PrivyClient(
    requestEvent.env.get("PUBLIC_PRIVY_APP_ID") || "",
    requestEvent.env.get("PRIVY_APP_SECRET") || "",
  );

  try {
    const { userId } = await privy.verifyAuthToken(privyToken || "");
    const user = await privy.getUserById(userId);
    console.log(">> user called", { userId });
    return { user };
  } catch (e) {
    console.log("error", e);
    return { user: undefined };
  }
});

export default component$(() => {
  const privy = useSignal<NoSerialize<PrivyInterface>>();
  const data = usePrivyLoader();

  const wallet = useSignal<Wallet | undefined>(data.value.user?.wallet);

  useTask$(
    async ({ track }) => {
      track(() => privy.value);

      if (!privy.value?.ready) {
        return;
      }

      console.log(">> task", {
        server: data.value.user?.wallet,
        client: privy.value?.user?.wallet,
      });
      wallet.value = privy.value?.user?.wallet;
    },
    { eagerness: "visible" },
  );

  return (
    <Auth privy={privy}>
      <h1>Privy: {!privy.value?.ready ? "Loading" : "Ready"}</h1>
      {wallet.value ? (
        <button
          disabled={!privy.value?.ready}
          onClick$={() => {
            privy.value?.logout();
          }}
        >
          Disconnect: {wallet.value?.address}
        </button>
      ) : (
        <button
          disabled={!privy.value?.ready}
          onClick$={() => {
            privy.value?.login();
          }}
        >
          Connect
        </button>
      )}
    </Auth>
  );
});

export const head: DocumentHead = {
  title: "Qwik React",
};
