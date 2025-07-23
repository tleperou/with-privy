import { Slot, component$, $ } from "@builder.io/qwik";
import { useAppContext } from "./context";
import { useLoader } from "./loader";
export { useLoader } from "./loader";
import AppHeader from "~/components/AppHeader";
import AppProvider from "~/components/AppProvider";

export default component$(
  /**
   *
   * @returns
   */
  () => {
    const data = useLoader();
    const { privy } = useAppContext(data);

    return (
      <AppProvider
        onInit$={$((instance) => {
          console.log(">> init");
          privy.value = instance;
        })}
      >
        <AppHeader />
        <Slot />
      </AppProvider>
    );
  },
);
