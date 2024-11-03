import { ICategory } from "@/types";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AlertTriangle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface DeleteCategoryDialogProps {
  deleteConfirmation: {
    category: ICategory;
    children: ICategory[];
  } | null;
  setDeleteConfirmation: (value: null) => void;
  onDelete: (category: ICategory) => void;
}

export default function DeleteCategoryDialog({
  deleteConfirmation,
  setDeleteConfirmation,
  onDelete,
}: DeleteCategoryDialogProps) {
  const handleConfirmDelete = () => {
    if (deleteConfirmation) {
      onDelete(deleteConfirmation.category);
      setDeleteConfirmation(null);
    }
  };

  return (
    <Dialog
      open={!!deleteConfirmation}
      onOpenChange={() => setDeleteConfirmation(null)}
    >
      <DialogContent className="sm:max-w-[500px]">
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
            Are you sure you want to delete the category{" "}
            <span className="font-semibold text-primary">
              {deleteConfirmation?.category.CategoryName}
            </span>{" "}
            ?
          </p>
          {deleteConfirmation?.children &&
            deleteConfirmation?.children.length > 0 && (
              <div className="mt-4">
                <p className="mb-2 font-medium text-foreground">
                  The following child categories will also be deleted:
                </p>
                <ScrollArea className="h-[100px] rounded-md border p-2">
                  <ul className="list-inside list-disc space-y-1">
                    {deleteConfirmation.children.map((child) => (
                      <li
                        key={child.Key}
                        className="text-sm text-muted-foreground"
                      >
                        {child.CategoryName}
                      </li>
                    ))}
                  </ul>
                </ScrollArea>
              </div>
            )}
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
