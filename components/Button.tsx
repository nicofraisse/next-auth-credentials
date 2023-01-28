import classNames from "classnames";
import React from "react";
import Spinner from "./Spinner";

export enum VariantColor {
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
  width = "sm",
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
        "rounded-md font-bold select-none relative",
        {
          "opacity-80": loading,
          "opacity-100": !loading,
        },
        className
      )}
      disabled={loading}
      {...props}
    >
      <div
        className={classNames("flex items-center justify-center", {
          "opacity-0": loading,
        })}
      >
        {children}
      </div>
      {loading && (
        <div
          className="absolute w-full h-full flex items-center
         justify-center top-0 left-0"
        >
          <Spinner color={"#89a"} noPadding />
        </div>
      )}
    </button>
  );
};

export default Button;
