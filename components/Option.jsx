import React from "react";

export default function Option(props) {
  const { icon, title, className, ...restProps } = props;
  return (
    <div
      className={`flex items-center gap-2 p-2 hover:bg-white/20 rounded font-medium ${
        className || ""
      }`}
      {...restProps}>
      <div>{icon}</div>
      <div>{title}</div>
    </div>
  );
}
