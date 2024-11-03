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

export type { ICategory }