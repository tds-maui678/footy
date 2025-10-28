import type { ButtonHTMLAttributes } from "react";
import { tv } from "tailwind-variants";

const styles = tv({
  base: "inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition shadow-sm",
  variants: {
    variant: {
      primary: "bg-blue-600 hover:bg-blue-700 text-white",
      ghost: "bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800",
      outline: "border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800",
    },
  },
  defaultVariants: { variant: "primary" },
});

export default function Button({ className, ...props }:
  ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary"|"ghost"|"outline" }) {
  // @ts-ignore
  return <button className={styles({ variant: props.variant, class: className })} {...props} />;
}