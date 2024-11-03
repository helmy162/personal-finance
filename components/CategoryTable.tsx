import { ReactElement, useState } from "react";
import { ICategory } from "@/types";
import { Edit, Trash2, ChevronRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DeleteCategoryDialog from "@/components/DeleteCategoryDialog";

interface CategoryTableProps {
  categories: ICategory[];
  onEdit: (category: ICategory) => void;
  onDelete: (category: ICategory) => void;
}

export default function CategoryTable({
  categories,
  onEdit,
  onDelete,
}: CategoryTableProps) {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set()
  );
  const [deleteConfirmation, setDeleteConfirmation] = useState<{
    category: ICategory;
    children: ICategory[];
  } | null>(null);

  const toggleCategory = (key: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(key)) {
      newExpanded.delete(key);
    } else {
      newExpanded.add(key);
    }
    setExpandedCategories(newExpanded);
  };

  const getChildCategories = (parentKey: string): ICategory[] => {
    return categories.filter((cat) => cat.ParentKey === parentKey);
  };

  const getAllDescendants = (parentKey: string): ICategory[] => {
    const children = getChildCategories(parentKey);
    return children.concat(
      children.flatMap((child) => getAllDescendants(child.Key))
    );
  };

  const handleDeleteClick = (category: ICategory) => {
    const children = getAllDescendants(category.Key);
    setDeleteConfirmation({ category, children });
  };

  const renderCategoryRow = (category: ICategory, level: number) => {
    const hasChildren = categories.some(
      (cat) => cat.ParentKey === category.Key
    );
    const isExpanded = expandedCategories.has(category.Key);

    return (
      <TableRow key={category.Key} className={level > 0 ? "bg-muted/50" : ""}>
        <TableCell className="font-medium">
          <div
            className="flex items-center"
            style={{ paddingLeft: `${level * 1.5}rem` }}
          >
            {hasChildren && (
              <Button
                variant="ghost"
                size="sm"
                className="p-0 h-6 w-6 mr-2"
                onClick={() => toggleCategory(category.Key)}
              >
                {isExpanded ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </Button>
            )}
            {category.CategoryName}
          </div>
        </TableCell>
        <TableCell>{category.CreatedBy}</TableCell>
        <TableCell>
          {new Date(category.CreationDate).toLocaleString()}
        </TableCell>
        <TableCell>
          <div className="flex justify-end space-x-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(category)}
              className="px-2"
            >
              <Edit className="h-4 w-4" />
              <span className="sr-only">Edit</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleDeleteClick(category)}
              className="px-2"
            >
              <Trash2 className="h-4 w-4 text-destructive" />
              <span className="sr-only">Delete</span>
            </Button>
          </div>
        </TableCell>
      </TableRow>
    );
  };

  const renderCategories = (
    parentKey: string | undefined = undefined,
    level = 0
  ): ReactElement[] => {
    return categories
      .filter((category) => category.ParentKey === parentKey)
      .flatMap((category) => {
        const rows = [renderCategoryRow(category, level)];
        if (expandedCategories.has(category.Key)) {
          rows.push(...renderCategories(category.Key, level + 1));
        }
        return rows;
      });
  };

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[300px]">Category Name</TableHead>
              <TableHead>Created By</TableHead>
              <TableHead>Creation Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>{renderCategories()}</TableBody>
        </Table>
      </div>

      <DeleteCategoryDialog
        deleteConfirmation={deleteConfirmation}
        setDeleteConfirmation={setDeleteConfirmation}
        onDelete={onDelete}
      />
    </>
  );
}
