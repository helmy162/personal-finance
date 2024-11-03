"use client";

import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { IPayee } from "@/types";
import PayeeTable from "@/components/payee/PayeeTable";
import PayeeTableSkeleton from "@/components/payee/PayeeTableSkeleton";
import PayeeForm from "@/components/payee/PayeeForm";
import {
  fetchPayees,
  createPayee,
  updatePayee,
  deletePayee,
} from "@/lib/api/payees";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

export default function PayeeManager() {
  const { toast } = useToast();
  const [payees, setPayees] = useState<IPayee[]>([]);
  const [selectedPayee, setSelectedPayee] = useState<IPayee | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadPayees();
  }, []);

  const loadPayees = async () => {
    setIsLoading(true);
    try {
      const fetchedPayees = await fetchPayees();
      setPayees(fetchedPayees);
    } catch (error) {
      console.error("Failed to fetch payees:", error);
      toast({
        title: "Error",
        description: "Failed to load payees. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddPayee = async (payeeData: Partial<IPayee>) => {
    try {
      const newPayee = await createPayee(payeeData);
      setPayees([...payees, newPayee]);
      toast({
        title: "Success",
        description: "Payee added successfully.",
      });
    } catch (error) {
      console.error("Failed to add payee:", error);
      toast({
        title: "Error",
        description: "Failed to add payee. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleUpdatePayee = async (payeeData: Partial<IPayee>) => {
    if (selectedPayee) {
      try {
        const updatedPayee = await updatePayee(selectedPayee.Key, payeeData);
        setPayees(
          payees.map((payee) =>
            payee.Key === updatedPayee.Key ? updatedPayee : payee
          )
        );
        setSelectedPayee(null);
        toast({
          title: "Success",
          description: "Payee updated successfully.",
        });
      } catch (error) {
        console.error("Failed to update payee:", error);
        toast({
          title: "Error",
          description: "Failed to update payee. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  const handleDeletePayee = async (payee: IPayee) => {
    try {
      await deletePayee(payee.Key);
      setPayees(payees.filter((p) => p.Key !== payee.Key));
      toast({
        title: "Success",
        description: "Payee deleted successfully.",
      });
    } catch (error) {
      console.error("Failed to delete payee:", error);
      toast({
        title: "Error",
        description: "Failed to delete payee. Please try again.",
        variant: "destructive",
      });
    }
  };

  const openForm = (payee: IPayee | null = null) => {
    setSelectedPayee(payee);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setSelectedPayee(null);
    setIsFormOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-primary">Payees</h2>
        <Button
          onClick={() => openForm()}
          className="bg-primary text-primary-foreground"
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Add New Payee
        </Button>
      </div>
      {isLoading ? (
        <PayeeTableSkeleton />
      ) : (
        <PayeeTable
          payees={payees}
          onEdit={openForm}
          onDelete={handleDeletePayee}
        />
      )}
      <PayeeForm
        payee={selectedPayee}
        isOpen={isFormOpen}
        onClose={closeForm}
        onSubmit={selectedPayee ? handleUpdatePayee : handleAddPayee}
      />
    </div>
  );
}
