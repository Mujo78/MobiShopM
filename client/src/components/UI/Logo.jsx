import React from "react";

const Logo = ({ color, fontSize }) => {
  return (
    <h2
      style={{
        fontFamily: "Audiowide",
        fontSize: fontSize ?? "2rem",
        color: color ?? "#219aeb",
        margin: "auto 0 auto 0",
      }}
    >
      MShop
    </h2>
  );
};

export default Logo;
