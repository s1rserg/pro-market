import {
  CategoryRepository,
  FilterRepository,
  SubcategoryRepository,
} from './attribute.repository';

export class AttributeService {
  private categoryRepository: CategoryRepository;
  private subcategoryRepository: SubcategoryRepository;
  private filterRepository: FilterRepository;

  constructor() {
    this.categoryRepository = new CategoryRepository();
    this.subcategoryRepository = new SubcategoryRepository();
    this.filterRepository = new FilterRepository();
  }

  async getAllCategories() {
    return this.categoryRepository.findAll();
  }

  async getAllSubcategories() {
    return this.subcategoryRepository.findAll();
  }

  async getAllFilters() {
    return this.filterRepository.findAll();
  }
}
