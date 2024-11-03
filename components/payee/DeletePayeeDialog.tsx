import { IPayee } from "@/types";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface DeletePayeeDialogProps {
  deleteConfirmation: IPayee | null;
  setDeleteConfirmation: (value: null) => void;
  onDelete: (payee: IPayee) => void;
}

export default function DeletePayeeDialog({
  deleteConfirmation,
  setDeleteConfirmation,
  onDelete,
}: DeletePayeeDialogProps) {
  const handleConfirmDelete = () => {
    if (deleteConfirmation) {
      onDelete(deleteConfirmation);
      setDeleteConfirmation(null);
    }
  };

  return (
    <Dialog
      open={!!deleteConfirmation}
      onOpenChange={() => setDeleteConfirmation(null)}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="h-5 w-5" />
            Confirm Deletion
          </DialogTitle>
          <DialogDescription>
            This action cannot be undone. Please review the details below.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p className="mb-2 font-medium text-foreground">
            Are you sure you want to delete the payee{" "}
            <span className="font-semibold text-primary">
              {deleteConfirmation?.CompanyName}
            </span>
            ?
          </p>
        </div>
        <DialogFooter>
          <Button
            type="button"
            variant="secondary"
            onClick={() => setDeleteConfirmation(null)}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleConfirmDelete}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
