import { component$, useSignal } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { Counter } from "~/integrations/react/Counter";

export default component$(() => {
  const counter = useSignal(1);
  return (
    <>
      <h1>Counter deamo:</h1>
      <Counter counter={counter}>Counter {counter.value}</Counter>
    </>
  );
});

export const head: DocumentHead = {
  title: "Qwik React",
};
