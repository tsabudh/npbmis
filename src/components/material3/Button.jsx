import React, { CSSProperties, forwardRef } from "react";

const Button = forwardRef((props, ref) => {
  const { variant = "outlined", className, style, children, ...rest } = props;

  const inputMap = {
    outlined: "md-outlined-button",
    filled: "md-filled-button",
    text: "md-text-button",
    elevated: "md-elevated-button",
    tonal: "md-filled-tonal-button",
  };

  const CustomInput = inputMap[variant] || "md-outlined-button"; // Fallback if `variant` is invalid

  return (
    <CustomInput ref={ref} class={className} style={style} {...rest}>
      {children ? children : null}
    </CustomInput>
  );
});

Button.displayName = "Button";

export default Button;
