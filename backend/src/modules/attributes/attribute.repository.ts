import { BaseRepository } from '~/libs/core/base-repository';
import {
  Category,
  Filter,
  ICategory,
  IFilter,
  ISubcategory,
  Subcategory,
} from './attribute.model';

class CategoryRepository extends BaseRepository<ICategory> {
  constructor() {
    super(Category);
  }
}

class SubcategoryRepository extends BaseRepository<ISubcategory> {
  constructor() {
    super(Subcategory);
  }
}

class FilterRepository extends BaseRepository<IFilter> {
  constructor() {
    super(Filter);
  }
}

export { CategoryRepository, SubcategoryRepository, FilterRepository };
