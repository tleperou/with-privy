/** @jsxImportSource react */

import { noSerialize } from "@builder.io/qwik";
import { qwikify$ } from "@builder.io/qwik-react";
import { PropsWithChildren, useEffect, useRef } from "react";
import { PrivyProvider, usePrivy } from "@privy-io/react-auth";
import { PrivyContextType } from "~/routes/index.context";

interface Props extends PropsWithChildren {
  onReady: (instance: PrivyContextType) => void;
}

export default qwikify$(
  /**
   *
   * @param props
   * @returns
   */
  function (props: Props) {
    return (
      <PrivyProvider
        appId={import.meta.env.PUBLIC_PRIVY_APP_ID}
        config={{
          // Create embedded wallets for users who don't have a wallet
          embeddedWallets: {
            ethereum: {
              createOnLogin: "users-without-wallets",
            },
          },
        }}
      >
        <WithPrivy {...props}>{props.children}</WithPrivy>
      </PrivyProvider>
    );
  },
  { eagerness: "load" },
);

/**
 *
 * @param props
 * @returns
 */
function WithPrivy(props: Props) {
  const privy = usePrivy();
  const last = useRef(privy);

  useEffect(
    /**
     *
     * @returns
     */
    function bubbleUpPrivyOnReady() {
      if (!privy.ready) {
        return;
      }

      if (privy === last.current) {
        return;
      }

      props.onReady(noSerialize(privy));
    },
    [privy],
  );

  return <>{props.children}</>;
}
