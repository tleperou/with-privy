/** @jsxImportSource react */

import { Signal } from "@builder.io/qwik";
import { qwikify$ } from "@builder.io/qwik-react";
import { ComponentProps } from "react";
// import { useState } from "react";

interface Props extends ComponentProps<"button"> {
  counter: Signal<number>;
}

export const Counter = qwikify$(
  (props: Props) => {
    // const [counter, setCounter] = useState(1);
    return (
      <button
        onClick={() => {
          props.counter.value++;
          console.log(">>", { counter: props.counter.value });
        }}
      >
        {props.children}
      </button>
    );
  },
  { eagerness: "hover" },
);
