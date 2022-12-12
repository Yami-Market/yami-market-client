import { Category, CategoryPath } from '../api/categoryApi';

export type CategoryObject = {
  id: string;
  name: string;
  parentId: string | null;
  parentName: string | null;
  level: number;
  children: CategoryObject[];
};

// @ts-ignore
const categoryRecursive = (
  categoryList: Category[],
  parentId: string | null,
  level: number
): CategoryObject[] => {
  return categoryList
    .filter(category => category.parent_id === parentId)
    .map(category => ({
      id: category.id,
      name: category.name,
      parentId: category.parent_id,
      parentName: category.parent_name,
      level,
      children: categoryRecursive(categoryList, category.id, level + 1)
    })) as CategoryObject[];
};

export const getCategoryCollection = (categoryList: Category[]) => {
  return categoryRecursive(categoryList, null, 0);
};

export const handleCategoryPath = (categoryPath: CategoryPath) => {
  const path = [
    {
      pathId: categoryPath.grandparent_id,
      pathName: categoryPath.grandparent_name
    },
    { pathId: categoryPath.parent_id, pathName: categoryPath.parent_name }
  ].filter(path => path.pathId !== null);

  return { title: categoryPath.name, path };
};
