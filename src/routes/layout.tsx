import { Slot, component$ } from "@builder.io/qwik";
import { useAppContext } from "./index.context";
import { useLoader } from "./index.loader";
export { useLoader } from "./index.loader";
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
        onReady$={(instance) => {
          console.log(">> init", { instance });
          privy.value = instance;
        }}
      >
        <AppHeader />
        <Slot />
      </AppProvider>
    );
  },
);
