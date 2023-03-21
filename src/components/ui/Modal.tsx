import * as DialogPrimitive from "@radix-ui/react-dialog";
import cn from "classnames";
import * as React from "react";
import X from "~/components/icons/X";
import { Button, type ButtonProps } from "~/components/ui/Button";

const GenericDialog = DialogPrimitive.Root;

const DialogTrigger = DialogPrimitive.Trigger;

const DialogPortal = ({
  className,
  children,
  ...props
}: DialogPrimitive.DialogPortalProps) => (
  <DialogPrimitive.Portal className={cn(className)} {...props}>
    <div className="fixed inset-0 z-50 flex items-start justify-center sm:items-center">
      {children}
    </div>
  </DialogPrimitive.Portal>
);
DialogPortal.displayName = DialogPrimitive.Portal.displayName;

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
>(({ className, children, ...props }, ref) => (
  <DialogPrimitive.Overlay
    className={cn(
      "fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-all duration-100 data-[state=closed]:animate-out data-[state=open]:fade-in data-[state=closed]:fade-out",
      className
    )}
    {...props}
    ref={ref}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed z-50 grid w-full gap-4 rounded-b-lg bg-background p-6 font-sans text-white animate-in data-[state=open]:fade-in-90 data-[state=open]:slide-in-from-bottom-10 sm:max-w-lg sm:rounded-lg sm:zoom-in-90 data-[state=open]:sm:slide-in-from-bottom-0",
        className
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="absolute top-4 right-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-background disabled:pointer-events-none data-[state=open]:bg-background/80">
        <X />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;

type ModalProps = {
  children: React.ReactNode;
  openerButtonProps?: ButtonProps;
  onClose: () => void;
};

const Modal: React.FC<ModalProps> = (props) => {
  const {
    children,
    openerButtonProps = {
      children: "Ouvrir",
    },
    onClose,
  } = props;

  const [isOpen, setIsOpen] = React.useState(false);

  const handleClose = React.useCallback(() => {
    setIsOpen(false);
    onClose();
  }, [onClose]);

  const handleOpen = React.useCallback(() => {
    setIsOpen(true);
  }, []);

  return (
    <GenericDialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) handleClose();
      }}
    >
      <DialogTrigger asChild>
        <Button onClick={handleOpen} {...openerButtonProps} />
      </DialogTrigger>
      <DialogContent id="modal">
        <div className="no-scrollbar h-full w-full overflow-y-scroll">
          {children}
        </div>
      </DialogContent>
    </GenericDialog>
  );
};

export default Modal;
