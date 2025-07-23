/** @jsxImportSource react */

import { Signal, noSerialize } from "@builder.io/qwik";
import { qwikify$ } from "@builder.io/qwik-react";
import { PropsWithChildren, useEffect } from "react";
import { PrivyInterface, PrivyProvider, usePrivy } from "@privy-io/react-auth";

interface Props extends PropsWithChildren {
  privy: Signal<PrivyInterface | undefined>;
}

export const Auth = qwikify$(
  (props: Props) => {
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
        <WithPrivy privy={props.privy}>{props.children}</WithPrivy>
      </PrivyProvider>
    );
  },
  { eagerness: "visible" },
);

function WithPrivy(props: Props) {
  const privy = usePrivy();

  useEffect(() => {
    props.privy.value = noSerialize(privy);
  }, [privy]);

  return <>{props.children}</>;
}
