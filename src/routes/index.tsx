import { component$, useContext } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { WalletContext } from "./context";

export default component$(
  /**
   *
   * @returns
   */
  () => {
    const wallet = useContext(WalletContext);

    return (
      <>
        <h1>Index {wallet.value?.address.substring(0, 6)}</h1>
        <p>Lorem ipsum</p>
      </>
    );
  },
);

export const head: DocumentHead = {
  title: "Qwik, Privy and React",
};
