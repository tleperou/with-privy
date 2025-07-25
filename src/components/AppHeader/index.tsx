import { component$, useContext } from "@builder.io/qwik";
import { PrivyContext, WalletContext } from "~/routes/index.context";

export default component$(() => {
  const privy = useContext(PrivyContext);
  const wallet = useContext(WalletContext);

  console.log(">> [AppHeader]", wallet.value?.address?.substring(0, 8));

  return (
    <header>
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
    </header>
  );
});
