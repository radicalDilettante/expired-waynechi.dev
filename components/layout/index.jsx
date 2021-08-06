import React from "react";
import Header from "./header";

export default function Layout(props) {
  return (
    <div>
      <Header></Header>
      <section>{props.children}</section>
    </div>
  );
}
