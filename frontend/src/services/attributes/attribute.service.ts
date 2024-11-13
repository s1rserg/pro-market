import { ApiPath } from '~/common/enums/enums';
import { Http } from '../http/http.service';
import { getToken } from '~/utils/auth';
import { AttributeDto } from '~/common/types/types';

type Constructor = {
  baseUrl: string;
  http: Http;
};

class Attributes {
  private http: Http;
  private baseUrl: string;
  private basePath: string;

  constructor({ baseUrl, http }: Constructor) {
    this.baseUrl = baseUrl;
    this.http = http;
    this.basePath = ApiPath.ATTRIBUTES;
  }

  public getAllCategories(): Promise<AttributeDto[]> {
    const token = getToken();
    return this.http.load(this.getUrl('/categories'), {
      method: 'GET',
      token,
    });
  }

  public getAllSubcategories(): Promise<AttributeDto[]> {
    const token = getToken();
    return this.http.load(this.getUrl('/subcategories'), {
      method: 'GET',
      token,
    });
  }

  public getAllFilters(): Promise<AttributeDto[]> {
    const token = getToken();
    return this.http.load(this.getUrl('/filters'), {
      method: 'GET',
      token,
    });
  }

  private getUrl(path = ''): string {
    return `${this.baseUrl}${this.basePath}${path}`;
  }
}

export { Attributes };
export type { Constructor as ListingsConstructor };
