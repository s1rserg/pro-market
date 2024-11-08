import {
  fetchAllListings,
  fetchListingById,
  createListing,
  updateListing,
  deleteListing,
} from './actions';
import { actions, reducer } from './slice';

const allActions = {
  ...actions,
  fetchAllListings,
  fetchListingById,
  createListing,
  updateListing,
  deleteListing,
};

export { allActions as actions, reducer };
