import React from "react";
import * as emoji from "node-emoji";

const Heading = () => {
  return (
    <h1 className="text-2xl font-semibold tracking-wide mb-10">
      Cậu có điều gì muốn nói với nguyenducloc hong{" "}
      {emoji.emojify(":point_right:")}
      {emoji.emojify(":point_left:")}
    </h1>
  );
};

export default Heading;
