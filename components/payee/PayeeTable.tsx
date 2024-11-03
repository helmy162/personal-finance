import { IPayee } from "@/types";
import { Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DeletePayeeDialog from "@/components/payee/DeletePayeeDialog";
import { useState } from "react";

interface PayeeTableProps {
  payees: IPayee[];
  onEdit: (payee: IPayee) => void;
  onDelete: (payee: IPayee) => void;
}

export default function PayeeTable({
  payees,
  onEdit,
  onDelete,
}: PayeeTableProps) {
  const [deleteConfirmation, setDeleteConfirmation] = useState<IPayee | null>(
    null
  );

  const handleDeleteClick = (payee: IPayee) => {
    setDeleteConfirmation(payee);
  };

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Company Name</TableHead>
              <TableHead>Primary Contact</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>City</TableHead>
              <TableHead>State</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payees.map((payee) => (
              <TableRow key={payee.Key}>
                <TableCell className="font-medium">
                  {payee.CompanyName}
                </TableCell>
                <TableCell>{payee.PrimaryContact}</TableCell>
                <TableCell>{payee.PrimaryContactEmail}</TableCell>
                <TableCell>{payee.City}</TableCell>
                <TableCell>{payee.State}</TableCell>
                <TableCell>
                  <div className="flex justify-end space-x-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEdit(payee)}
                      className="px-2"
                    >
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteClick(payee)}
                      className="px-2"
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <DeletePayeeDialog
        deleteConfirmation={deleteConfirmation}
        setDeleteConfirmation={setDeleteConfirmation}
        onDelete={onDelete}
      />
    </>
  );
}
