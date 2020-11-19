// @flow

type Category = {
  categoryId: number,
  categoryName: string,
};

class CategoryService {
  getCategories() {
    return Promise.resolve([
      {
        categoryId: 1,
        categoryName: 'Kategori 1',
      },
      {
        categoryId: 2,
        categoryName: 'Kategori 2',
      },
      {
        categoryId: 3,
        categoryName: 'Kategori 3',
      },
      {
        categoryId: 4,
        categoryName: 'Kategori 4',
      },
    ]);
  }

  getCategory(categoryId: number) {
    if (categoryId === 1)
      return Promise.resolve({
        categoryId: 1,
        categoryName: 'Kategori 1',
      });

    if (categoryId === 2)
      return Promise.resolve({
        categoryId: 2,
        categoryName: 'Kategori 2',
      });
  }

  getProjectCategory(projectId: number) {
    if (projectId === 1)
      return Promise.resolve({
        categoryId: 1,
        categoryName: 'Kategori 1',
      });

    if (projectId === 2)
      return Promise.resolve({
        categoryId: 2,
        categoryName: 'Kategori 2',
      });

    if (projectId === 3)
      return Promise.resolve({
        categoryId: 3,
        categoryName: 'Kategori 3',
      });
  }

  createCategory(category: Category) {
    return Promise.resolve(4);
  }

  updateCategory(category: Category) {
    return Promise.resolve();
  }

  deleteCategory(categoryId: number) {
    return Promise.resolve();
  }
}

const categoryService = new CategoryService();
export default categoryService;
