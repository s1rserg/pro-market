import { ApiPath, ContentType } from '~/common/enums/enums';
import { Http } from '../http/http.service';
import { getToken } from '~/utils/auth';
import {
  GetAllRequestDto,
  ListingCreateRequestDto,
  ListingResponseDto,
  ListingUpdateRequestDto,
} from '~/common/types/types';

type Constructor = {
  baseUrl: string;
  http: Http;
};

class Listings {
  private http: Http;
  private baseUrl: string;
  private basePath: string;

  constructor({ baseUrl, http }: Constructor) {
    this.baseUrl = baseUrl;
    this.http = http;
    this.basePath = ApiPath.SKILLS;
  }

  public getById(id: string): Promise<ListingResponseDto> {
    const token = getToken();
    return this.http.load(this.getUrl(`/${id}`), {
      method: 'GET',
      token,
    });
  }

  public getAll(query: GetAllRequestDto): Promise<ListingResponseDto[]> {
    const token = getToken();
    return this.http.load(this.getUrl(), {
      method: 'GET',
      query: {
        name: query.name,
        page: String(query.page),
        pageSize: String(query.pageSize),
      },
      token,
    });
  }

  public create(data: ListingCreateRequestDto): Promise<ListingResponseDto> {
    const token = getToken();
    return this.http.load(this.getUrl(), {
      method: 'POST',
      contentType: ContentType.JSON,
      payload: JSON.stringify(data),
      token,
    });
  }

  public update(
    id: string,
    data: ListingUpdateRequestDto
  ): Promise<ListingResponseDto> {
    const token = getToken();
    return this.http.load(this.getUrl(`/${id}`), {
      method: 'PATCH',
      contentType: ContentType.JSON,
      payload: JSON.stringify(data),
      token,
    });
  }

  public delete(id: string): Promise<void> {
    const token = getToken();
    return this.http.load(this.getUrl(`/${id}`), {
      method: 'DELETE',
      token,
    });
  }

  private getUrl(path = ''): string {
    return `${this.baseUrl}${this.basePath}${path}`;
  }
}

export { Listings };
export type { Constructor as ListingsConstructor };
