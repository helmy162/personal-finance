import PayeeManager from "@/components/payee/PayeeManager";

export default function PayeesPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-8 text-primary">Payees</h1>
      <PayeeManager />
    </div>
  );
}
