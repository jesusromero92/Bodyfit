// src/components/ui/ConfirmDialog.jsx
import * as React from "react";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";

/**
 * ConfirmDialog
 * - Controlado por estado externo (open/onOpenChange)
 * - Uso: <ConfirmDialog open={open} onOpenChange={setOpen} ... />
 */
export default function ConfirmDialog({
  open,
  onOpenChange,
  title = "¿Estás seguro?",
  description = "",
  confirmLabel = "Sí",
  cancelLabel = "Cancelar",
  onConfirm,
  confirmColor = "bg-red-600 hover:bg-red-700 text-white",
}) {
  return (
    <AlertDialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <AlertDialogPrimitive.Portal>
        <AlertDialogPrimitive.Overlay className="fixed inset-0 bg-black/40 z-50" />
        <AlertDialogPrimitive.Content className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-6 shadow-xl border flex flex-col gap-4">
          <AlertDialogPrimitive.Title className="text-lg font-bold">{title}</AlertDialogPrimitive.Title>
          {description && (
            <AlertDialogPrimitive.Description className="text-gray-500">{description}</AlertDialogPrimitive.Description>
          )}
          <div className="flex justify-end gap-2 mt-6">
            <AlertDialogPrimitive.Cancel asChild>
              <button className="px-4 py-2 rounded bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold transition">{cancelLabel}</button>
            </AlertDialogPrimitive.Cancel>
            <AlertDialogPrimitive.Action asChild>
              <button
                className={`px-4 py-2 rounded font-semibold transition ${confirmColor}`}
                onClick={onConfirm}
              >
                {confirmLabel}
              </button>
            </AlertDialogPrimitive.Action>
          </div>
        </AlertDialogPrimitive.Content>
      </AlertDialogPrimitive.Portal>
    </AlertDialogPrimitive.Root>
  );
}
