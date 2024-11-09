import { ListingCreateRequestDto } from '~/common/types/types';

const DEFAULT_LISTING_CREATE_PAYLOAD: ListingCreateRequestDto = {
  name: '',
  description: '',
  category: '',
  subcategory: '',
  pricePerSession: 0,
  lengthOfSession: 0,
  availability: [
    {
      day: '',
      startTime: '',
      endTime: '',
    },
  ],
  location: '',
  rating: 0,
  ratingCounts: 0,
};

export { DEFAULT_LISTING_CREATE_PAYLOAD };
