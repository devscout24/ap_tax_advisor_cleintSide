// components/ui/dialog-modal.tsx
"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogContent as ShadcnDialogContent,
} from "@/components/ui/dialog";

interface DialogModalProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Root> {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  className?: string;
  children?: React.ReactNode;
  hideCloseButton?: boolean;
}

const DialogModal = ({
  isOpen,
  onOpenChange,
  className,
  children,
  hideCloseButton = false,
  ...props
}: DialogModalProps) => (
  <Dialog open={isOpen} onOpenChange={onOpenChange} {...props}>
    <DialogPortal>
      <DialogOverlay />
      <ShadcnDialogContent
        className={cn(
          "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] bg-secondary-gradient fixed top-[50%] left-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border p-6 shadow-lg duration-200 sm:rounded-lg md:w-full",
          hideCloseButton ? "[&>button:first-of-type]:hidden" : "",
          className,
        )}
      >
        {children}
        {!hideCloseButton && (
          <DialogPrimitive.Close className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:pointer-events-none">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        )}
      </ShadcnDialogContent>
    </DialogPortal>
  </Dialog>
);

export { DialogModal };
