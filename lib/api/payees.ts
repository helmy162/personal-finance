import { IPayee } from "@/types";

// Simulated database
let payees: IPayee[] = [];
let nextKey = 1;

export const fetchPayees = async (): Promise<IPayee[]> => {
  return [
    await createPayee({
      CompanyName: "Acme Corp",
      Address1: "123 Main St",
      City: "Anytown",
      State: "CA",
      PostalCode: "12345",
      Country: "USA",
      PrimaryContact: "John Doe",
      PrimaryContactEmail: "john@acme.com",
    }),
    await createPayee({
      CompanyName: "TechStart Inc",
      Address1: "456 Innovation Ave",
      City: "Tech City",
      State: "NY",
      PostalCode: "67890",
      Country: "USA",
      PrimaryContact: "Jane Smith",
      PrimaryContactEmail: "jane@techstart.com",
    }),
  ];
};

export const createPayee = async (
  payeeData: Partial<IPayee>
): Promise<IPayee> => {
  await new Promise((resolve) => setTimeout(resolve, 350));

  const newPayee: IPayee = {
    Key: `payee_${nextKey++}`,
    CompanyName: payeeData.CompanyName!,
    Address1: payeeData.Address1 || "",
    Address2: payeeData.Address2 || "",
    City: payeeData.City || "",
    State: payeeData.State || "",
    PostalCode: payeeData.PostalCode || "",
    Country: payeeData.Country || "",
    TaxID: payeeData.TaxID || "",
    PrimaryContact: payeeData.PrimaryContact || "",
    PrimaryContactPhone: payeeData.PrimaryContactPhone || "",
    PrimaryContactEmail: payeeData.PrimaryContactEmail || "",
  };
  payees.push(newPayee);
  return newPayee;
};

export const updatePayee = async (
  key: string,
  payeeData: Partial<IPayee>
): Promise<IPayee> => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const index = payees.findIndex((payee) => payee.Key === key);
  if (index !== -1) {
    payees[index] = { ...payees[index], ...payeeData };
    return payees[index];
  }
  throw new Error("Payee not found");
};

export const deletePayee = async (key: string): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const index = payees.findIndex((payee) => payee.Key === key);
  if (index !== -1) {
    payees.splice(index, 1);
  } else {
    throw new Error("Payee not found");
  }
};

// Helper function to add some initial data
export const initializePayees = () => {
  payees = [
    {
      Key: "payee_1",
      CompanyName: "Acme Corp",
      Address1: "123 Main St",
      City: "Anytown",
      State: "CA",
      PostalCode: "12345",
      Country: "USA",
      PrimaryContact: "John Doe",
      PrimaryContactEmail: "john@acme.com",
    },
    {
      Key: "payee_2",
      CompanyName: "TechStart Inc",
      Address1: "456 Innovation Ave",
      City: "Tech City",
      State: "NY",
      PostalCode: "67890",
      Country: "USA",
      PrimaryContact: "Jane Smith",
      PrimaryContactEmail: "jane@techstart.com",
    },
  ];
  nextKey = 3;
};
