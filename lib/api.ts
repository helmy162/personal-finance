import { ICategory } from '@/types'

// Simulated database
let categories: ICategory[] = []
let nextKey = 1

export const fetchCategories = async (): Promise<ICategory[]> => {
  return [
    await createCategory({ CategoryName: 'Food' }),
    await createCategory({ CategoryName: 'Transport' }),
    await createCategory({ CategoryName: 'Housing' }),
  ]
}

export const createCategory = async (categoryData: Partial<ICategory>): Promise<ICategory> => {
  const newCategory: ICategory = {
    Key: `cat_${nextKey++}`,
    Version: '1',
    CategoryName: categoryData.CategoryName!,
    ParentKey: categoryData.ParentKey,
    CreatedBy: 'user',
    CreationDate: Date.now(),
    Deleted: false,
  }
  categories.push(newCategory)
  return newCategory
}

export const updateCategory = async (key: string, categoryData: Partial<ICategory>): Promise<ICategory> => {
  const index = categories.findIndex(cat => cat.Key === key)
  if (index !== -1) {
    categories[index] = {
      ...categories[index],
      ...categoryData,
      Version: (parseInt(categories[index].Version) + 1).toString(),
      LastUpdatedBy: 'user',
      LastUpdateDate: Date.now(),
    }
    return categories[index]
  }
  throw new Error('Category not found')
}

export const deleteCategory = async (key: string): Promise<void> => {
  categories = categories.filter(cat => cat.Key !== key && cat.ParentKey !== key)
}