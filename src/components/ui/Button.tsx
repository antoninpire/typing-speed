import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import cn from "classnames";

const buttonVariants = cva(
  "active:scale-95 inline-flex items-center justify-center rounded-md text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none focus:ring-offset-slate-900 data-[state=open]:bg-slate-800 font-semibold",
  {
    variants: {
      variant: {
        default: "hover:bg-text/90 bg-text text-slate-900",
        destructive: "bg-red-500 text-white hover:bg-red-600",
        outline:
          "bg-transparent border hover:bg-transparent/10 border-slate-700 text-slate-100",
        subtle: "hover:bg-slate-600 bg-slate-700 text-slate-100",
        ghost:
          "bg-transparent hover:bg-slate-800 text-slate-100 hover:text-slate-100 data-[state=open]:bg-transparent data-[state=open]:bg-transparent",
        link: "bg-transparent underline-offset-4 hover:underline text-slate-100 hover:bg-transparent",
      },
      size: {
        default: "h-10 py-2 px-4",
        sm: "h-9 px-2 rounded-md",
        lg: "h-11 px-8 rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
