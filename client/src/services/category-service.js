// @flow
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000/api/v1';

export type Category = {
  categoryId: number,
  categoryName: string,
};

class CategoryService {
  getCategories() {
    return axios.get<Category[]>('/categories').then((response) => response.data);
  }

  getCategory(categoryId: number) {
    return axios.get<Category>('/categories/' + categoryId).then((response) => response.data);
  }

  getProjectCategory(projectId: number) {
    return axios.get<Category>(`/projects/${projectId}/category`).then((response) => response.data);
  }

  createCategory(category: Category) {
    return axios
      .post<Category, { categoryId: number }>('/categories', category)
      .then((response) => response.data);
  }

  updateCategory(category: Category) {
    return axios
      .put<Category, void>(`/categories/${category.categoryId}`, category)
      .then((response) => response.data);
  }

  deleteCategory(categoryId: number) {
    return axios.delete<void>('/categories/' + categoryId).then((response) => response.data);
  }
}

const categoryService = new CategoryService();
export default categoryService;
