import { BaseRepository } from '~/libs/core/base-repository';
import { IListing, Listing } from './listing.model';

class ListingRepository extends BaseRepository<IListing> {
  constructor() {
    super(Listing);
  }
}

export { ListingRepository };
