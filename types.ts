interface ICategory {
  Key: string;
  Version: string;
  ParentKey?: string;
  CategoryName: string;
  LastUpdatedBy?: string;
  LastUpdateDate?: number;
  CreatedBy: string;
  CreationDate: number;
  Deleted: boolean;
  DeletedBy?: string;
  DeletionDate?: number;
}

interface IPayee {
  Key: string;
  CompanyName: string;
  Address1?: string;
  Address2?: string;
  City?: string;
  State?: string;
  PostalCode?: string;
  Country?: string;
  TaxID?: string;
  PrimaryContact?: string;
  PrimaryContactPhone?: string;
  PrimaryContactEmail?: string;
}

interface IExpense {
  Key: string;
  PurchaseDate: number;
  Description: string;
  Amount: number;
  SalesTax: boolean;
  PayeeKey: string;
  CategoryKey: string;
  ReceiptPath?: string;
  CreatedBy: string;
  CreationDate: number;
  Deleted: false;
}

export type { ICategory, IPayee, IExpense };
