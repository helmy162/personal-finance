import { IExpense } from "@/types";
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

interface DeleteExpenseDialogProps {
  deleteConfirmation: IExpense | null;
  setDeleteConfirmation: (value: IExpense | null) => void;
  onDelete: (expense: IExpense) => void;
}

export default function DeleteExpenseDialog({
  deleteConfirmation,
  setDeleteConfirmation,
  onDelete,
}: DeleteExpenseDialogProps) {
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
            This action cannot be undone. Are you sure you want to delete this
            expense?
          </DialogDescription>
        </DialogHeader>
        {deleteConfirmation && (
          <div className="py-4">
            <p>
              <strong>Date:</strong>{" "}
              {new Date(deleteConfirmation.PurchaseDate).toLocaleDateString()}
            </p>
            <p>
              <strong>Description:</strong> {deleteConfirmation.Description}
            </p>
            <p>
              <strong>Amount:</strong> ${deleteConfirmation.Amount.toFixed(2)}
            </p>
          </div>
        )}
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
