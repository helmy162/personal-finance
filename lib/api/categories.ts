import { ICategory } from "@/types";

// Simulated database
let categories: ICategory[] = [];
let nextKey = 1;

export const fetchCategories = async (): Promise<ICategory[]> => {
  return [
    await createCategory({ CategoryName: "Food" }),
    await createCategory({ CategoryName: "Transport" }),
    await createCategory({ CategoryName: "Housing" }),
    // add partial category data
    await createCategory({ CategoryName: "Rent", ParentKey: "cat_3" }),
    await createCategory({ CategoryName: "Groceries", ParentKey: "cat_1" }),
    await createCategory({ CategoryName: "Gas", ParentKey: "cat_2" }),
    // add sub sub category
    await createCategory({ CategoryName: "Petrol", ParentKey: "cat_6" }),
  ];
};

export const createCategory = async (
  categoryData: Partial<ICategory>
): Promise<ICategory> => {
  await new Promise((resolve) => setTimeout(resolve, 100));

  const newCategory: ICategory = {
    Key: `cat_${nextKey++}`,
    Version: "1",
    CategoryName: categoryData.CategoryName!,
    ParentKey: categoryData.ParentKey,
    CreatedBy: "user",
    CreationDate: Date.now(),
    Deleted: false,
  };
  categories.push(newCategory);
  return newCategory;
};

export const updateCategory = async (
  key: string,
  categoryData: Partial<ICategory>
): Promise<ICategory> => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const index = categories.findIndex((cat) => cat.Key === key);
  if (index !== -1) {
    categories[index] = {
      ...categories[index],
      ...categoryData,
      Version: (parseInt(categories[index].Version) + 1).toString(),
      LastUpdatedBy: "user",
      LastUpdateDate: Date.now(),
    };
    return categories[index];
  }
  throw new Error("Category not found");
};

export const deleteCategory = async (key: string): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  categories = categories.filter(
    (cat) => cat.Key !== key && cat.ParentKey !== key
  );
};
