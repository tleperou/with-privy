import {
  NoSerialize,
  Signal,
  createContextId,
  useContextProvider,
  useSignal,
  useTask$,
} from "@builder.io/qwik";
import type { Wallet as WalletServer } from "@privy-io/server-auth";
import type { Wallet as WalletClient } from "@privy-io/react-auth";
import type { PrivyInterface } from "@privy-io/react-auth";
import { useLoader } from "./index.loader";

/**
 *
 */
export type WalletContextType = WalletServer | WalletClient | null;
export type WalletContextIdType = Signal<WalletContextType>;
export const WalletContext = createContextId<WalletContextIdType>("app.wallet");

/**
 *
 */
export type PrivyContextType = NoSerialize<PrivyInterface> | null;
export type PrivyContextIdType = Signal<PrivyContextType>;
export const PrivyContext = createContextId<PrivyContextIdType>("app.privy");

/**
 *
 */
export type UseAppContextProps = ReturnType<typeof useLoader>;

/**
 *
 * @param data
 * @returns
 */
export function useAppContext(data: UseAppContextProps) {
  /**
   * set privy's context, existing only on the client
   */
  const privy = useSignal<PrivyContextType>(null);
  useContextProvider(PrivyContext, privy);

  /**
   * set the wallet's context coming from Privy
   * either from the server or the client
   */
  const initialWallet = extractWallet(data);
  const wallet = useSignal<WalletContextType>(initialWallet);
  useContextProvider(WalletContext, wallet);

  useTask$(
    /**
     *
     * @param param
     * @returns
     */
    async function setWalletOnPrivyChanged({ track }) {
      track(() => privy.value);

      if (!privy.value?.ready) {
        return;
      }

      wallet.value = extractWallet(privy);
    },
    { eagerness: "idle" },
  );

  return { wallet, privy };
}

/**
 *
 * @param privy
 * @returns
 */
function extractWallet(payload: PrivyContextIdType | UseAppContextProps) {
  return payload.value?.user?.wallet || null;
}
