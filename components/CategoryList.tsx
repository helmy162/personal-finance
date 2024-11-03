import { ICategory } from '@/types'
import { Edit, Trash2 } from 'lucide-react'

interface CategoryListProps {
  categories: ICategory[]
  onEdit: (category: ICategory) => void
  onDelete: (category: ICategory) => void
}

export default function CategoryList({ categories, onEdit, onDelete }: CategoryListProps) {
  const renderCategories = (parentKey: string | undefined = undefined, level = 0) => {
    console.log("renderCategories", parentKey, level)
    return categories
      .filter(category => category.ParentKey === parentKey)
      .map(category => (
        <div key={category.Key}>
          <div className={`flex items-center py-2 ${level > 0 ? 'pl-' + (level * 4) : ''}`}>
            <span className="flex-grow">{category.CategoryName}</span>
            <button
              onClick={() => onEdit(category)}
              className="p-1 text-blue-600 hover:text-blue-800"
            >
              <Edit size={18} />
            </button>
            <button
              onClick={() => onDelete(category)}
              className="p-1 text-red-600 hover:text-red-800"
            >
              <Trash2 size={18} />
            </button>
          </div>
          {renderCategories(category.Key, level + 1)}
        </div>
      ))
  }

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="px-4 py-2 bg-gray-100 font-semibold">Expense Categories</div>
      <div className="p-4">{renderCategories()}</div>
    </div>
  )
}