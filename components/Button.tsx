import classNames from "classnames";
import React from "react";
import Spinner from "./Spinner";

enum VariantColor {
  primary = "primary",
  secondary = "secondary",
  light = "light",
  white = "white",
  lightLink = "lightLink",
}

const bgColorClass = {
  [VariantColor.primary]: "bg-teal-600",
  [VariantColor.secondary]: "bg-none",
  [VariantColor.light]: "bg-gray-100",
  [VariantColor.white]: "bg-white",
  [VariantColor.lightLink]: "bg-none",
};

const bgColorHoverClass = {
  [VariantColor.primary]: "",
  [VariantColor.secondary]: "",
  [VariantColor.light]: "hover:bg-gray-200",
  [VariantColor.white]: "",
  [VariantColor.lightLink]: "",
};

const borderClass = {
  [VariantColor.primary]: "",
  [VariantColor.secondary]: "border-2 border-teal-600",
  [VariantColor.light]: "border-2 border-gray-100",
  [VariantColor.white]: "border-2 border-gray-500",
  [VariantColor.lightLink]: "",
};

const textColorClass = {
  [VariantColor.primary]: "text-white",
  [VariantColor.secondary]: "text-teal-600",
  [VariantColor.light]: "text-gray-500",
  [VariantColor.white]: "text-gray-600",
  [VariantColor.lightLink]:
    "text-gray-400 hover:text-gray-500 transition duration-100",
};

const heightClass = {
  sm: "h-[40px]",
  md: "h-[56px]",
  lg: "h-[56px]",
};

const widthClass = {
  sm: "px-3",
  md: "px-8",
  lg: "px-12",
};

const Button = ({
  children,
  variant = "primary",
  size = "lg",
  loading,
  width = undefined,
  height = "md",
  className,
  ...props
}) => {
  return (
    <button
      className={classNames(
        bgColorClass[variant],
        bgColorHoverClass[variant],
        borderClass[variant],
        textColorClass[variant],
        heightClass[height],
        widthClass[width],
        "rounded-md font-bold flex items-center justify-center select-none",
        {
          "opacity-80": loading,
        },
        className
      )}
      disabled={loading}
      {...props}
    >
      {loading ? <Spinner color="#fff" /> : children}
    </button>
  );
};

export default Button;
